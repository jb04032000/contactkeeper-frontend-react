import { createSlice } from "@reduxjs/toolkit";

const name = "contacts";
const initialState = {
  message: "",
  error: "",
  loading: false,
  contactUpdated: false,
  contacts: [],
  filteredContacts: [],
  currentContact: null,
};

const getContactsOperations = {
  getContactListRequested: (state) => {
    state.loading = true;
    state.contactUpdated = false;
  },
  getContactListFail: (state) => {
    state.loading = false;
  },
  getContactListSuccess: (state, action) => {
    state.loading = false;
    state.contacts = action.payload;
  },

  addContactRequested: (state) => {
    state.loading = true;
  },
  addContactFail: (state) => {
    state.loading = false;
  },
  addContactSuccess: (state, action) => {
    state.loading = false;
    state.contacts = [...state.contacts, action.payload];
  },

  updateContactRequested: (state) => {
    state.loading = true;
  },
  updateContactFail: (state) => {
    state.loading = false;
  },
  updateContactSuccess: (state) => {
    state.loading = false;
    state.contactUpdated = true;
  },

  deleteContactRequested: (state) => {
    state.loading = true;
  },
  deleteContactFail: (state) => {
    state.loading = false;
  },
  deleteContactSuccess: (state, action) => {
    state.loading = false;
    state.contacts = state.contacts.filter(
      (contact) => contact.id !== action.payload
    );
  },

  setCurrentContact: (state, action) => {
    state.currentContact = action.payload;
  },
  clearCurrentContact: (state) => {
    state.currentContact = null;
  },

  setfilterContacts: (state, action) => {
    state.filteredContacts = state.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        contact.email.toLowerCase().includes(action.payload.toLowerCase())
    );
  },
  clearFilteredContacts: (state) => {
    state.filteredContacts = [];
  },
};

export const contactSlice = createSlice({
  name,
  initialState,
  reducers: {
    ...getContactsOperations,
  },
});

export const {
  getContactListRequested,
  getContactListFail,
  getContactListSuccess,
  addContactRequested,
  addContactFail,
  addContactSuccess,
  updateContactRequested,
  updateContactFail,
  updateContactSuccess,
  deleteContactRequested,
  deleteContactFail,
  deleteContactSuccess,
  setCurrentContact,
  clearCurrentContact,
  setfilterContacts,
  clearFilteredContacts,
} = contactSlice.actions;

export default contactSlice.reducer;
