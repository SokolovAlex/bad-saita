const express = require('express');
const _ = require('lodash');
const questions = require('../questions.js');
const db = require('node-localdb');
const fs = require('fs');

const router = express.Router();
const Result = db('db/results.json');
const maxPoints = questions.reduce((memo, item) => memo + item.points, 0);


module.exports = app => {
    router.post('/', function(req, res) {
        const body = req.body;

        if (!body.nickname) {
            return res.json({ success: 'empty nickname' });
        }

        const resultInfo = Object.assign({ }, body, { created: new Date() });
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
            res.json({ results: limited, maxPoints });
        });
    });

    router.get('/', (req, res) => {
        Result.find({ }).then(results => {
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

    //http://sokolov-al.avp.ru:3000/api/results/remove?id=8181d26a-e60b-4d3c-82e4-0c655b60ead3&pwd=
    router.get('/remove', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        const id = req.query.id;
        if (!id) {
            return res.send('not ok');
        }

        Result.remove({_id: id}).then(function(result){
            res.json({ user: result, success: true });
        });
    });

    return router;
};