const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node event.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Subscribe", async function () {
		it("Should be rejected if argument is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.event.subscribe("")).to.be.rejected;
		});

		it("Should be rejected if argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.event.subscribe(null)).to.be.rejected;
		});

		it("Should be rejected due to unexpected properties", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.event.subscribe({ testproperty: 1 })).to.be.rejected;
		});

		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.event.subscribe({});

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.event.subscribe({})).to.be.rejected;
		});
	});

	describe("Unsubscribe", async function () {
		it("Should be rejected if argument is not string", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.event.unsubscribe({})).to.be.rejected;
		});

		it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await senfi.event.unsubscribe("");

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);
			await expect(senfi.event.unsubscribe("")).to.be.rejected;
		});
	});

	describe("Generate", async function () {
		it("Should be rejected if argument eventDefId is not number and embeddedInputs is not object and is not null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			// eventDefId, type, embeddedInputs, eventParams
			await expect(senfi.event.generate("", "", "", {})).to.be.rejected;
		});

		it("Should be rejected if argument embeddedInputs is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			// eventDefId, type, embeddedInputs, eventParams
			await expect(senfi.event.generate(0, "measurement", "", {})).to.be.rejected;
		});

		it("Should be rejected if argument eventParams is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			// eventDefId, type, embeddedInputs, eventParams
			await expect(senfi.event.generate(0, "measurement", {}, "")).to.be.rejected;
		});

		it("Should be rejected if eventDefId is not a number", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			// eventDefId, type, embeddedInputs, eventParams
			await expect(senfi.event.generate("", "measurement", {}, { metric_caused: [], measurement_snapshot: [] })).to.be.rejected;
		});

		it("Should be rejected if argument type is not listed", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret, config);

			// eventDefId, type, embeddedInputs, eventParams
			await expect(senfi.event.generate(0, "", {}, {})).to.be.rejected;
		});

		describe("When argument type is 'measurement'", async function () {
			it("Should be rejected if eventParams is not object", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "measurement", {}, 0)).to.be.rejected;
			});

			it("Should be rejected if eventParams is null", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "measurement", {}, null)).to.be.rejected;
			});

			it("Should be rejected if eventParams contain unexpected properties", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "measurement", {}, { testproperty: 1 })).to.be.rejected;
			});

			it("Should be rejected if eventParams metric_caused is not array", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "measurement", {}, { metric_caused: 1 })).to.be.rejected;
			});

			it("Should be rejected if eventParams measurement_snapshot is not array", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "measurement", {}, { measurement_snapshot: 1 })).to.be.rejected;
			});
		});

		describe("When argument type is 'event'", async function () {
			it("Should be rejected if eventParams is not object", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "event", {}, 0)).to.be.rejected;
			});

			it("Should be rejected if eventParams is null", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "event", {}, null)).to.be.rejected;
			});

			it("Should be rejected if eventParams contain unexpected properties", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "event", {}, { testproperty: 1 })).to.be.rejected;
			});

			it("Should be rejected if eventParams event_data is not array", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "event", {}, { event_data: 1 })).to.be.rejected;
			});
		});

		describe("When argument type is 'alarm'", async function () {
			it("Should be rejected if eventParams is not object", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "alarm", {}, 0)).to.be.rejected;
			});

			it("Should be rejected if eventParams is null", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "alarm", {}, null)).to.be.rejected;
			});

			it("Should be rejected if eventParams contain unexpected properties", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "alarm", {}, { testproperty: 1 })).to.be.rejected;
			});

			it("Should be rejected if eventParams alarm_data is not array", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "alarm", {}, { alarm_data: 1 })).to.be.rejected;
			});
		});

		describe("When argument type is 'command'", async function () {
			it("Should be rejected if eventParams is not object", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "command", {}, 0)).to.be.rejected;
			});

			it("Should be rejected if eventParams is null", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "command", {}, null)).to.be.rejected;
			});

			it("Should be rejected if eventParams contain unexpected properties", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "command", {}, { testproperty: 1 })).to.be.rejected;
			});

			it("Should be rejected if eventParams command_data is not array", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "command", {}, { command_data: 1 })).to.be.rejected;
			});
		});

		describe("When argument type is 'log'", async function () {
			it("Should be rejected if eventParams is not object", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "log", {}, 0)).to.be.rejected;
			});

			it("Should be rejected if eventParams is null", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "log", {}, null)).to.be.rejected;
			});

			it("Should be rejected if eventParams contain unexpected properties", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "log", {}, { testproperty: 1 })).to.be.rejected;
			});

			it("Should be rejected if eventParams log_data is not array", async function () {
				let senfi = Senfi();

				await senfi.initialize(testData.key, testData.secret, config);

				// eventDefId, type, embeddedInputs, eventParams
				await expect(senfi.event.generate(0, "log", {}, { log_data: 1 })).to.be.rejected;
			});
		});
	});
});
