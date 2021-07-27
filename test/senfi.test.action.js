const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe.only("Test senfi-node action.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Email", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.action.email(null, null, null);

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should be rejected by httpRequest", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.action.email(null, null, null)).to.be.rejected;
		});
	});

	describe("SMS", async function () {
		it("Should call httpRequest", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.action.sms();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should return errcode exception at httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.action.sms();
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("exception");
			}
		});
	});

	describe("Telegram", async function(){
		it("Should call httpRequest", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.action.telegram();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should return errcode exception at httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.action.telegram();
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("exception");
			}
		});
	})

	describe("Webhook", async function(){
		it("Should call httpRequest", async function () {
			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.action.webhook();

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should return errcode exception at httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();
			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.action.webhook();
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("exception");
			}
		});
	})


	
});
