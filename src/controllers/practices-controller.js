const practices = require("../models/practices-model");

const controller = {
  async saveAssign(req, res) {
    await practices.saveAssign(req, res);
  },

  async getPractices(req, res) {
    await practices.getPractices(req, res);
  },

  async getPracticesAssign(req, res) {
    await practices.getPracticesAssign(req, res);
  },

  async getListStudentsAvailable(req, res) {
    await practices.getListStudentsAvailable(req, res);
  },

  async updatePractices(req, res) {
    await practices.updatePractices(req, res);
  },

  async deleteAssign(req, res) {
    await practices.deleteAssign(req, res);
  },
};

module.exports = controller;