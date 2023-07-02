const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { GET_ALL_QUESTIONS, POST_QUESTION, DELETE_QUESTION_BY_ID } = require("../controllers/question");

router.get("/questions", GET_ALL_QUESTIONS);
router.post("/question", POST_QUESTION);
router.delete("/question/:id", DELETE_QUESTION_BY_ID);

module.exports = router;