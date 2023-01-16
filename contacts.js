const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const filePath = path.join(__dirname, "db", "contacts.json");

// Showing all contacts
const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

// Find a contact by Id from list
const getContactById = async (id) => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  const result = contacts.find((item) => item.id === String(id));
  if (!result) {
    return null;
  }
  return result;
};
// Add a new contact to list
async function add({ name, email, phone }) {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}
// Remove a contact from contact's list
const removeContact = async (id) => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  const newListContacts = contacts.filter((item) => item.id !== String(id));
  await fs.writeFile(filePath, JSON.stringify(newListContacts));
  return newListContacts;
};

module.exports = {
  filePath,
  listContacts,
  getContactById,
  add,
  removeContact,
};
