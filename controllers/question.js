const QuestionModel = require("../models/question");
const UserModel = require("../models/user");
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");


module.exports.GET_ALL_QUESTIONS = async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json({ questions: questions });
    } catch (err) {
        res.status(500).json({ response: "Err in DB" });
    }
};


module.exports.POST_QUESTION = async (req, res) => {
    try {
        if (req.body.subject.length > 0 && req.body.details.length > 0) {
            const question_id = uniqid();
            const question = new QuestionModel({
                id: question_id,
                subject: req.body.subject,
                details: req.body.details
            });
            await question.save();

            const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            UserModel.updateOne({ id: decoded.userId }, { $push: { question_ids: question_id } }).exec();

            res.status(200).json({ response: "Question was created successfully" });
        } else {
            res.status(400).json({ response: "Subject or details cannot be empty" });
        }
    } catch (err) {
        res.status(500).json({ response: "Error inserting a question into DB" });
    }
};


module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
    try {
        const question = await QuestionModel.deleteOne({ id: req.params.id });
        const user = await UserModel.updateOne({question_ids: req.params.id}, { $pull: { question_ids: req.params.id } })
        res.status(200).json({ question: question , user: user});
    } catch (err) {
        res.status(500).json({ response: "Err in DB" });
    }
};

