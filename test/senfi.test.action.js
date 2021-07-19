const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node action.js", async function () {
	it("Email Should call httpRequest", async function () {
		let stub = sinon.stub(Senfi.prototype, "httpRequest").yields();
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.email(["test@test.com"], "Senfi Title Test", "Senfi Content Test");

		expect(stub.called).equal(true);

		Senfi.prototype.httpRequest.restore();
	});

	it("SMS Should call httpRequest", async function () {
		let stub = sinon.stub(Senfi.prototype, "httpRequest").yields();
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.sms(["+6512345678"], "Senfi SMS Test");

		expect(stub.called).equal(true);

		Senfi.prototype.httpRequest.restore();
	});
});
