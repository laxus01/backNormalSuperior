const teacher = require("../models/teachers-model");

const controller = {
  async saveTeacher(req, res) {
    await teacher.saveTeacher(req, res);
  },

  async getTeachers(req, res) {
    await teacher.getTeachers(req, res);
  },

  async updateTeacher(req, res) {
    await teacher.updateTeacher(req, res);
  },

  async inactivateTeacher(req, res) {
    await teacher.inactivateTeacher(req, res);
  },
};

module.exports = controller;