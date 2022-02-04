// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const ridesService = require('../services/rides.service');

// Initialize router
const ridesRouter = express.Router();

// Get rides request
ridesRouter.get("/", verifyToken, async function (req, res, next) {
    try {
        const rides = await ridesService.getRides(req.query);
        httpResponse.sendSuccess(res, "Rides fetched successfully", rides);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Create rides route
ridesRouter.post("/", verifyToken, async function (req, res, next) {
    try {
        const ride = await ridesService.createRide(req.body);
        httpResponse.sendSuccess(res, "Ride created successfully", ride);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = ridesRouter;