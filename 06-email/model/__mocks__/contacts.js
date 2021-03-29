const { contacts } = require("./data");

const listContacts = jest.fn(
  (userId) => {
    return contacts;
  },
);

const getContactById = jest.fn((contactId, userId) => {
  const [contact] = contacts.filter(el => String(el._id) === String(contactId));
  return contact;
});

const addContact = jest.fn(body => {
  const newContact = { ...body, _id: '604780b0a33f593b5866d70d' };
  contacts.push(newContact);
  return newContact;
});

const updateContact = jest.fn((contactId, body, userId) => {
  let [contact] = contacts.filter(el => String(el._id) === String(contactId));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

const removeContact = jest.fn((contactId, userId) => {
  const index = contacts.findIndex(el => String(el._id) === String(contactId));
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
