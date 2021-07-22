const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node asset.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Get", async function () {
		it("Should receive success false due to invalid arguments", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.asset.get();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err.success).equal(false);
			}
		});

		it("should receive success false due to unexpected values", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.asset.get({});
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err.success).equal(false);
			}
		});

		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.asset.get({ site_id: null, asset_id: null, tag: null });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});
	});

	describe("getAssetIdFromTag", async function () {
		it("getAssetIdFromTag - should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.asset.getAssetIdFromTag();
			} catch (ex) {
				// testing if httpRequest is called. Not testing if success is true
				expect(Senfi.prototype.httpRequest.called).equal(true);
			}
		});
	});
});
