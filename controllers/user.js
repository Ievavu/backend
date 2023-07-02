const UserModel = require("../models/user");
const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.REGISTER = async (req, res) => {
    try {
        if (req.body.email.includes("@") && req.body.password.length > 5) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    const user = new UserModel({
                        id: uniqid(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                    });
                    await user.save();
                })
            });
            res.status(200).json({ response: "User was created successfully" });
        } else {
            res.status(400).json({ response: "Validation failed" });
        }
    } catch (err) {
        res.status(500).json({ response: "Error inserting a user into DB" });
    }
};


module.exports.LOGIN = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ response: "Wrong email or password" });
        }
        bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
            if (isPasswordMatch) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_SECRET, { expiresIn: "2h" }, { algorithm: "RS256" });

                return res.status(200).json({ response: "You logged in", jwt: token });
            } else {
                return res.status(404).json({ response: "Wrong email or password" });
            }
        });
    } catch (err) {
        console.log("ERR", err);
        res.status(500).json({ response: "ERROR, please try later" });
    }
};
