import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import ContactFilter from "./ContactFilter";

const ContactList = () => {
  const filteredContacts = useSelector(
    (state) => state.contacts.filteredContacts
  );
  const contacts = useSelector((state) => state.contacts.contacts);
  const renderContactCards = (contacts) =>
    contacts.map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ));
  return (
    <>
      {contacts.length > 0 && <ContactFilter />}
      {filteredContacts.length > 0
        ? renderContactCards(filteredContacts)
        : contacts.length > 0 && renderContactCards(contacts)}
    </>
  );
};

export default ContactList;
