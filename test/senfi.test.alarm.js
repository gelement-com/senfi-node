const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node alarm.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	it("Subscribe - Should receive success false due to invalid arguments on subscribing", async function () {
		let senfi = Senfi();

		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.alarm.subscribe().catch(function (err) {
			expect(err).to.have.property("success");
			expect(err.success).equal(false);
		});
	});

	it("Subscribe - should receive success false due to invalid arguments on unexpected values", async function () {
		let senfi = Senfi();

		await senfi.initialize(testData.key, testData.secret, config);
		await senfi.alarm.subscribe({}).catch(function (err) {
			expect(err).to.have.property("success");
			expect(err.success).equal(false);
		});
	});
});
