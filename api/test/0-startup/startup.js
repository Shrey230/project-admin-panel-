// Import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// Add http dependency in chai
chai.use(chaiHttp);

// Import server
const app = require('../../app');

chai.should();

// Set env to test for further tests
process.env.NODE_ENV = "test"

describe("Startup Tests", function() {

    it ("Should start the server", function (done) {
        chai.request(app)
            .get('/')
            .set("Content-Type", "application/json")
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            })
    })

    it ("Should connect to the mongodb database", function () {
        mongoose.connection.readyState.should.equal(1);
    })
    
})