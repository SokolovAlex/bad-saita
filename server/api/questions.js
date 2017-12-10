const express = require('express');
const router = express.Router();
const _ = require('lodash');

const questions = require('../questions.js');
const questionsDict = _.keyBy(questions, 'id');
const maxPoints = questions.reduce((memo, item) => memo + item.points, 0);

function isRightAnswer(answers, results) {
    if (results.length !== answers.length) {
        return false;
    }
    return _.isEmpty(_.difference(results, answers));
 }

module.exports = app => {

    router.get('/check', function(req, res) {
        const query = req.query;
        const questionId = query.questionId;
        let userAnswerIds = query.answerIds;
        const question = questionsDict[questionId];

        if (!questionId || !userAnswerIds || !question) {
            return res.json({ success: false });
        }

        userAnswerIds = userAnswerIds.split(',').map(x => parseInt(x, 10));

        const isRight = isRightAnswer(question.answer.ids, userAnswerIds);
        const points = isRight ? question.points : 0;
        let answer = question.answer;

        answer.rightVariants = _.filter(question.variants, variant => question.answer.ids.indexOf(variant.id) >= 0);

        return res.json({ success: true, result: { points, isRight, answer } });
    });

    router.get('/', (req, res) => {
        return res.json({ maxPoints, questions: _.map(questions, q => _.omit(q, 'answer')) });
    });

    router.post('/fake', (req, res) => {
        return res.json({ success: true });
    });

    router.post('/getQuestion', (req, res) => {
        return res.json({ success: true });
    });

    return router;
};