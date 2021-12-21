const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
const cds = require('@sap/cds/lib')
const { expect } = require("chai");
if (cds.User.default) cds.User.default = cds.User.Privileged
else cds.User = cds.User.Privileged

// Configure chai
chai.use(chaiHttp);
chai.should();

let app = null;

before((done) => {
    server.then((result) => {
        app = result;
        done();
    });

});


describe("Business Partners Data Get", function () {

    it('Admin $metadata validation', async () => {

        chai.request(app).get('/admin/$metadata')
            .set('Accept', 'application/xml')
            .end(function (err, res) {
                expect(res.status).to.equal(200)
                expect(res.header).to.contain({
                    'content-type': 'application/xml',
                    'odata-version': '4.0',
                })
            })

    })



    it('Admin Status Values validation', async () => {
        chai.request(app).get('/admin/StatusValues')
            .end(function (err, res) {
                expect(res.status).to.equal(200)
                expect(res.header).to.contain({
                    'content-type': 'application/json;odata.metadata=minimal'
                })
                expect(res.text).to.eql('{"@odata.context":"$metadata#StatusValues","value":[{"code":"INV","value":"INVALID","criticality":1,"updateCode":false},{"code":"N","value":"NEW","criticality":2,"updateCode":false},{"code":"U","value":"UPDATED","criticality":2,"updateCode":false},{"code":"V","value":"VERIFIED","criticality":3,"updateCode":true}]}')
            })
    })


    it('Create New Admin Status value validation', async () => {
        chai.request(app).post('/admin/StatusValues')
            .send({ "code": "R", "value": "REJECTED", "criticality": 1, "updateCode": false })
            .end(function (err, res) {
                expect(res.status).to.equal(201)
            })
        chai.request(app).get('/admin/StatusValues')
            .end(function (err, res) {
                expect(res.text).to.eql('{"@odata.context":"$metadata#StatusValues","value":[{"code":"INV","value":"INVALID","criticality":1,"updateCode":false},{"code":"N","value":"NEW","criticality":2,"updateCode":false},{"code":"R","value":"REJECTED","criticality":1,"updateCode":false},{"code":"U","value":"UPDATED","criticality":2,"updateCode":false},{"code":"V","value":"VERIFIED","criticality":3,"updateCode":true}]}')
            })
        chai.request(app).get("/admin/StatusValues(code='R')")
            .end(function (err, res) {
                expect(res.text).to.eql('{"@odata.context":"$metadata#StatusValues/$entity","code":"R","value":"REJECTED","criticality":1,"updateCode":false}')
            })
    })


    it('Update Admin Status Value validation', async () => {
        chai.request(app).patch("/admin/StatusValues(code='INV')")
            .send({ "code": "INV", "value": "INVALID", "criticality": 2, "updateCode": false })
            .end(function (err, res) {
                expect(res.status).to.equal(200)
            })
        chai.request(app).get("/admin/StatusValues(code='INV')")
            .end(function (err, res) {
                expect(res.text).to.eql('{"@odata.context":"$metadata#StatusValues/$entity","code":"INV","value":"INVALID","criticality":2,"updateCode":false}')
            })
    })

    it('Admin BusinessPartnerVerification GET validation', async () => {
        chai.request(app).get("/admin/BusinessPartnerVerification")
            .end(function (err, res) {
                expect(res.text).to.be.a('string').that.contains('"businessPartnerId":"HARUT","businessPartnerFirstName":"Harut","businessPartnerLastName":"Ter-Minasyan","verificationStatus_code":"N","businessPartnerIsBlocked":false')
            })
    })

    it('Admin Address GET validation', async () => {
        chai.request(app).get("/admin/Addresses")
            .end(function (err, res) {
                expect(res.text).to.be.a('string').that.contains('"addressId":"124462","country":"DE","cityName":"Walldorf","streetName":"Dietmar-Hopp-Allee 162","postalCode":"560066","houseNumber":null')
            })
    })

    it('BusinessPartner S4 GET Validation', async () => {
        chai.request(app).get("/s4/BusinessPartners")
            .end(function (err, res) {
                expect(res.text).to.be.a('string').that.contains('"businessPartnerId":"BOB","businessPartnerIsBlocked":false,"businessPartnerFirstName":"Mocked Bob","businessPartnerLastName":"Builder"')
            })
    })


    it('BusinessPartnerAddresses S4 GET Validation', async () => {
        chai.request(app).get("/s4/BusinessPartnerAddresses")
            .end(function (err, res) {
                expect(res.text).to.be.a('string').that.contains('"businessPartnerId":"HARUT","addressId":"124462","country":"DE","cityName":"Walldorf","streetName":"Dietmar-Hopp-Allee 162","postalCode":"12345","houseNumber":null')
            })
    })

    it("Create a New Business Partner and validate it", function (done) {
        var BusinessPartnerText = {
            "BusinessPartner": "17100015",
            "BusinessPartnerIsBlocked": true,
            "FirstName": "Nishnanth",
            "LastName": "Payani"
        }
        var BusinessPartnerAddressText = {
            "BusinessPartner": "17100015",
            "AddressID": "125555",
            "Country": "DE",
            "CityName": "Walldorf",
            "StreetName": "Dietmar-Hopp-Allee 162",
            "PostalCode": "12345",
            "HouseNumber": "20"
        }
        var requester = chai.request(app).keepOpen()
        requester
            .post('/op-api-business-partner-srv/A_BusinessPartner')
            .send(BusinessPartnerText)
            .end(function (errAddr, resAddr) {
                resAddr.should.have.status(201)
                setTimeout(() => {
                    requester
                        .post('/op-api-business-partner-srv/A_BusinessPartnerAddress')
                        .send(BusinessPartnerAddressText)
                        .end(function (errbp, resbp) {
                            requester.get('/admin/BusinessPartnerVerification')
                                .end(function (erradm, resadm) {
                                    resadm.should.have.status(200)
                                    resadm.body.value.should.be.a('array')
                                    expect(resadm.text).to.be.a('string').that.contains('"businessPartnerId":"17100015","businessPartnerFirstName":"Nishnanth","businessPartnerLastName":"Payani","verificationStatus_code":"N","businessPartnerIsBlocked":true');
                                })
                            setTimeout(() => { done(); }, 1000)
                        })
                }, 1000)
            })
    })
})