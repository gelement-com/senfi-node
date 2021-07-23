const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node asset.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields("Test");
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("isPointInBuilding", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointInBuilding();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error());

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.bbl.isPointInBuilding();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("isPointInBlock", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointInBlock();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error());

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.bbl.isPointInBlock();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("isPointOnLevel", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointOnLevel();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error());

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.bbl.isPointOnLevel();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("isPointAboveLevel", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointAboveLevel();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error());

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.bbl.isPointAboveLevel();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("isPointAboveOrOnLevel", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointAboveOrOnLevel();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error());

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.bbl.isPointAboveOrOnLevel();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("isPointBelowLevel", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointBelowLevel();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws(new Error());

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.bbl.isPointBelowLevel();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});
});
