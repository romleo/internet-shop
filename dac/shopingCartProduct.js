const ShopCart = require('../models/shopingCartProduct');
const product = require('../models/product');
const User = require('../models/user');
const Category = require('../models/category');
const tokenUtils = require('../routes/auth/token-utils');
const ResponseError = require('../routes/auth/response-error');


const addProduct = (id, request) => {
  const promise = new Promise((resolve, reject) => {
    product.findByPk(id, {raw: true})
        .then((product) => {
          if (product) {
            if (product.count > 0) {
              tokenUtils.getUserToken(request)
                  .then((user) => {
                    ShopCart.create({
                      productId: product.id,
                      userId: user.id,
                      count: 1,
                    }).then((res) => resolve(res))
                        .catch((err) => reject(new ResponseError(err, 500)));
                  })
                  .catch((err) => reject(new ResponseError(err, 400)));
            } else {
              reject(new ResponseError('Sorry, the product is missing', 417));
            }
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Incorrect query' + err, 400)));
  });
  return promise;
};


const removeProduct = (id) => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findByPk(id)
        .then((product) => {
          if (product) {
            ShopCart.destroy({where: {id: id}})
                .then(() => resolve({status: 'OK'}))
                .catch((err) => reject(new ResponseError(err, 500)));
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        });
  });
  return promise;
};


const addOneOrMoreProducts = (id, addproduct, request) => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findByPk(id, {
      include: [{
        model: product,
        attributes: ['count']}],
      raw: true,
    })
        .then((product)=> {
          if (product) {
            const maxCount = product['product.count'];
            const total = product.count + +addproduct;

            if (total <= maxCount) {
              ShopCart.update({count: total}, {where: {id: product.id}})
                  .then(() => resolve({status: 'OK'}))
                  .catch((err) => reject(new ResponseError(err, 500)));
            } else {
              reject(new ResponseError(
                  `Sorry, the maximum number of products ${maxCount}`, 400));
            }
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Incorrect query' + err, 400)));
  });
  return promise;
};


const removeOneOrMoreProducts = (id, subtractproduct) => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findByPk(id, {
      include: [{
        model: product,
        attributes: ['count']}],
      raw: true,
    })
        .then((product)=> {
          if (product) {
            let total = product.count - +subtractproduct;

            if (total > 0) {
              ShopCart.update({count: total}, {where: {id: product.id}})
                  .then(() => resolve({status: 'OK'}))
                  .catch((err) => reject(new ResponseError(err, 500)));
            } else {
              total = 1;
              ShopCart.update({count: total}, {where: {id: product.id}})
                  .then(() => resolve({status: 'Minimum sum of products are 1'}))
                  .catch((err) => reject(new ResponseError(err, 500)));
            }
          } else {
            reject(new ResponseError('Id not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Incorrect query' + err, 400)));
  });
  return promise;
};


const getAllProducts = () => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findAll({include: [
      {model: product, include: {model: Category}},
      {model: User}]})
        .then((products) => resolve(products))
        .catch((err) => reject(new ResponseError(err, 500)));
  });
  return promise;
};


const getCountsproducts = () => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'counts'],
      ],
      raw: true,
    })
        .then((count) => {
          ShopCart.findAll({include: [product], raw: true})
              .then((res) => resolve([res, count]))
              .catch((err) => reject(new ResponseError(err, 500)));
        })
        .catch((err) => reject(new ResponseError(err, 500)));
  });
  return promise;
};


const getProductAndPrice = () => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findAll({
      attributes: [],
      include: [{
        model: product,
        attributes: ['name', 'price'],
      }],
      raw: true,
    })
        .then((products) => resolve(products))
        .catch((err) => reject(new ResponseError(err, 500)));
  });
  return promise;
};


const getOverallPriceProducts = () => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('product.price')), 'total'],
      ],
      include: [{
        model: product,
        attributes: [],
      }],
      raw: true,
    })
        .then((products) => resolve(products))
        .catch((err) => reject(new ResponseError(err, 500)));
  });
  return promise;
};


const purchaseProducts = () => {
  const promise = new Promise((resolve, reject) => {
    ShopCart.findAll().then((products) => {
      if (products == 0) {
        reject(new ResponseError('Please add product to cart', 400));
      } else {
        ShopCart.destroy({
          where: {},
          truncate: true,
        })
            .then(() => resolve({status: 'bought'}))
            .catch((err) => reject(new ResponseError(err, 500)));
      }
    });
  });
  return promise;
};

module.exports = {
  addProduct, addOneOrMoreProducts, removeProduct, removeOneOrMoreProducts, getAllProducts,
  getCountsProducts, getProductAndPrice, getOverallPriceProducts, purchaseProducts,
};