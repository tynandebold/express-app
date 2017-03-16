import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import Datastore from 'nedb';

const dbFilepath = path.join(__dirname, '../data.db')

const db = new Datastore({
  filename: dbFilepath,
  autoload: true
});

const router = Router();

router.get('/migrate/', (req, res) => {
  fs.truncateSync(dbFilepath, 0);

  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/seed.json'), 'utf-8'));

  db.insert(data, (err, newDoc) => {
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

router.get('/countries/', (req, res) => {
  db.find({}, function (err, docs) {
    res.json({
      ok: true,
      docs
    });
  });
});

router.get('/countries/:country', (req, res) => {
  const country = req.params.country;

  db.find({ country }, (err, docs) => {
    res.json({
      ok: true,
      docs
    });
  });
});

router.get('/group/:group', (req, res) => {
  const group = req.params.group;
  let queryResult;

  db.find({}, function (err, docs) {

    const continents = docs
      .map((obj) => obj.continent)
      .filter((item, index, inputArray) => inputArray.indexOf(item) == index);

    const subjects = docs
      .map((obj) => obj.subject)
      .filter((item, index, inputArray) => inputArray.indexOf(item) == index);

    if (continents.indexOf(group) > -1) {
      queryResult = docs.filter(place => place.continent == group);
    } else if (subjects.indexOf(group) > -1) {
      queryResult = docs.filter(place => place.subject == group);
    } else if (continents.indexOf(group) == -1 || subjects.indexOf(group) == -1) {
      queryResult = 'no matching results';
    }

    res.json({
      ok: true,
      queryResult
    });
  });
});

export default router;
