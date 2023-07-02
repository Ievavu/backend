const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    id: { type: String, required: true, min: 8 },
    subject: { type: String, required: true, min: 8 },
    details: { type: String, required: true, min: 8 },
    answers: { type: Array, required: false }
});

module.exports = mongoose.model("Question", questionSchema);