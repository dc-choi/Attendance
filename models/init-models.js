const DataTypes = require("sequelize").DataTypes;
const _attendance = require("./attendance");
const _group = require("./group");
const _student = require("./student");

function initModels(sequelize) {
  const attendance = _attendance(sequelize, DataTypes);
  const group = _group(sequelize, DataTypes);
  const student = _student(sequelize, DataTypes);

  student.belongsTo(group, { as: "gruop_g_code_group", foreignKey: "gruop_g_code"});
  group.hasMany(student, { as: "students", foreignKey: "gruop_g_code"});
  attendance.belongsTo(student, { as: "student_s_code_student", foreignKey: "student_s_code"});
  student.hasMany(attendance, { as: "attendances", foreignKey: "student_s_code"});

  return {
    attendance,
    group,
    student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
