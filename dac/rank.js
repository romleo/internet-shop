const dac = require('../dac/shopingCartProduct');

app.post('/cart/add-product', (request, response) => {
  const data = request.query;

  if (data.id) {
    dac.addProduct(data.id, request)
        .then((product) => response.send(product))
        .catch((err) => response.status(err.status).send(err.message));
  } else {
    response.status(400).send({error: 'Id is required'});
  }
});


app.delete('/cart/remove-product', (request, response) => {
  const data = request.query;

  if (data.id) {
    dac.removeProduct(data.id)
        .then((product) => response.send(product))
        .catch((err) => response.status(err.status).send(err.message));
  } else {
    response.status(400).send({error: 'Id is required'});
  }
});


app.put('/cart/add-one-more-product', (request, response) => {
  const data = request.query;

  if (data.id) {
    dac.addOneOrMoreProducts(data.id, data.addProduct, request)
        .then((product) => response.send(product))
        .catch((err) => response.status(err.status).send(err.message));
  } else {
    response.status(400).send({error: 'Id is required'});
  }
});


app.put('/cart/remove-one-more-product', (request, response) => {
  const data = request.query;

  if (data.id) {
    dac.removeOneOrMoreProducts(data.id, data.subtractProduct)
        .then((product) => response.send(product))
        .catch((err) => response.status(err.status).send(err.message));
  } else {
    response.status(400).send({error: 'Id is required'});
  }
});


app.get('/cart', (request, response) => {
  dac.getAllProducts()
      .then((products) => response.send(products))
      .catch((err) => response.status(err.status).send(err.message));
});


app.get('/cart/details/counts', (request, response) => {
  dac.getCountsProducts()
      .then((product) => response.send(product))
      .catch((err) => response.status(err.status).send(err.message));
});


app.get('/cart/details/product-price', (request, response) => {
  dac.getProductAndPrice()
      .then((products) => response.send(products))
      .catch((err) => response.status(err.status).send(err.message));
});


app.get('/cart/details/sum', (request, response) => {
  dac.getOverallPriceProducts()
      .then((products) => response.send(products))
      .catch((err) => response.status(err.status).send(err.message));
});


app.delete('/cart/purchase', (request, response) => {
  dac.purchaseProducts()
      .then((products) => response.send(products))
      .catch((err) => response.status(err.status).send(err.message));
});