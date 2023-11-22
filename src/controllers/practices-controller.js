const practices = require("../models/practices-model");

const controller = {
  async saveAssign(req, res) {
    await practices.saveAssign(req, res);
  },

  async savePractice(req, res) {
    await practices.savePractice(req, res);
  },

  async saveRecord(req, res) {
    await practices.saveRecord(req, res);
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

  async getJudgments(req, res) {
    await practices.getJudgments(req, res);
  },

  async getTypePractice(req, res) {
    await practices.getTypePractice(req, res);
  },

  async getConsolidateRecords(req, res) {
    await practices.getConsolidateRecords(req, res);
  },

  async getConsolidateRecordsByGroup(req, res) {
    await practices.getConsolidateRecordsByGroup(req, res);
  },

  async getPracticesByGroup(req, res) {
    await practices.getPracticesByGroup(req, res);
  },

  async getPracticesByInstitution(req, res) {
    await practices.getPracticesByInstitution(req, res);
  },

  async getPracticesBySupervisor(req, res) {
    await practices.getPracticesBySupervisor(req, res);
  },

  async inactivatePractice(req, res) {
    await practices.inactivatePractice(req, res);
  },

  async deleteAssign(req, res) {
    await practices.deleteAssign(req, res);
  },
};

module.exports = controller;