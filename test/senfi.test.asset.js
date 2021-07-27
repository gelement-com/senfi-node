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
		it("Should receive errcode invalid_argument due to null argument", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.asset.get();
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("invalid_argument");
			}
		});

		it("should receive errcode invalid_argument due to no values", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.asset.get({});
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("invalid_argument");
			}
		});

		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.asset.get({ site_id: null, asset_id: null, tag: null });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should receive errcode sdk_exception at httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.asset.get({});
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("getAssetIdFromTag", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.asset.getAssetIdFromTag();
			} catch (ex) {
				// testing if httpRequest is called. Not testing if success is true
				expect(Senfi.prototype.httpRequest.called).equal(true);
			}
		});

		it("Should receive errcode not_found when no asset", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").yields({ success: true, assets: [] });

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			let result = await senfi.asset.getAssetIdFromTag();

			expect(result).to.have.property("errcode");
			expect(result.errcode).equal("not_found");
		});

		it("Should receive errcode not_found when success false", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").yields({ success: false, errcode: "not_found" });

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			let result = await senfi.asset.getAssetIdFromTag();

			expect(result).to.have.property("errcode");
			expect(result.errcode).equal("not_found");
		});

		it("Should receive errcode exception at httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			try {
				let result = await senfi.asset.getAssetIdFromTag();
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("exception");
			}
		});
	});

	describe("getDetail", async function () {
		it("Should receive errcode invalid_argument when argument is not object", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.asset.getDetail("");
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("invalid_argument");
			}
		});
	});
});
