const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node alarm.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Subscribe", async function () {
		it("Should be rejected due to argument is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.subscribe("")).to.be.rejected;
		});

		it("Should be rejected due to argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.subscribe(null)).to.be.rejected;
		});

		it("Should be rejected due to object not having expected values", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.subscribe({ site_id1: 0 })).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.alarm.subscribe({ site_id: null, asset_id: null, event_def_id: null });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.subscribe({ site_id: null, asset_id: null, event_def_id: null })).to.be.rejected;
		});
	});

	describe("Unsubscribe", async function () {
		it("Should be rejected due to argument is not string", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.unsubscribe({})).to.be.rejected;
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.alarm.unsubscribe("");

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should be resolved by httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.unsubscribe("")).to.be.fulfilled;
		});

		it("Should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.alarm.unsubscribe("")).to.be.rejected;
		});
	});
});
