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
    },
    a_content: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    student_s_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'student',
        key: 's_code'
      }
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
      {
        name: "fk_attendance_student_idx",
        using: "BTREE",
        fields: [
          { name: "student_s_code" },
        ]
      },
    ]
  });
};
