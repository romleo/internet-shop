const Rank = require('../models/rank');

app.get('/rank', (request, response) => {
  Rank.findAll({hierarchy: true})
      .then((row) => response.send(row))
      .catch((err) => response.status(500).send(err));
});

app.post('/rank', (request, response) => {
  const data = request.query;
  Rank.create({
    name: data.name,
    parentId: data.parentId,
  }) .then((row) => response.send(row))
     .catch((err) => response.status(500).send(err));
});
