const DataTypes = require("sequelize").DataTypes;
const _attendance = require("./attendance");
const _student = require("./student");

function initModels(sequelize) {
  const attendance = _attendance(sequelize, DataTypes);
  const student = _student(sequelize, DataTypes);

  attendance.belongsTo(student, { as: "student_s_code_student", foreignKey: "student_s_code"});
  student.hasMany(attendance, { as: "attendances", foreignKey: "student_s_code"});

  return {
    attendance,
    student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
