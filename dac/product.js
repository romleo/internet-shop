const product = require('../models/product');
const ResponseError = require('../routes/auth/response-error');

const getAllProducts = () => {
  const promise = new Promise((resolve, reject) => {
    product.findAll()
        .then((products) => resolve(products))
        .catch((err) => reject(new ResponseError(err, 500)));
  });
  return promise;
};

const insertProduct = (name, description, price, count, rating, categoryId) => {
  const promise = new Promise((resolve, reject) => {
    product.create({
      name: name,
      description: description,
      price: price,
      count: count,
      rating: rating,
      categoryId: categoryId,
    }).then((product) => resolve(product))
        .catch((err) => reject(new ResponseError(err, 500)));
  });
  return promise;
};


const updateProduct = (id, name, description, price, count, rating) => {
  const promise = new Promise((resolve, reject) => {
    product.findByPk(id)
        .then((product) => {
          if (product) {
            product.update({
              name: name,
              description: description,
              price: price,
              count: count,
              rating: rating,
            }, {where: {id: product.id}})
                .then(() => resolve({status: 'OK'}))
                .catch((err) => reject(new ResponseError(err, 500)));
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Id is incorrect ' + err, 400)));
  });
  return promise;
};


const accessEnableProduct = (id, isEnabled) => {
  const promise = new Promise((resolve, reject) => {
    product.findByPk(id)
        .then((product) => {
          if (product) {
            product.update({
              isEnabled: isEnabled,
            }, {where: {id: product.id}})
                .then(() => resolve({status: 'OK'}))
                .catch((err) => reject(new ResponseError(err, 500)));
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Id is incorrect ' + err, 400)));
  });
  return promise;
};


const deleteProduct = (id) => {
  const promise = new Promise((resolve, reject) => {
    product.findByPk(id)
        .then((product) => {
          if (product) {
            product.destroy({where: {id: product.id}})
                .then(()=> resolve({status: 'OK'}))
                .catch((err) => reject(new ResponseError(err, 500)));
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Id is incorrect ' + err, 400)));
  });
  return promise;
};

module.exports = {
  getAllProducts, insertProduct, updateProduct, accessEnableProduct, deleteProduct,
};