const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: { type: String, required: true, min: 8 },
    name: { type: String, required: true, min: 2 },
    email: { type: String, required: true, min: 8 },
    password: { type: String, required: true, min: 6 },
    question_ids: { type: Array, required: false }
});

module.exports = mongoose.model("User", userSchema);