const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attendance', {
    a_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    a_date: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'attendance',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "a_code" },
        ]
      },
    ]
  });
};
