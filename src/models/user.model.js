const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required for creating user"],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "name is required for creating an account"]
    },
    password: {
        type: String,
        required: [true, "password is required for creating an account"],
        minlength: [6, "password should be contain more are than 6 characters"],
        select: false
    }
}, {
    timestamps: true
});

userScheme.pre("save", async function() {
    if (!this.isModified("password")) {
        return;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    return;
});

userScheme.methods.comparepassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userScheme);

module.exports = userModel;