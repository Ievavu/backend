const QuestionModel = require("../models/question");
const UserModel = require("../models/user");
const AnswerModel = require("../models/answer");
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");


module.exports.GET_ANSWERS_BY_QUESTION_ID = async (req, res) => {
    try {
        const question = await QuestionModel.aggregate([{
            $match: { id: req.params.id }
        }, {
            $lookup: {
                from: "answers", // The name of the "Answers" collection
                localField: "answers_ids", // The field in the "Questions" collection
                foreignField: "id", // The field in the "Answers" collection
                as: "answers"
            }
        }]);
        res.status(200).json({ question: question });
    } catch (err) {
        res.status(500).json({ response: "Err in DB" });
    }
};


module.exports.POST_ANSWER_TO_QUESTION = async (req, res) => {
    try {
        if (req.body.answer.length > 0) {
            const answer_id = uniqid();
            const answer = new AnswerModel({
                id: answer_id,
                answer_text: req.body.answer
            });
            await answer.save();

            QuestionModel.updateOne({ id: req.params.id }, { $push: { answers_ids: answer_id } }).exec();

            res.status(200).json({ response: "Answer was created successfully" });
        } else {
            res.status(400).json({ response: "Answer cannot be empty" });
        }
    } catch (err) {
        res.status(500).json({ response: "Error inserting a answer into DB" });
    }
};


module.exports.DELETE_ANSWER = async (req, res) => {
    try {
        const answer = await AnswerModel.deleteOne({ id: req.params.id });
        const question = await QuestionModel.updateOne({ answers_ids: req.params.id }, { $pull: { answers_ids: req.params.id } })
        res.status(200).json({ answer: answer, question: question });
    } catch (err) {
        res.status(500).json({ response: "Err in DB" });
    }
};

