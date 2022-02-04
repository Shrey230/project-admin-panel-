const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "passenger"
    },
    driverDetailsValid: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;