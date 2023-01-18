process.env.CDS_TYPESCRIPT = 'true'

import { AxiosError, AxiosResponse } from 'axios'
import cds from '@sap/cds/lib'
const project = __dirname + '/..'
const { chai, GET, DELETE, POST, PATCH, expect } = cds.test(project, '--with-mocks', '--in-memory').verbose()
import chaiAsPromised from 'chai-as-promised'

const AUTH = { auth: { username: 'bp-admin', password: '123' } }

const newBupa = {
  BusinessPartner: 'TEST11',
  FirstName: 'Max',
  LastName: 'Streifeneder',
  BusinessPartnerIsBlocked: true,
  to_BusinessPartnerAddress: [
    {
      BusinessPartner: 'TEST11',
      AddressID: '99999',
      HouseNumber: '1',
      CityName: 'Walldorf',
      Country: 'DE',
      StreetName: 'Weg',
      PostalCode: '69190'
    },
    {
      BusinessPartner: 'TEST11',
      AddressID: '11111',
      HouseNumber: '2',
      CityName: 'Munich',
      Country: 'DE',
      StreetName: 'Straße',
      PostalCode: '81371'
    }
  ]
}

const statusValues = [
  {
    code: 'N',
    value: 'NEW',
    criticality: 2,
    updateCode: false
  },
  {
    code: 'INV',
    value: 'INVALID',
    criticality: 1,
    updateCode: false
  },
  {
    code: 'V',
    value: 'VERIFIED',
    criticality: 3,
    updateCode: true
  },
  {
    code: 'U',
    value: 'UPDATED',
    criticality: 2,
    updateCode: false
  }
]

before('bootstrap sqlite in-memory db...', async () => {
  expect(cds.db).to.exist
  expect(cds.db.model).to.exist
})

describe('GET admin/$metadata', function () {
  chai.use(chaiAsPromised)
  it('should fail unauthenticated', async () => {
    await expect(GET('admin/$metadata')).to.be.rejectedWith(AxiosError)
  })

  it('should work authenticated', async () => {
    const res = (await GET('admin/$metadata', AUTH)) as AxiosResponse
    //console.log(res)
    expect(res.headers).to.contain({
      'content-type': 'application/xml',
      'odata-version': '4.0'
    })
    expect(res.status).to.be.equal(200)
    expect(res.data).to.contain('EntitySet Name="StatusValues" EntityType="AdminService.StatusValues"')
    expect(res.data).to.contain('EntitySet Name="BusinessPartner" EntityType="AdminService.BusinessPartner"')
    expect(res.data).to.contain('EntitySet Name="Addresses" EntityType="AdminService.Addresses"')
    expect(res.data).to.contain('EntitySet Name="BusinessPartnerAddresses" EntityType="AdminService.BusinessPartnerAddresses"')
    expect(res.data).to.contain('EntitySet Name="BusinessPartnerVerification" EntityType="AdminService.BusinessPartnerVerification"')
  })
})

describe('GET /admin/StatusValues', function () {
  it('should fail unauthenticated', async () => {
    await expect(GET('admin/StatusValues')).to.be.rejectedWith(AxiosError)
  })

  it('should deliver an array of 4 statusValues', async () => {
    const res = (await GET('/admin/StatusValues', AUTH)) as AxiosResponse
    expect(res.status).to.be.equal(200)
    expect(res.headers).to.contain({
      'content-type': 'application/json;odata.metadata=minimal'
    })
    expect(Array.isArray(res.data.value)).to.be.true
    expect(res.data.value).to.have.lengthOf(4)
    expect(res.data.value).to.containSubset(statusValues)
  })
})

describe('GET /admin/BusinessPartnerVerification', function () {
  it('should fail unauthenticated', async () => {
    await expect(GET('admin/BusinessPartnerVerification')).to.be.rejectedWith(AxiosError)
  })

  it('should not contain data', async () => {
    const res = (await GET('/admin/BusinessPartnerVerification', AUTH)) as AxiosResponse
    expect(res.status).to.be.equal(200)
    expect(res.headers).to.contain({
      'content-type': 'application/json;odata.metadata=minimal'
    })
    expect(res.data.value).to.have.lengthOf(0)
  })
})

describe('Test Mock endpoints for S/4', function () {
  it('metadata', async () => {
    const res = (await GET('op-api-business-partner-srv')) as AxiosResponse
    expect(res.status).to.be.equal(200)
    expect(res.data.value).to.have.lengthOf(43) // 43 Entities
    expect(res.data['@odata.context']).to.be.equal('$metadata')
  })

  it('GET Request BusinessPartner', async () => {
    const res = (await GET('op-api-business-partner-srv/A_BusinessPartner')) as AxiosResponse
    expect(res.status).to.be.equal(200)
    expect(res.data.value).to.have.lengthOf(3) // 3 Test Business Partners
    expect(res.data['@odata.context']).to.be.equal('$metadata#A_BusinessPartner')
  })

  it('DELETE Request BusinessPartner', async () => {
    //get BusinessPartner by ID
    const readBupaRes = (await GET(`op-api-business-partner-srv/A_BusinessPartner('MAXSTR')`)) as AxiosResponse
    expect(readBupaRes.data.BusinessPartner).to.be.equal('MAXSTR')
    //delete Business Partner
    //get BusinessPartner by ID - > away
    const deleteBupaRes = (await DELETE(`op-api-business-partner-srv/A_BusinessPartner('MAXSTR')`)) as AxiosResponse
    expect(deleteBupaRes.status).to.be.equal(204)
    expect(GET(`op-api-business-partner-srv/A_BusinessPartner('MAXSTR')`)).to.be.rejectedWith(AxiosError)
  })

  it('GET Request BusinessPartnerAddress', async () => {
    const res = await GET('op-api-business-partner-srv/A_BusinessPartnerAddress')
    expect(res.status).to.be.equal(200)
    expect(res.data.value).to.have.lengthOf(0) // 3 Test Business Partners
    expect(res.data['@odata.context']).to.be.equal('$metadata#A_BusinessPartnerAddress')
  })
})

describe('Test changes in S/4 through mocks', function () {
  it('Create Business Partner', async () => {
    const res = (await POST('op-api-business-partner-srv/A_BusinessPartner', newBupa)) as AxiosResponse
    expect(res.status).to.be.equal(201)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const verResponse = await GET(`admin/BusinessPartnerVerification?$expand=addresses`, AUTH)
    const verification = verResponse.data.value[0]
    expect(verResponse.status).to.be.equal(200)
    expect(verification.BusinessPartner).to.be.equal(newBupa.BusinessPartner)
    expect(verification.FirstName).to.be.equal(newBupa.FirstName)
    expect(verification.LastName).to.be.equal(newBupa.LastName)
    expect(verification.BusinessPartnerIsBlocked).to.be.equal(newBupa.BusinessPartnerIsBlocked)
    expect(verification.IsActiveEntity).to.be.equal(true)
    expect(verification.verificationStatus_code).to.be.equal('N')
    expect(verification.addresses).to.have.lengthOf(newBupa.to_BusinessPartnerAddress.length)
    for (const newBupaAddress of newBupa.to_BusinessPartnerAddress) {
      const verificationAddress = verification.addresses.find((verificationAddress) => verificationAddress.AddressID === newBupaAddress.AddressID)
      expect(verificationAddress.AddressID).to.be.equal(newBupaAddress.AddressID)
      expect(verificationAddress.CityName).to.be.equal(newBupaAddress.CityName)
      expect(verificationAddress.Country).to.be.equal(newBupaAddress.Country)
      expect(verificationAddress.HouseNumber).to.be.equal(newBupaAddress.HouseNumber)
      expect(verificationAddress.PostalCode).to.be.equal(newBupaAddress.PostalCode)
      expect(verificationAddress.StreetName).to.be.equal(newBupaAddress.StreetName)
      expect(verificationAddress.IsActiveEntity).to.be.equal(true)
      expect(verificationAddress.verifications_ID).to.be.equal(verification.ID)
    }
  })

  it('Update Business Partner Block Status', async () => {
    const updateJson = {
      BusinessPartner: newBupa.BusinessPartner,
      BusinessPartnerIsBlocked: !newBupa.BusinessPartnerIsBlocked
    }
    const { status } = (await PATCH(`op-api-business-partner-srv/A_BusinessPartner('${newBupa.BusinessPartner}')`, updateJson)) as AxiosResponse
    expect(status).to.be.equal(200)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // make sure that the service can process the event
    const { data: dataGet, status: statusGet } = (await GET(`admin/BusinessPartnerVerification?$expand=addresses&$filter=BusinessPartner eq '${newBupa.BusinessPartner}'`, AUTH)) as AxiosResponse
    expect(statusGet).to.be.equal(200)
    expect(dataGet.value).to.have.lengthOf(1)
    expect(dataGet.value[0].addresses).to.have.lengthOf(newBupa.to_BusinessPartnerAddress.length)

    const verification = dataGet.value[0]
    expect(verification.BusinessPartner).to.be.equal(newBupa.BusinessPartner)
    expect(verification.FirstName).to.be.equal(newBupa.FirstName)
    expect(verification.LastName).to.be.equal(newBupa.LastName)
    expect(verification.BusinessPartnerIsBlocked).to.be.equal(!newBupa.BusinessPartnerIsBlocked)
    expect(verification.IsActiveEntity).to.be.equal(true)
    expect(verification.verificationStatus_code).to.be.equal('U')
    for (const newBupaAddress of newBupa.to_BusinessPartnerAddress) {
      const verificationAddress = verification.addresses.find((verificationAddress) => verificationAddress.AddressID === newBupaAddress.AddressID)
      expect(verificationAddress.AddressID).to.be.equal(newBupaAddress.AddressID)
      expect(verificationAddress.CityName).to.be.equal(newBupaAddress.CityName)
      expect(verificationAddress.Country).to.be.equal(newBupaAddress.Country)
      expect(verificationAddress.HouseNumber).to.be.equal(newBupaAddress.HouseNumber)
      expect(verificationAddress.PostalCode).to.be.equal(newBupaAddress.PostalCode)
      expect(verificationAddress.StreetName).to.be.equal(newBupaAddress.StreetName)
      expect(verificationAddress.IsActiveEntity).to.be.equal(true)
      expect(verificationAddress.verifications_ID).to.be.equal(verification.ID)
    }
  })

  it('Update Business Partner Address', async () => {
    //const { data: dataGet1, status: statusGet1 } = (await GET(`admin/BusinessPartnerVerification?$expand=addresses`, AUTH)) as AxiosResponse

    for (const address of newBupa.to_BusinessPartnerAddress) {
      for (const key of Object.keys(address)) {
        if (key != 'BusinessPartner' && key != 'AddressID') {
          address[key] = 'changed'
        }
      }
      const result = await cds.run(
        UPDATE.entity('AdminService.BusinessPartnerAddresses').set(address).where({
          BusinessPartner: address.BusinessPartner,
          AddressID: address.AddressID
        })
      )
      expect(result).to.be.equal(1)
    }
    const messaging = await cds.connect.to('messaging')
    const payload = { BusinessPartner: newBupa.BusinessPartner }
    messaging.emit('tfe/bp/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1', payload)
    console.log('<< event emitted', payload)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // make sure that the service can process the event
    const { data: dataGet, status: statusGet } = (await GET(`admin/BusinessPartnerVerification?$expand=addresses`, AUTH)) as AxiosResponse
    expect(statusGet).to.be.equal(200)
    expect(dataGet.value).to.have.lengthOf(1)
    expect(dataGet.value[0].addresses).to.have.lengthOf(newBupa.to_BusinessPartnerAddress.length)

    const verification = dataGet.value[0]
    expect(verification.BusinessPartner).to.be.equal(newBupa.BusinessPartner)
    expect(verification.FirstName).to.be.equal(newBupa.FirstName)
    expect(verification.LastName).to.be.equal(newBupa.LastName)
    expect(verification.BusinessPartnerIsBlocked).to.be.equal(!newBupa.BusinessPartnerIsBlocked)
    expect(verification.IsActiveEntity).to.be.equal(true)
    expect(verification.verificationStatus_code).to.be.equal('U')
    for (const newBupaAddress of newBupa.to_BusinessPartnerAddress) {
      const verificationAddress = verification.addresses.find((verificationAddress) => verificationAddress.AddressID === newBupaAddress.AddressID)
      expect(verificationAddress.AddressID).to.be.equal(newBupaAddress.AddressID)
      expect(verificationAddress.CityName).to.be.equal(newBupaAddress.CityName)
      expect(verificationAddress.Country).to.be.equal(newBupaAddress.Country)
      expect(verificationAddress.HouseNumber).to.be.equal(newBupaAddress.HouseNumber)
      expect(verificationAddress.PostalCode).to.be.equal(newBupaAddress.PostalCode)
      expect(verificationAddress.StreetName).to.be.equal(newBupaAddress.StreetName)
      expect(verificationAddress.IsActiveEntity).to.be.equal(true)
      expect(verificationAddress.verifications_ID).to.be.equal(verification.ID)
    }
  })
})
