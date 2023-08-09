const student = require("../models/students-model");

const controller = {
  async saveStudent(req, res) {
    await student.saveStudent(req, res);
  },

  async saveEnroll(req, res) {
    await student.saveEnroll(req, res);
  },

  async saveEnrollGroup(req, res) {
    await student.saveEnrollGroup(req, res);
  },

  async getStudent(req, res) {
    await student.getStudent(req, res);
  },

  async getStudentEnrroll(req, res) {
    await student.getStudentEnrroll(req, res);
  },

  async getStudentsByPracticeActive(req, res) {
    await student.getStudentsByPracticeActive(req, res);
  },

  async getGroups(req, res) {
    await student.getGroups(req, res);
  },

  async updateStudent(req, res) {
    await student.updateStudent(req, res);
  },

  async updateEnroll(req, res) {
    await student.updateEnroll(req, res);
  },

  async changeStateStudent(req, res) {
    await student.changeStateStudent(req, res);
  },

  async deleteEnroll(req, res) {
    await student.deleteEnroll(req, res);
  },
};

module.exports = controller;