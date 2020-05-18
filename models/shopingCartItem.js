const ShopingCartProduct = sequelize.define('shopingCartProduct', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  count: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ShopingCartProduct;
