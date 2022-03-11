const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node zone.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("isAssetInZone", async function () {
		it("Should be rejected if thrown an error", async function () {
			let senfi = Senfi();

			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error("This is a test"));

			await senfi.initialize(testData.key, testData.secret, { host: "api.dev.senfi.io" });
			await expect(senfi.zone.isAssetInZone(0, 0)).eventually.be.rejected.and.include({
				success: false,
				errmsg: "This is a test",
				errcode: "sdk_exception"
			});
		});

		it("Should be resolved", async function () {
			let senfi = Senfi();

			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").yields({
				success: true,
				zone_result: true
			});

			await senfi.initialize(testData.key, testData.secret, { host: "api.dev.senfi.io" });

			await expect(senfi.zone.isAssetInZone(0, 0)).eventually.be.fulfilled.and.include({
				success: true,
				zone_result: true
			});
		});
	});
});
