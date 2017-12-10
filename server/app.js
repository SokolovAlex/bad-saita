const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config.json');
const cors = require('cors');
const api = require('./api/questions');
const resultsApi = require('./api/results');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../dist'));

app.use('/api/questions', api(app));
app.use('/api/results', resultsApi(app));

app.use('/', (req, res, next) => {
    return res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

const port = config.port;
app.listen(port, () => {
    console.log(`Bad Saita api starting on port ${port}!`);
});