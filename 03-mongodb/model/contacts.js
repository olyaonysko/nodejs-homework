const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\(?\d{3}\)? ?-? ?\d{3} ?-? ?\d{4}$/;
        },
        message: (props) => `${props.value} invalid number`,
      },
    },
    subscription: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findOne({ _id: contactId });
  return data;
};

const addContact = async (body) => {
  const data = await Contact.create(body);
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove({ _id: contactId });
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
