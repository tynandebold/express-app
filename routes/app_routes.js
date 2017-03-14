module.exports = function(app, db) {
  app.post('/places', (req, res) => {
    console.log(req.body);
    res.send('post route working');
  });
};

// var Datastore = require('nedb');
// var db        = new Datastore();
//
// module.exports = function(app, db) {
//   app.post('/places', (req, res) => {
//
//     const place = { country: req.body.country, continent: req.body.continent };
//
//     db.insert(place, function(err, newPlace) {
//       if (err) {
//         res.send({ 'error': 'An error has occurred' });
//       } else {
//         res.send(newPlace);
//       }
//     });
//   });
// };