import { Router } from 'express';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
const router = Router();

router.get('/countries/', (req, res) => res.json(data));

router.get('/country/:country', (req, res) => {
    const country = req.params.country;
    const queryResult = data.filter(place => place.country == country);

    res.json(queryResult);
});

router.get('/group/:group', (req, res) => {
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

export default router;
