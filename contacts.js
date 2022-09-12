const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
  } catch (error) {
    console.log(error.message);
  }
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const result = contacts.filter((contact) => contact.id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(result));
  } catch (error) {
    console.log(error.message);
  }

  return result;
}

async function updateContact(id, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error.message);
  }

  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error.message);
  }
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
