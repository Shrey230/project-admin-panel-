// Import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// Add http dependency in chai
chai.use(chaiHttp);

// Import server
const app = require('../../app');

// Import function to generate token
const { generateToken } = require('../../helpers/token');

chai.should();

describe("Rides Tests", function () {

    describe("Create ride tests", function () {

        function createRide(ride) {
            const token = generateToken({
                userId: "61df6e45bd6fe4e712e20dac"
            })
            return chai.request(app)
                .post('/rides')
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(ride)
        }

        it ("Should have route to create ride", function (done) {
            createRide({})
                .end(function (err, res) {
                    res.status.should.not.be.equal(404)
                    done()
                })
        })

        it ("Should throw error if from is not present", function (done) {
            const ride = {};
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from location is required")
                    done()
                })
        })

        it ("Should throw error if from is not an object", function (done) {
            const ride = {
                from: "Toronto"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from location must be an object")
                    done()
                })
        })

        it ("Should throw error if from is empty", function (done) {
            const ride = {
                from: {}
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from location cannot be empty")
                    done()
                })
        })

        it ("Should throw error if from.locationName is not present", function (done) {
            const ride = {
                from: {
                    test: "x"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of from is required")
                    done()
                })
        })

        it ("Should throw error if from.locationName is empty", function (done) {
            const ride = {
                from: {
                    locationName: ""
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of from is required")
                    done()
                })
        })

        it ("Should throw error if from.latitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of from is required")
                    done()
                })
        })

        it ("Should throw error if from.latitude is not number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: "test"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of from must be a number")
                    done()
                })
        })

        it ("Should throw error if from.longitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 10
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of from is required")
                    done()
                })
        })

        it ("Should throw error if from.longitude is not number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: "Test"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of from must be a number")
                    done()
                })
        })

        it ("Should throw error if to is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("to location is required")
                    done()
                })
        })

        it ("Should throw error if to is empty", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {}
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("to location cannot be empty")
                    done()
                })
        })

        it ("Should throw error if to is not an object", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: "Toronto"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("to location must be an object")
                    done()
                })
        })

        it ("Should throw error if to.locationName is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    tet: "x"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of to is required")
                    done()
                })
        })

        it ("Should throw error if to.locationName is empty", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "   "
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of to is required")
                    done()
                })
        })

        it ("Should throw error if to.latitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of to is required")
                    done()
                })
        })

        it ("Should throw error if to.latitude is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: "20"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of to must be a number")
                    done()
                })
        })

        it ("Should throw error if to.longitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: 20
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of to is required")
                    done()
                })
        })

        it ("Should throw error if to.longitude is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: "40"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of to must be a number")
                    done()
                })
        })

        it ("Should throw error if from and to have same latitude and longitude", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from and to must be different locations")
                    done()
                })
        })

        it ("Should throw error if startDateAndTime is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Start date and time are required")
                    done()
                })
        })

        it ("Should throw error if startDateAndTime is not valid date time string", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "test"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Start date and time value is not valid date time string")
                    done()
                })
        })

        it ("Should throw error if number of seats is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Number of seats is required")
                    done()
                })
        })

        it ("Should throw error if number of seats is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: "4"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Number of seats must be a number")
                    done()
                })
        })

        it ("Should throw error if price per seat is absent", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Price per seat is required")
                    done()
                })
        })

        it ("Should throw error if price per seat is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: "25"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Price per seat must be a number")
                    done()
                })
        })

        it ("Should throw error if preferences is not an array", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: "dog, no_smoke"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Preferences must be an array")
                    done()
                })
        })

        it ("Should throw error if preferences is not an array", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "Test"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Payment type must be 'cash' or 'card'")
                    done()
                })
        })

        it ("Should throw error if any stop is not a valid location field", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 90,
                        "longitude": 100
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": "x",
                        "longitude": "y"
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of Stop[1] must be a number")
                    done()
                })
        })

        it ("Should throw error if any stop is repeated", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 90,
                        "longitude": 100
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 90,
                        "longitude": 100
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Stop[0] and Stop[1] must be different locations")
                    done()
                })
        })

        it ("Should throw error if any stop is same as from", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 20,
                        "longitude": 40
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 35,
                        "longitude": 47
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Stop[0] and from must be different locations")
                    done()
                })
        })

        it ("Should throw error if any stop is same as to", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 15,
                        "longitude": 35
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 40,
                        "longitude": 80
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Stop[1] and to must be different locations")
                    done()
                })
        })

        it ("Should create ride if all fields are valid", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 27,
                        "longitude": 45
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 37,
                        "longitude": 77
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("message")
                    res.body.should.haveOwnProperty("data")
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Ride created successfully")
                    res.body.data.should.haveOwnProperty("_id");
                    done()
                })
        })

    })

    describe("Get rides tests", function () {
        function getRides(filters={}) {
            const token = generateToken({ userId: 1 });
            const queryString = Object.keys(filters).map(key => {
                return `${key}=${filters[key]}`;
            }).join("&")
            return chai.request(app)
                .get('/rides?' + queryString)
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token)
        }

        it ("Should have endpoint to get rides", function () {
            getRides()
                .end(function (err, res) {
                    res.status.should.not.be.equal(404)
                })
        })

        it ("Should return empty array if no filters present", function () {
            getRides()
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("message")
                    res.body.should.haveOwnProperty("data")
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Rides fetched successfully")
                    res.body.data.should.have.length(0);
                })
        })

        it ("Should return rides array if filters provided", function (done) {
            const filters = {
                from: "Toronto",
                to: "Ottawa"
            }
            getRides(filters)
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("message")
                    res.body.should.haveOwnProperty("data")
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Rides fetched successfully")
                    res.body.data.length.should.be.greaterThan(0);
                    done()
                })
        })
    })

})