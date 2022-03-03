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
    s_contact: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gruop_g_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'group',
        key: 'g_code'
      }
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
      {
        name: "fk_student_gruop1_idx",
        using: "BTREE",
        fields: [
          { name: "gruop_g_code" },
        ]
      },
    ]
  });
};
