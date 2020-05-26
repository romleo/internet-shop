const dac = require('../dac/productImage');

app.post('/product/add-image', (request, response) => {
  const data = request.query;

  if (data.productId && data.imageId) {
    dac.addImageToProduct(data.productId, data.imageId)
        .then((status) => response.send(status))
        .catch((err) => response.status(err.status).send(err.message));
  } else {
    response.status(500).send({error: 'rows are required'});
  }
});

app.delete('/product/remove-image', (request, response) => {
  const data = request.query;

  if (data.productId && data.imageId) {
    dac.removeImageFromProduct( data.productId, data.imageId)
        .then((status) => response.send(status))
        .catch((err) => response.status(err.status).send(err.message));
  } else {
    response.status(500).send({error: 'rows are required'});
  }
});