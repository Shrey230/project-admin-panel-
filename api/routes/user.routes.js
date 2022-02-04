// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const userService = require('../services/user.service');

// Initialize router
const userRouter = express.Router();

userRouter.post('/', async function (req, res, next) {
    try {
        const result = await userService.createUser(req.body);
        httpResponse.sendSuccess(res, "User created successfully", result);
    }catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

userRouter.post('/login', async function (req, res, next) {
    try {
        const result = await userService.loginUser(req.body);
        httpResponse.sendSuccess(res, "Authenticated successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})


module.exports = userRouter;