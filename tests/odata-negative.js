const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
const cds = require('@sap/cds/lib')
const { expect } = require("chai");

chai.use(chaiHttp);
chai.should();

let app = null;

before((done) => {
    server.then((result) => {
        app = result;        
        done();
    });

});


describe("Business Partners Data Get without Access", function () {

    it('GET Admin Status Values without Access', async () => {
        chai.request(app).get('/admin/StatusValues')
            .end(function (err, res) {
                expect(res.status).to.equal(401)
            })
    })

    it('GET Admin Status Values with Access', async () => {
        chai.request(app).get('/admin/StatusValues')
            .auth('bp-admin', '123')
            .end(function (err, res) {
                expect(res.status).to.equal(200)
            })
    })


    it('Admin BusinessPartnerVerification GET without Access', async () => {
        chai.request(app).get("/admin/BusinessPartnerVerification")
            .end(function (err, res) {
                expect(res.status).to.equal(401)
            })
    })

    it('Admin BusinessPartnerVerification GET with Access', async () => {
        chai.request(app).get("/admin/BusinessPartnerVerification")
            .auth('bp-admin', '123')
            .end(function (err, res) {
                expect(res.status).to.equal(200)
            })
    })

    it('Admin Address GET validation without Access', async () => {
        chai.request(app).get("/admin/Addresses")
            .end(function (err, res) {
                expect(res.status).to.equal(401)
            })
    })

    it('Admin Address GET validation with Access', async () => {
        chai.request(app).get("/admin/Addresses")
            .auth('bp-admin', '123')
            .end(function (err, res) {
                expect(res.status).to.equal(200)
            })
    })

})
