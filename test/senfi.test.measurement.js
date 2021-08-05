const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node measurement.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Subscribe", async function () {
		it("Should be rejected if argument is not an object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.subscribe("")).to.be.rejected;
		});

		it("Should be rejected if argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.subscribe(null)).to.be.rejected;
		});

		it("Should be rejected if argument does not contain measurement_code property", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.subscribe({ testproperty: 1 })).to.be.rejected;
		});

		it("Should be rejected if argument contain measurement_code and unexpected property", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.subscribe({ measurement_code: 0, testproperty: 1 })).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.measurement.subscribe({ measurement_code: 0 });
			await expect(Senfi.prototype.httpRequest.called);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.subscribe({ measurement_code: 0 })).to.be.rejected;
		});
	});

	describe("Unsubscribe", async function () {
		it("Should be rejected if argument is not a string", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.unsubscribe(0)).to.be.rejected;
		});

		it("Should be rejected if argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.unsubscribe(null)).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.measurement.subscribe({ measurement_code: 0 });
			await expect(Senfi.prototype.httpRequest.called);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.unsubscribe("")).to.be.rejected;
		});
	});

	describe("Publish", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.measurement.publish(0, [{ testproperty: 0 }], "live");
			await expect(Senfi.prototype.httpRequest.called);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.measurement.publish(0, [{ testproperty: 0 }], "live")).to.be.rejected;
		});
	});
});
