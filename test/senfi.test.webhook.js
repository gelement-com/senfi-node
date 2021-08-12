const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node webhook.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("set", async function () {
		it("Should be rejected if argument is not a string", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.webhook.set({})).to.be.rejected;
		});

		it("Should be rejected if argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.webhook.set(null)).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.webhook.set("");
			await expect(Senfi.prototype.httpRequest.called);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.webhook.set("")).to.be.rejected;
		});
	});

	describe("get", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.webhook.get();
			await expect(Senfi.prototype.httpRequest.called);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.webhook.get()).to.be.rejected;
		});
	});
});
