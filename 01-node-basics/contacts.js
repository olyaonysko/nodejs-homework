import * as fs from "fs/promises";
import * as path from "path";
import shortid from "shortid";

import getDirname from "./helpers/dirname.js";
import { handleError } from "./helpers/handleerror.js";

const { __dirname } = getDirname(import.meta.url);

const contactsPath = path.join(__dirname, "./db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data.toString()));
  } catch (error) {
    handleError(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());

    const contact = parseData.find((contact) => contact.id === contactId);
    if (!contact) console.error("Contact not found.");
    console.table(contact);
  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());

    const filteredContacts = parseData.filter(
      (contact) => contact.id !== contactId
    );

    if (filteredContacts.length !== parseData.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log("Contact removed.");
    } else {
      console.log("Contact not found.");
      return;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());

    parseData.push({ id: parseData.length + 1, name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(parseData));
    console.log("Contact added.");
  } catch (error) {
    handleError(error);
  }
}
