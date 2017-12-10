const express = require('express');
const _ = require('lodash');
const questions = require('../questions');
const db = require('node-localdb');
const fs = require('fs');
const modeHelper = require('../mode-helper');

const router = express.Router();
const Result = db('db/results.json');
const maxPoints = questions.reduce((memo, item) => memo + item.points, 0);

const medianDate = new Date('2017-12-10T15:17:32.041Z');
let privateCookie = 'dedmoroz';
let isPrivateMode = false;

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = app => {
    router.post('/', function(req, res) {
        const body = req.body;

        if (isPrivateMode && (!req.cookies[privateCookie] || req.cookies[privateCookie] !== modeHelper.privateCookieValue)) {
            return res.json({ success: true });
        }

        if (!body.nickname || body.points > maxPoints || !validateEmail(body.email)) {
            return res.json({ success: false });
        }

        const resultInfo = Object.assign({}, body, { created: new Date() });
        Result.insert(resultInfo).then(u => {
            res.json({ success: true, added: true });
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

    router.get('/top/day1', (req, res) => {
        Result.find({}).then(results => {
            const sorted = _.sortBy(results, (result) => {
                return -result.points;
            }, 'seconds');

            const filtered = _.filter(sorted, (result) => {
                return new Date(result.created) < medianDate;
            });

            res.json({
                results: filtered,
                maxPoints
            });
        });
    });

    router.get('/top/day2', (req, res) => {
        Result.find({}).then(results => {
            const sorted = _.sortBy(results, (result) => {
                return -result.points;
            }, 'seconds');

            const filtered = _.filter(sorted, (result) => {
                return new Date(result.created) > medianDate;
            });

            res.json({
                results: filtered,
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
        //fs.writeFileSync(pathToDb, '[]');
        res.send('ok');
    });

    router.get('/privatemode', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        isPrivateMode = !isPrivateMode;
        res.json({ isPrivateMode });
    });

    router.get('/privatemodehard', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        //const hardPrivate = modeHelper.togglePrivateHardMode();
        //isPrivateMode = hardPrivate ? true : isPrivateMode;
        //res.json({ hardPrivate });
        res.send('ok');
    });

    router.get('/setcookie', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        res.cookie(privateCookie, modeHelper.privateCookieValue, { maxAge: 60 * 1000 * 60 * 24 });
        res.send('ok');
    });

    router.get('/removecookie', (req, res) => {
        const query = req.query;
        if (query.pwd !== 'sokolov') {
            return res.send('not ok');
        }
        res.clearCookie(privateCookie);
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