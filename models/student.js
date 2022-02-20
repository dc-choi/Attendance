const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    s_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    s_society_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    s_catholic_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    s_age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    s_grade: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    s_contact: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "s_code" },
        ]
      },
    ]
  });
};
