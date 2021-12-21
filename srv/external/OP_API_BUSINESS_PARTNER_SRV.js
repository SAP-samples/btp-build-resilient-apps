const cds = global.cds || require('@sap/cds')
module.exports = async srv => {
    
    const messaging = await cds.connect.to('messaging')
    // Mock events for s4
    srv.after("CREATE","A_BusinessPartner", data => {       
        const payload = data;
        messaging.emit("tfe/bpem/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1", payload);
        console.log('<< event emitted', payload);
    });

    srv.after("UPDATE","A_BusinessPartner",data => {
        const payload = {KEY: [{BUSINESSPARTNER: data.BusinessPartner}]};
        messaging.emit("tfe/bpem/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1", payload);
        console.log('<< event emitted', payload);
    });
}