const express = require("express");
const router = express.Router();

const validate = require("../api/validation.js");
const idValidation = require("../api/idValidation");
const contactController = require("../../controllers/index");

router.get("/", contactController.listContacts);

router.post("/", validate.createContact, contactController.addContact);

router.get("/:contactId", idValidation, contactController.getContactById);

router.delete("/:contactId", idValidation, contactController.removeContact);

router.patch(
  "/:contactId",
  idValidation,
  validate.updateContact,
  contactController.updateContact
);

module.exports = router;
