const cds = global.cds || require('@sap/cds')
module.exports = async (srv) => {
  const messaging = await cds.connect.to('messaging')
  // Mock events for s4
  srv.after('CREATE', 'A_BusinessPartner', (data) => {
    const payload = data
    messaging.emit('tfe/bp/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1', payload)
    console.log('<< event emitted', payload.BusinessPartner)
  })
  /*
  srv.after('CREATE', 'A_BusinessPartnerAddress', (data) => {
    let payload = {}
    payload.BusinessPartner = data.BusinessPartner_BusinessPartner
    messaging.emit('tfe/bp/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1', payload)
    console.log('<< event emitted', payload.BusinessPartner)
  })*/

  srv.after('UPDATE', 'A_BusinessPartner', (data) => {
    const payload = data
    messaging.emit('tfe/bp/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1', payload)
    console.log('<< event emitted', payload)
  })

  srv.after('*', 'AdminService.A_BusinessPartnerAddress', (data) => {
    const payload = data
    //messaging.emit('tfe/bp/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1', payload)
    //console.log('<< event emitted', payload)
  })
}
