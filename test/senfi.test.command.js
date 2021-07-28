const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe.only("Test senfi-node command.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields("Test");
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("subscribe", async function () {
		it("Should reject if arguement is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.subscribe("")).to.be.rejected;
		});

		it("should reject if argument contain unexpected property", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.subscribe({ testProperty: "Test" })).to.be.rejected;
		});
	});
});
