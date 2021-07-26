const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");

describe.only("Test senfi-node alarm.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Subscribe", async function () {
		it("Should receive success false due to invalid arguments", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.alarm.subscribe();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err.success).equal(false);
			}
		});

		it("Should receive success false due to unexpected values", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			try {
				await senfi.alarm.subscribe({});
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err.success).equal(false);
			}
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.alarm.subscribe({ site_id: null, asset_id: null, event_def_id: null });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should receive errcode sdk_exception", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.alarm.subscribe({ site_id: null, asset_id: null, event_def_id: null });
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});

	describe("Unsubscribe", async function () {
		it("Should receive success false due to invalid argument", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.alarm.unsubscribe();
			} catch (err) {
				expect(err).to.have.property("success");
				expect(err.success).equal(false);
			}
		});

		it("Should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.alarm.unsubscribe("");

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("Should call receive errcode sdk_exception", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();

			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			try {
				await senfi.alarm.unsubscribe("");
			} catch (err) {
				expect(err).to.have.property("errcode");
				expect(err.errcode).equal("sdk_exception");
			}
		});
	});
});
