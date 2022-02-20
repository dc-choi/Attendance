const DataTypes = require("sequelize").DataTypes;
const _attendance = require("./attendance");
const _check_attendance = require("./check_attendance");
const _student = require("./student");

function initModels(sequelize) {
  const attendance = _attendance(sequelize, DataTypes);
  const check_attendance = _check_attendance(sequelize, DataTypes);
  const student = _student(sequelize, DataTypes);

  check_attendance.belongsTo(attendance, { as: "attendance_a_code_attendance", foreignKey: "attendance_a_code"});
  attendance.hasMany(check_attendance, { as: "check_attendances", foreignKey: "attendance_a_code"});
  check_attendance.belongsTo(student, { as: "student_s_code_student", foreignKey: "student_s_code"});
  student.hasMany(check_attendance, { as: "check_attendances", foreignKey: "student_s_code"});

  return {
    attendance,
    check_attendance,
    student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
