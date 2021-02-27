const express = require("express");
const router = express.Router();

const validate = require("../api/validation.js");
const contactsModel = require("../../model/index.js");

const handleResponse = (res, data, error) => {
  const code = (error && error.code) || (!data && 404) || (data && 200);
  const status = data ? "success" : "invalid";
  return res.status(code).json({ status, code, data: data || error });
};

router.get("/", async (_req, res) => {
  const { data, error } = await contactsModel.listContacts();
  handleResponse(res, data, error);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { data, error } = await contactsModel.getContactById(contactId);
  handleResponse(res, data, error);
});

router.post("/", validate.createContact, async (req, res) => {
  const { data, error } = await contactsModel.addContact(req.body);
  handleResponse(res, data, error);
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { data, error } = await contactsModel.removeContact(contactId);
  handleResponse(res, data, error);
});

router.patch("/:contactId", validate.updateContact, async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const { data, error } = await contactsModel.updateContact(contactId, body);
  handleResponse(res, data, error);
});

module.exports = router;
