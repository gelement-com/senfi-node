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
		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.bbl.isPointInBuilding();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});
	});
});
