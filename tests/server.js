const cds = require("@sap/cds");

cds.exec("run", "--with-mocks", "--in-memory?");

module.exports = new Promise((resolve) => {
	cds.on('listening', () => {
		resolve(cds.app);
	});
});