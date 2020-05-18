const Rank = sequelize.define('rank', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    hierarchy: true,
  },
});

module.exports = Rank;
