const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Test senfi-node eventdefinition.js", async function () {
	this.beforeEach(function () {
		sinon.stub(Senfi.prototype, "httpRequest").yields();
	});

	this.afterEach(function () {
		Senfi.prototype.httpRequest.restore();
	});

	describe("Get", async function () {
		it("Should be rejected due to argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.eventdef.get(null)).to.be.rejected;
		});

		it("should be rejected due to unexpected values", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.eventdef.get({ event_def_id1: 1 })).to.be.rejected;
		});

    it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.eventdef.get({ type: "external" });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			await expect(senfi.eventdef.get({ event_def_id: 1 })).to.be.rejected;
		});
	});

  describe("Create", async function () {
		it("Should be rejected if argument eventDefParam is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.create(null)).to.be.rejected;
		});

		it("Should be rejected if argument eventParams.name is not defined", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.create({
        description: "description",
        input: [],
        required_tagfield: []
      })).to.be.rejected;
		});

    it("Should be rejected if argument eventParams.description is not defined", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.create({
        name: "name",
        input: [],
        required_tagfield: []
      })).to.be.rejected;
		});

    it("Should be rejected if argument eventParams.input is not defined", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.create({
        name: "name",
        description: "description",
        required_tagfield: []
      })).to.be.rejected;
		});

    it("Should be rejected if argument eventParams.required_tagfield is not defined", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.create({
        name: "name",
        description: "description",
        input: [],
      })).to.be.rejected;
		});

    it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.eventdef.create({
        name: "name",
        description: "description",
        input: [],
        required_tagfield: []
      });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await await expect(senfi.eventdef.create({
        name: "name",
        description: "description",
        input: [],
        required_tagfield: []
      })).to.be.rejected;
		});
  });

  describe("Update", async function () {
    it("Should be rejected if argument eventDefId is not number", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.update(false, {
        name: "name",
        description: "description",
        input: [],
        required_tagfield: []
      })).to.be.rejected;
		});

		it("Should be rejected if argument eventDefParam is not object", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			// eventDefId, type, inputs, eventParams
			await expect(senfi.eventdef.update(1, null)).to.be.rejected;
		});

    it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.eventdef.update(1, {
        name: "name",
        description: "description",
        input: [],
        required_tagfield: []
      });

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await await expect(senfi.eventdef.update(1, {
        name: "name",
        description: "description",
        input: [],
        required_tagfield: []
      })).to.be.rejected;
		});
  });

	describe("Delete", async function () {
		it("Should be rejected due to argument is null", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await expect(senfi.eventdef.delete(null)).to.be.rejected;
		});

    it("should call httpRequest", async function () {
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);
			await senfi.eventdef.delete(1);

			expect(Senfi.prototype.httpRequest.called).equal(true);
		});

		it("should be rejected by httpRequest when throw error", async function () {
			Senfi.prototype.httpRequest.restore();
			sinon.stub(Senfi.prototype, "httpRequest").throws();
			let senfi = Senfi();

			await senfi.initialize(testData.key, testData.secret);

			await expect(senfi.eventdef.delete(1)).to.be.rejected;
		});
	});
});
