const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { GET_ANSWERS_BY_QUESTION_ID, POST_ANSWER_TO_QUESTION, DELETE_ANSWER } = require("../controllers/answer");

router.get("/question/:id/answers", GET_ANSWERS_BY_QUESTION_ID);
router.post("/question/:id/answer", POST_ANSWER_TO_QUESTION);
router.delete("/answer/:id", DELETE_ANSWER);

module.exports = router;