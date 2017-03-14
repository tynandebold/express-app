'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const fs         = require('fs');
const app        = express();

app.use(bodyParser.urlencoded({ extended: true }));

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

app.get('/', (req, res) => {
  res.send(`<p><small>country</small>: ${data[0].country}<br>
            <small>continent</small>: ${data[0].continent}<br>
            <small>subject</small>: ${data[0].subject}</p>`);
});

app.get('/api/countries/:country', (req, res) => {
    const country = req.params.country;
    const queryResult = data.filter(place => place.country == country);

    res.json(queryResult);
});

app.get('/api/group/:group', (req, res) => {
    const group = req.params.group;
    let queryResult;

    const continents = data
      .map((obj) => obj.continent)
      .filter((item, index, inputArray) => inputArray.indexOf(item) == index);

    const subjects = data
      .map((obj) => obj.subject)
      .filter((item, index, inputArray) => inputArray.indexOf(item) == index);

    if (continents.indexOf(group) > -1) {
      queryResult = data.filter(place => place.continent == group);
    }

    if (subjects.indexOf(group) > -1) {
      queryResult = data.filter(place => place.subject == group);
    }

    res.json(queryResult);
});

app.get('/api/countries/', (req, res) => res.json(data));

const port = process.env.PORT || 8080;

require('./routes')(app, {data});

app.listen(port);
console.log(`I'm at http://localhost:${port}`);