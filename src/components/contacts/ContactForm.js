import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addContactRequested,
  clearCurrentContact,
  getContactListRequested,
  updateContactRequested,
} from "../../redux/slices/contactSlice";

const initialFormValue = {
  name: "",
  email: "",
  phone: "",
  type: "Personal",
};

const contactForm = (
  onSubmit,
  contact,
  onChange,
  currentContact,
  handleClearCurrentContact
) => {
  const { name, email, phone, type } = contact;
  return (
    <div className="d-flex flex-column justify-content-center shadow py-4 px-4 ">
      <div className="fs-3 fw-bold mb-4 h2 m-auto">
        {currentContact ? "Update Contact" : "Add Contact"}
      </div>
      <Form className="fw-bold" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={onChange}
            value={name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone number"
            name="phone"
            onChange={onChange}
            value={phone}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact type</Form.Label>
          <br />
          <Form.Check
            inline
            label="Personal"
            name="type"
            type="radio"
            id="Personal"
            value="Personal"
            checked={type === "Personal"}
            onChange={onChange}
          />
          <Form.Check
            inline
            label="Professional"
            name="type"
            type="radio"
            id="Professional"
            value="Professional"
            checked={type === "Professional"}
            onChange={onChange}
          />
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="info" type="submit">
            {currentContact ? "Update Contact" : "Add Contact"}
          </Button>

          {currentContact && (
            <div className="control">
              <Button variant="warning" onClick={handleClearCurrentContact}>
                Cancel update
              </Button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const contactUpdated = useSelector((state) => state.contacts.contactUpdated);
  const [contact, setContact] = useState(initialFormValue);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleClearCurrentContact = () => {
    dispatch(clearCurrentContact());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentContact !== null) {
      dispatch(updateContactRequested(contact));
      dispatch(clearCurrentContact());
    } else {
      dispatch(addContactRequested(contact));
      setContact(initialFormValue);
    }
  };

  useEffect(() => {
    if (contactUpdated) {
      dispatch(getContactListRequested());
    }
    if (currentContact === null) {
      setContact(initialFormValue);
    } else {
      setContact(currentContact);
    }
  }, [currentContact, contactUpdated]);

  return contactForm(
    onSubmit,
    contact,
    onChange,
    currentContact,
    handleClearCurrentContact
  );
};

export default ContactForm;
