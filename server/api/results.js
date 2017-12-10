const express = require('express');
const _ = require('lodash');
const questions = require('../questions.js');
const db = require('node-localdb');
const fs = require('fs');

const router = express.Router();
const Result = db('db/results.json');
const maxPoints = questions.reduce((memo, item) => memo + item.points, 0);

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = app => {
    router.post('/', function(req, res) {
        const body = req.body;

        if (!body.nickname) {
            return res.json({ success: false });
        }

        if (body.points > maxPoints) {
            return res.json({ success: false });
        }

        if (!validateEmail(body.email)) {
            return res.json({ success: false });
        }

        const resultInfo = Object.assign({}, body, { created: new Date() });
        Result.insert(resultInfo).then(u => {
            res.json({ success: true });
        });
    });

    router.get('/top', (req, res) => {
        Result.find({}).then(results => {
            const sorted = _.sortBy(results, (result) => {
                return -result.points;
            }, 'seconds');
            const limited = _.take(sorted, 10);
            res.json({
                results: _.map(limited, r => _.omit(r, 'email')),
                maxPoints
            });
        });
    });

    router.get('/', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        Result.find({}).then(results => {
            res.json({ results });
        });
    });

    router.get('/cleardb', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        const pathToDb = 'db/results.json';
        fs.writeFileSync(pathToDb, '[]');
        res.send('ok');
    });

    router.get('/remove', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        const id = req.query.id;
        if (!id) {
            return res.send('not ok');
        }

        Result.remove({ _id: id }).then(function(result) {
            res.json({ user: result, success: true });
        });
    });

    return router;
};