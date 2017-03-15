import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import Datastore from 'nedb';

const db = new Datastore({
  filename: path.join(__dirname, '../data.db'),
  autoload: true
});

const router = Router();

router.get('/migrate/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

  db.insert(data, function (err, newDoc) {
    if(err) {
      res.json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      newDoc
    });
  });
});

router.get('/countries/', (req, res) => res.json(data));

router.get('/country/:country', (req, res) => {
  const country = req.params.country;

  db.find({ country }, function (err, docs) {
    res.json({
      ok: true,
      docs
    });
  });
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
