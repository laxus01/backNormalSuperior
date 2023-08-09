const institution = require("../models/institutions-model");

const controller = {
  async saveInstitution(req, res) {
    await institution.saveInstitution(req, res);
  },

  async getInstitutions(req, res) {
    await institution.getInstitutions(req, res);
  },

  async updateInstitution(req, res) {
    await institution.updateInstitution(req, res);
  },

  async inactivateInstitution(req, res) {
    await institution.inactivateInstitution(req, res);
  },
};

module.exports = controller;