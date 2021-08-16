const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node site.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Get", async function () {
		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.site.get();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			await expect(senfi.site.get()).to.be.rejected;
		});
	});

	describe("getDetail", async function () {
		it("Should be rejected when argument is not object", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.site.getDetail("")).to.be.rejected;
		});

		it("Should be rejected when argument is null", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.site.getDetail(null)).to.be.rejected;
		});

		it("Should be rejected when argument have unexpected values", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.site.getDetail({ asset_id1: 1 })).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.site.getDetail({ site_id: 1 });
			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.site.getDetail({ site_id: 1 })).to.be.rejected;
		});
	});
});
