Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);

sequelize = new Sequelize('internet-shop', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  define: {timestamps: false},
});
console.log('Hello friends');

const Rank = require('../models/rank');
const Image = require('../models/image');
const User = require('../models/user');
const Product = require('../models/product');
const ShoppingCartProduct = require('../models/shopingCartProduct');

Rank.hasMany(Product, {foreignKey: {allowNull: false}});
Product.belongsTo(Rank);

Product.belongsToMany(Image, {
  through: 'ProductImages',
  onDelete: 'cascade'});
Image.belongsToMany(Product, {through: 'ProductImages'});

sequelize.sync({force: true})
    .then(() => console.log('db started'))
    .catch((e) => console.log('Error start' + e));

