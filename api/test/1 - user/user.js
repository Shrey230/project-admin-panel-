// Import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// Add http dependency in chai
chai.use(chaiHttp);

// Import server
const app = require('../../app');

chai.should();

describe("User tests", function () {

    describe("Create user tests", function () {
        function createUser(user) {
            return chai.request(app)
                .post('/users')
                .set("Content-Type", "application/json")
                .send(user)
        }

        it ("Should have route to create user", function (done) {
            const user = {};
            createUser(user)
                .end(function(err, res) {
                    res.status.should.not.be.equal(404);
                    done();
                })
        })

        it ("Should throw error if email is not present", function (done) {
            const user = {};
            createUser(user)
                .end(function(err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email cannot be empty");
                    done();
                })
        })

        it ("Should throw error if email is empty", function (done) {
            const user = {
                email: "    "
            }
            createUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email cannot be empty");
                    done();
                })
        })

        it ("Should throw error if email is not in proper format", function (done) {
            const user = {
                email: "test"
            };
            createUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email is not in proper format");
                    done();
                })
        })

        it ("Should throw error if firstName is not present", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
            };
            createUser(user)
                .end(function(err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("First name cannot be empty");
                    done();
                })
        })

        it ("Should throw error if firstName is empty", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "   "
            };
            createUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("First name cannot be empty");
                    done();
                })
        })

        it ("Should throw error if lastName is not present", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary"
            };
            createUser(user)
                .end(function(err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Last name cannot be empty");
                    done();
                })
        })

        it ("Should throw error if lastName is empty", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary",
                lastName: "   "
            };
            createUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Last name cannot be empty");
                    done();
                })
        })

        it ("Should throw error if password is not present", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary",
                lastName: "Trivedi"
            };
            createUser(user)
                .end(function(err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Password cannot be empty");
                    done();
                })
        })

        it ("Should throw error if password is empty", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary",
                lastName: "Trivedi",
                password: "   "
            };
            createUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Password cannot be empty");
                    done();
                })
        })

        it ("Should throw error if password is less than 6 digits", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary",
                lastName: "Trivedi",
                password: "123"
            };
            createUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Password must be of 6 characters");
                    done();
                })
        })

        it ("Should create user if all validations pass", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary",
                lastName: "Trivedi",
                password: "123456"
            }
            createUser(user)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("message");
                    res.body.should.haveOwnProperty("data");
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("User created successfully");
                    res.body.data.should.haveOwnProperty("token");
                    done();
                })
        });

        it ("Should throw error if email is in use", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                firstName: "Aary",
                lastName: "Trivedi",
                password: "123456"
            }
            createUser(user)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email is already in use");
                    done();
                })
        })
    })

    describe("Login user tests", function () {
        function loginUser(user) {
            return chai.request(app)
                .post('/users/login')
                .set("Content-Type", "application/json")
                .send(user)
        }

        it ("Should have login path", function () {
            loginUser()
                .end(function (err, res) {
                    res.status.should.not.be.equal(404);
                })
        })

        it ("Should throw error if email is not present", function (done) {
            const user = {};
            loginUser(user)
                .end(function(err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email is required");
                    done();
                })
        })

        it ("Should throw error if password is not present", function (done) {
            const user = {
                email: "test"
            };
            loginUser(user)
                .end(function(err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Password is required");
                    done();
                })
        })

        it ("Should throw error if email is incorrect", function (done) {
            const user = {
                email: "test@gmail.com",
                password: "123"
            }
            loginUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("This email is not associated to any account");
                    done();
                })
        })

        it ("Should throw error if password is incorrect", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                password: "123"
            }
            loginUser(user)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Password is incorrect");
                    done();
                })
        })

        it ("Should return token if authenticated", function (done) {
            const user = {
                email: "aarytrivedi@gmail.com",
                password: "123456"
            }
            loginUser(user)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("message");
                    res.body.should.haveOwnProperty("data");
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Authenticated successfully");
                    res.body.data.should.haveOwnProperty("token");
                    done();
                })
        })
    })

})