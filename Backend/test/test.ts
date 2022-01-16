import app from "../index";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

describe("Api testing", () => {
  it("FarmData shoud return 200", (done) => {
    chai
      .request(app)
      .get("/api/farm?year=2020&month=2&sType=pH")
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("FarmStats shoud return 200", (done) => {
    chai
      .request(app)
      .get("/api/farmStats?year=2020&month=2&sType=pH")
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
