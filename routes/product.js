const Item = require('../models/product');

app.get('/product', (request, response) => {
  res.send('Hello World');
});

app.post('/product', (request, response) => {
  const data = request.query;
  Item.create({
    name: data.name,
    rank: data.rank,
    image: data.image,
    description: data.description,
    price: data.price,
    count: data.count,
    rating: data.rating,
    isEnabled: data.isEnabled,
  }).then(() => response.status(200).send('OK'))
      .catch((err) => response.status(400).send('Error created product'));
});
