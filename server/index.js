'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const fs         = require('fs');
const app        = express();

import api from './routes/api';


app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//   res.send(`<p><small>country</small>: ${data[0].country}<br>
//             <small>continent</small>: ${data[0].continent}<br>
//             <small>subject</small>: ${data[0].subject}</p>`);
// });
//
// app.get('/api/countries/:country', (req, res) => {
//     const country = req.params.country;
//     const queryResult = data.filter(place => place.country == country);
//
//     res.json(queryResult);
// });
//
// app.get('/api/group/:group', (req, res) => {
//     const group = req.params.group;
//     let queryResult;
//
//     const continents = data
//       .map((obj) => obj.continent)
//       .filter((item, index, inputArray) => inputArray.indexOf(item) == index);
//
//     const subjects = data
//       .map((obj) => obj.subject)
//       .filter((item, index, inputArray) => inputArray.indexOf(item) == index);
//
//     if (continents.indexOf(group) > -1) {
//       queryResult = data.filter(place => place.continent == group);
//     }
//
//     if (subjects.indexOf(group) > -1) {
//       queryResult = data.filter(place => place.subject == group);
//     }
//
//     res.json(queryResult);
// });

app.use('/api', api);

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`I'm at http://localhost:${port}`);
