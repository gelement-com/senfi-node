const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node bbl.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest_1_0").yields("Test");
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest_1_0.restore();
	});

	describe("isPointInBuilding", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointInBuilding();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointInBuilding()).to.be.rejected;
		});
	});

	describe("isPointInBlock", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointInBlock();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointInBlock()).to.be.rejected;
		});
	});

	describe("isPointOnLevel", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointOnLevel();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointOnLevel()).to.be.rejected;
		});
	});

	describe("isPointAboveLevel", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointAboveLevel();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointAboveLevel()).to.be.rejected;
		});
	});

	describe("isPointAboveOrOnLevel", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointAboveOrOnLevel();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointAboveOrOnLevel()).to.be.rejected;
		});
	});

	describe("isPointBelowLevel", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointBelowLevel();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointBelowLevel()).to.be.rejected;
		});
	});

	describe("isPointBelowOrOnLevel", async function () {
		it("Should call httpRequest_1_0", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.bbl.isPointBelowOrOnLevel();

			expect(Senfi.prototype.httpRequest_1_0.called).equal(true);
		});

		it("should be rejected by httpRequest_1_0 when throw error", async function () {
			Senfi.prototype.httpRequest_1_0.restore();
			sinon.stub(Senfi.prototype, "httpRequest_1_0").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.bbl.isPointBelowOrOnLevel()).to.be.rejected;
		});
	});
});
