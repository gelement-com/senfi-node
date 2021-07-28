const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe.only("Test senfi-node asset.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Get", async function () {
		it("Should be rejected due to argument is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.get("")).to.be.rejected;
		});

		it("Should be rejected due to argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.get(null)).to.be.rejected;
		});

		it("should be rejected due to unexpected values", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.get({ site_id1: 1 })).to.be.rejected;
		});

		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.asset.get({ site_id: null, asset_id: null, tag: null });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			await expect(senfi.asset.get({ site_id: null, asset_id: null, tag: null })).to.be.rejected;
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

		it("Should be resolved with success true when result is returned and asset is found", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").yields({ success: true, assets: [1] });

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			await expect(senfi.asset.getAssetIdFromTag()).to.be.fulfilled;

			let result = await senfi.asset.getAssetIdFromTag();
			expect(result.success).equal(true);
		});

		it("Should be resolved with success false when result is returned but no asset", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").yields({ success: true, assets: [] });

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			await expect(senfi.asset.getAssetIdFromTag()).to.be.fulfilled;

			let result = await senfi.asset.getAssetIdFromTag();
			expect(result.success).equal(false);
		});

		it("Should be resolved with success false when result is returned with success false", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").yields({ success: false, errcode: "not_found" });

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getAssetIdFromTag()).to.be.fulfilled;

			let result = await senfi.asset.getAssetIdFromTag();
			expect(result.success).equal(false);
		});

		it("Should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getAssetIdFromTag()).to.be.rejected;
		});
	});

	describe("getDetail", async function () {
		it("Should be rejected when argument is not object", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getDetail("")).to.be.rejected;
		});

		it("Should be rejected when argument is null", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getDetail(null)).to.be.rejected;
		});

		it("Should be rejected when argument have unexpected values", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getDetail({ asset_id1: 1 })).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.asset.getDetail({ asset_id: 1 });
			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getDetail({ asset_id: 1 })).to.be.rejected;
		});
	});

	describe("getAttributeValue", async function () {
		it("Should be rejected if argument assetParam is not object", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getAttributeValue("", null, null)).to.be.rejected;
		});

		it("Should be rejected if argument assetParam is null", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getAttributeValue(null, null, null)).to.be.rejected;
		});

		it("Should be rejected if argument assetParam contain unexpected properties", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getAttributeValue({ test: 1 }, null, null)).to.be.rejected;
		});

		it("Should be rejected if argument attributeName is not string", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.asset.getAttributeValue({ asset_id: "tempValue" }, 1, null)).to.be.rejected;
		});
	});
});
