const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node command.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields("Test");
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("subscribe", async function () {
		it("Should be rejected if arguement is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.subscribe("")).to.be.rejected;
		});

		it("should be rejected if argument contain unexpected property", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.subscribe({ testProperty: "Test" })).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.command.subscribe({ measurement_code: 1 });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.subscribe({ measurement_code: 1 })).to.be.rejected;
		});
	});

	describe("Unsubscribe", async function () {
		it("Should be rejected if argument is not a string", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.unsubscribe(1)).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.command.unsubscribe("");

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.unsubscribe("")).to.be.rejected;
		});
	});

	describe("Request", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.command.request();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.request()).to.be.rejected;
		});
	});

	describe("Acknowledge", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.command.acknowledge();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.command.acknowledge()).to.be.rejected;
		});
	});
});
