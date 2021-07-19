const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node action.js", async function () {
	it("Email - Should call httpRequest", async function () {
		let stub = sinon.stub(Senfi.prototype, "httpRequest").yields();
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.email(null, null, null);

		expect(stub.called).equal(true);

		Senfi.prototype.httpRequest.restore();
	});

	it("SMS - Should call httpRequest", async function () {
		let stub = sinon.stub(Senfi.prototype, "httpRequest").yields();
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.sms(null, null, null);

		expect(stub.called).equal(true);

		Senfi.prototype.httpRequest.restore();
	});

	it("Telegram - Should call httpRequest", async function () {
		let stub = sinon.stub(Senfi.prototype, "httpRequest").yields();
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.telegram(null, null);

		expect(stub.called).equal(true);

		Senfi.prototype.httpRequest.restore();
	});

	it("Webhook - Should call httpRequest", async function () {
		let stub = sinon.stub(Senfi.prototype, "httpRequest").yields();
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.webhook(null, null, null, null);

		expect(stub.called).equal(true);

		Senfi.prototype.httpRequest.restore();
	});
});
