const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node action.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Email", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.action.email(null, null, null);

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should return errcode exception", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.action.email(null, null, null);
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("exception");
			}
		});
	});

	it("SMS - Should call httpRequest", async function () {
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.sms(null, null, null);

		expect(Senfi.prototype.httpRequest.called).equal(true);
	});

	it("Telegram - Should call httpRequest", async function () {
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.telegram(null, null);

		expect(Senfi.prototype.httpRequest.called).equal(true);
	});

	it("Webhook - Should call httpRequest", async function () {
		let senfi = Senfi();
		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.action.webhook(null, null, null, null);

		expect(Senfi.prototype.httpRequest.called).equal(true);
	});
});
