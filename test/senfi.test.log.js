const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node log.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Subscribe", async function () {
		it("Should be rejected when argument is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.log.subscribe("")).to.be.rejected;
		});

		it("Should be rejected when argument does not contain unexpected property", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.log.subscribe({ testproperty: 1 })).to.be.rejected;
		});

		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.log.subscribe({ component: "" });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.log.subscribe({ component: [] })).to.be.rejected;
		});
	});

	describe("Unsubscribe", async function () {
		it("Should be rejected if argument is not a string", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.log.unsubscribe({})).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.log.unsubscribe("");
			await expect(Senfi.prototype.httpRequest.called);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.log.unsubscribe("")).to.be.rejected;
		});
	});
});
