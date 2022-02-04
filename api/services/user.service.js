const { generateToken } = require("../helpers/token");
const validEmail = require("../helpers/validEmail");
const User = require("../models/user");

class UserService {

    async createUser(userDetails) {
        const { email, firstName, lastName, password } = userDetails;
        if (email === undefined || email === null || email.trim().length === 0) {
            throw new Error("Email cannot be empty");
        }
        if (!validEmail(email)) {
            throw new Error("Email is not in proper format");
        }
        if (firstName === undefined || firstName === null || firstName.trim().length === 0) {
            throw new Error("First name cannot be empty");
        }
        if (lastName === undefined || lastName === null || lastName.trim().length === 0) {
            throw new Error("Last name cannot be empty");
        }
        if (password === undefined || password === null || password.trim().length === 0) {
            throw new Error("Password cannot be empty");
        }
        if (password.trim().length < 6) {
            throw new Error("Password must be of 6 characters");
        }
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail !== null) {
            throw new Error("Email is already in use")
        }
        const user = new User(userDetails);
        await user.save();
        const token = generateToken({ ...user._doc });
        return { token };
    }

    async loginUser(userDetails) {
        const { email, password } = userDetails;
        if (email === undefined || email === null) {
            throw new Error("Email is required");
        }
        if (password === undefined || password === null) {
            throw new Error("Password is required");
        }
        const user = await User.findOne({ email });
        if (user === null) {
            throw new Error("This email is not associated to any account");
        }
        if (user.password !== password) {
            throw new Error("Password is incorrect");
        }
        const token = generateToken({ ...user._doc })
        return { token }
    }
    
}

module.exports = new UserService;