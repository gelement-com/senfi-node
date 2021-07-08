const testData = require("./test-data.json");
const Senfi = require("../lib/senfi");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const config = { host: "api.dev.senfi.io" };

chai.use(chaiHttp);

describe.only("Testing Senfi action.js", async function () {
	it("Expects a notification to be sent to test email ", function (done) {
		let senfi = Senfi();

		senfi.initialize(testData.key, testData.secret, config);

		senfi.action.email([testData.email], "Senfi Email Subject Test", "Senfi email content test").then(function (res) {
			expect(res).to.be.an("object");
			expect(res).to.have.property("success");
			expect(res.success).equal(true);

			done();
		});

		// chai
		//   .request(url)
		//   .post("/token")
		//   .set({ "content-type": "application/x-www-form-urlencoded" })
		//   .send({
		//     client_id: keys.key,
		//     client_secret: keys.secret,
		//     grant_type: "client_credentials"
		//   })
		//   .end(function (err, res) {
		//     expect(res).to.have.status(200);
		//     expect(res.body).to.have.property("access_token");
		//     expect(res.body).to.have.property("expires_in");
		//     expect(res.body).to.have.property(".expire");

		//     token = res.body;
		//     done();
		//   });
	});
});
