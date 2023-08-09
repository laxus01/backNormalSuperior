const campus = require("../models/campus-model");

const controller = {
  async saveCampus(req, res) {
    await campus.saveCampus(req, res);
  },

  async saveSupervisor(req, res) {
    await campus.saveSupervisor(req, res);
  },

  async saveDegree(req, res) {
    await campus.saveDegree(req, res);
  },

  async saveGroup(req, res) {
    await campus.saveGroup(req, res);
  },

  async getCampus(req, res) {
    await campus.getCampus(req, res);
  },

  async getSupervisors(req, res) {
    await campus.getSupervisors(req, res);
  },

  async getDegrees(req, res) {
    await campus.getDegrees(req, res);
  },

  async getGroups(req, res) {
    await campus.getGroups(req, res);
  },

  async listCampusByInstitution(req, res) {
    await campus.listCampusByInstitution(req, res);
  },

  async updateCampus(req, res) {
    await campus.updateCampus(req, res);
  },

  async updateGroup(req, res) {
    await campus.updateGroup(req, res);
  },

  async inactivateGroup(req, res) {
    await campus.inactivateGroup(req, res);
  },

  async inactivateCampus(req, res) {
    await campus.inactivateCampus(req, res);
  },
};

module.exports = controller;