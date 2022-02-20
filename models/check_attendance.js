const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('check_attendance', {
    student_s_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'student',
        key: 's_code'
      }
    },
    attendance_a_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'attendance',
        key: 'a_code'
      }
    }
  }, {
    sequelize,
    tableName: 'check_attendance',
    timestamps: false,
    indexes: [
      {
        name: "fk_table1_student_idx",
        using: "BTREE",
        fields: [
          { name: "student_s_code" },
        ]
      },
      {
        name: "fk_table1_attendance1_idx",
        using: "BTREE",
        fields: [
          { name: "attendance_a_code" },
        ]
      },
    ]
  });
};
