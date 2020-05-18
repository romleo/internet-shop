const Image = sequelize.define('product', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Image;
