/* eslint-disable require-yield */

import { ApplicationService } from '@sap/cds'
import { Event, BUSINESSPARTNERTOPICBASE } from './common/constants'
import type RemoteService from '@sap/cds/apis/services'
import { EventMessage, Request, Service } from '@sap/cds/apis/services'
import { AdminService as model } from './model/entities'

interface IEventData {
  BusinessPartner: string
}
class AdminService extends ApplicationService {
  bupaSrv?: Service | null

  async init() {
    const messagingService = await cds.connect.to('messaging')
    this.bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV')

    messagingService.before('*', (msg: EventMessage) => {
      console.log(`Received message with event ${msg.event}`, 'and headers ', JSON.stringify(msg.headers))
    })

    this.on(Event.READ, model.SanitizedEntity.BusinessPartnerAddresses, this.delegateQuery)
    this.on(Event.READ, model.SanitizedEntity.BusinessPartner, this.delegateQuery)

    messagingService.on(`${BUSINESSPARTNERTOPICBASE}Created/v1`, this.handleBusinessPartnerCreated)
    messagingService.on(`${BUSINESSPARTNERTOPICBASE}Changed/v1`, this.handleBusinessPartnerChanged)
    this.before(Event.SAVE, model.SanitizedEntity.BusinessPartnerVerification, this.beforeSaveAddresses)
    this.on(model.BusinessPartnerVerification.actions.ActionBlock.name, model.SanitizedEntity.BusinessPartnerVerification, this.blockBusinessPartner)
    this.on(model.BusinessPartnerVerification.actions.ActionUnblock.name, model.SanitizedEntity.BusinessPartnerVerification, this.unblockBusinessPartner)

    super.init()
  }

  private delegateQuery = async (req: Request) => {
    return this.run(req.query)
  }

  private handleBusinessPartnerCreated = async (msg: Request) => {
    const { BusinessPartner: businessPartnerID } = msg.data as IEventData
    if (await this.getLocalBusinessPartner(businessPartnerID, msg)) {
      console.warn(`BusinessPartner ${businessPartnerID} already persisted, no need to proceed`)
      return
    }
    const businessPartnerS4 = await this.getBusinessPartnerFromS4(businessPartnerID, msg)

    if (!businessPartnerS4) return
    //check error handling

    const verification = this.cloneRemoteToLocalBupa(businessPartnerS4)
    verification.verificationStatus_code = 'N'
    const localBupa = await this.createLocalBupa(msg, verification)
    if (!localBupa) {
      msg.error('400', 'technical error while inserting new Verification')
    }
  }

  private handleBusinessPartnerChanged = async (msg: Request) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { BusinessPartner: businessPartnerID } = msg.data as IEventData
    const businessPartnerS4 = (await this.getBusinessPartnerFromS4(businessPartnerID, msg)) as model.BusinessPartner
    const localBusinessPartner = await this.getLocalBusinessPartner(businessPartnerID, msg)
    const verification = this.cloneRemoteToLocalBupa(businessPartnerS4)
    verification.verificationStatus_code = 'U'
    if (!localBusinessPartner) {
      this.createLocalBupa(msg, verification)
    } else {
      for (const addresses of verification.addresses) {
        addresses.verifications_ID = localBusinessPartner.ID
      }
      this.updateLocalBupa(msg, verification)
    }
  }

  private beforeSaveAddresses = async (req: Request) => {
    const businessPartner: model.BusinessPartnerVerification = req.data as model.BusinessPartnerVerification

    for (const address of businessPartner.addresses) {
      const updated = await this.updateS4BupaAddress(req, address, businessPartner.BusinessPartner)
      if (updated) req.notify(204, `Updated [${businessPartner.FirstName} ${businessPartner.LastName}] in SAP S/4HANA`)
    }
  }

  private blockBusinessPartner = async (req: Request) => {
    const localBupaUUID = (req.params[0] as any).ID
    const localBupa = (await this.getBusinessPartnerByUUID(localBupaUUID, req)) as model.BusinessPartnerVerification
    const updated = await this.updateBlockedStatusS4(req, localBupa.BusinessPartner, true)
    if (updated) req.notify(204, `Blocked [${localBupa.FirstName} ${localBupa.LastName}] in SAP S/4HANA`)
  }

  private unblockBusinessPartner = async (req: Request) => {
    const localBupaUUID = (req.params[0] as any).ID
    const localBupa = (await this.getBusinessPartnerByUUID(localBupaUUID, req)) as model.BusinessPartnerVerification
    const updated = await this.updateBlockedStatusS4(req, localBupa.BusinessPartner, false)
    if (updated) req.notify(204, `Unblocked [${localBupa.FirstName} ${localBupa.LastName}] in SAP S/4HANA`)
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  private getBusinessPartnerFromS4 = async (businessPartnerID: string, req: Request): Promise<model.BusinessPartner | null> => {
    try {
      const s4Bupa = await this.bupaSrv?.tx(req).run(
        SELECT.one(model.Entity.BusinessPartner, (bp: any) => {
          bp.BusinessPartner, bp.BusinessPartnerIsBlocked, bp.FirstName, bp.LastName, bp.addresses('*')
        }).where({ BusinessPartner: businessPartnerID })
      )
      return s4Bupa
    } catch (error) {
      console.error(error)
      return null
    }
  }

  private async getBusinessPartnerByUUID(UUID: string, req: Request): Promise<model.BusinessPartnerVerification | null> {
    const localBusinessPartner = (await cds.tx(req).run(SELECT.one(model.Entity.BusinessPartnerVerification).where({ ID: UUID }))) as model.BusinessPartnerVerification
    if (!localBusinessPartner) {
      console.error(`ERROR: couldn't find BusinessPartner for UUID ${UUID}, skip processing`)
      return null
    } else {
      return localBusinessPartner
    }
  }

  private async getLocalBusinessPartner(businessPartnerId: string, req: Request): Promise<model.BusinessPartnerVerification | null> {
    const localBusinessPartner = await cds.tx(req).run(
      SELECT.one(model.Entity.BusinessPartnerVerification, (bp: any) => {
        bp.ID
        bp.BusinessPartner, bp.BusinessPartnerIsBlocked, bp.FirstName, bp.LastName, bp.verificationStatus_code
        bp.addresses('*')
      }).where({ BusinessPartner: businessPartnerId })
    )
    return localBusinessPartner
  }

  private cloneRemoteToLocalBupa(businessPartnerS4: model.BusinessPartner): model.BusinessPartnerVerification {
    const verification = {} as model.BusinessPartnerVerification
    Object.assign(verification, businessPartnerS4)
    return verification
  }

  private async createLocalBupa(req: Request, verification: model.BusinessPartnerVerification): Promise<boolean> {
    const insertResult = await cds.tx(req).run(INSERT.into(model.Entity.BusinessPartnerVerification).entries(verification))
    if (!insertResult) {
      console.error(`ERROR: couldn't insert new verification entry for BusinessPartner ${verification.BusinessPartner} with status "${verification.verificationStatus_code}", skip processing`)
      return false
    }
    console.log(`Saved BusinessPartner ${verification.BusinessPartner} to the HDI Container on SAP HANA Cloud`)
    return true
  }

  private async updateLocalBupa(req: Request, verification: model.BusinessPartnerVerification): Promise<boolean> {
    try {
      cds.tx(async () => {
        const updateResult = await cds.run(UPDATE.entity(model.Entity.BusinessPartnerVerification).set(verification).where({ BusinessPartner: verification.BusinessPartner }))
        console.log(`Updating BusinessPartner ${verification.BusinessPartner} in SAP HANA Cloud`)
        if (!updateResult) return false
      })
    } catch (error) {
      console.log('erro1: ' + error)
      return false
    }
    return true
  }

  private async updateBlockedStatusS4(req: Request, businessPartnerId: string, blockStatus: boolean): Promise<boolean> {
    const updateResult = await this.bupaSrv?.tx(req).run(UPDATE.entity(model.Entity.BusinessPartner).set({ BusinessPartnerIsBlocked: blockStatus }).where({ BusinessPartner: businessPartnerId }))
    if (!updateResult) return false
    else return true
  }

  private async updateS4BupaAddress(req: RemoteService.Request, address: model.Addresses, businessPartnerId: string): Promise<boolean> {
    const updateResult = await this.bupaSrv?.tx(req).run(UPDATE.entity(model.Entity.BusinessPartnerAddresses).set(address).where({ BusinessPartner: businessPartnerId, AddressID: address.AddressID }))

    if (!updateResult) return false
    else return true
  }
}

module.exports = { AdminService }
