const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    id: { type: String, required: true, min: 8 },
    answer_text: { type: String, required: true, min: 2 },
    likes: { type: Number, required: false}
});

module.exports = mongoose.model("Answer", answerSchema);