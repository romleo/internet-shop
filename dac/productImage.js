const product = require('../models/product');
const Image = require('../models/image');
const ResponseError = require('../routes/auth/response-error');

const addImageToProduct = (productId, imageId) => {
  const promise = new Promise((resolve, reject) => {
    product.findOne({where: {id: productId}})
        .then((product) => {
          if (product) {
            Image.findOne({where: {id: imageId}})
                .then((image) => {
                  if (image) {
                    product.addImage(image)
                        .then(() => resolve({status: 'OK'}))
                        .catch((err) => reject(new ResponseError(err, 500)));
                  } else {
                    reject(new ResponseError('Image not found', 400));
                  }
                })
                .catch((err) => reject(new ResponseError(
                    'Id image is incorrect ' + err, 400)));
          } else {
            reject(new ResponseError('product not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Id product is incorrect ' + err, 400)));
  });
  return promise;
};


const removeImageFromProduct = (productId, imageId) => {
  const promise = new Promise((resolve, reject) => {
    product.findOne({where: {id: productId}})
        .then((product) => {
          if (product) {
            product.getImages()
                .then((images) => {
                  for (image of images) {
                    if (image.id == imageId) {
                      image.productImages.destroy()
                          .then(() => resolve({status: 'OK'}))
                          .catch((err) => reject(new ResponseError(err, 500)));
                    } else {
                      reject(new ResponseError(err, 400));
                    }
                  }
                })
                .catch((err) => reject(new ResponseError('Images ' + err, 500)));
          } else {
            reject(new ResponseError('product not found', 404));
          }
        })
        .catch((err) => reject(new ResponseError('Id product is incorrect ' + err, 400)));
  });
  return promise;
};

module.exports.addImageToProduct = addImageToProduct;
module.exports.removeImageFromProduct = removeImageFromProduct;