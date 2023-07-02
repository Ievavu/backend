const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    id: { type: String, required: true, min: 8 },
    answer: { type: String, required: true, min: 2 }
});

module.exports = mongoose.model("Answer", answerSchema);