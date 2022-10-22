import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import {
  deleteContactRequested,
  setCurrentContact,
} from "../../redux/slices/contactSlice";

const contactCard = (contact, handleDelete, dispatch, setCurrentContact) => {
  const { email, name, phone, type } = contact;
  return (
    <div className="w-100 pt-2 ">
      <Card className="shadow border-0 ">
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {name && <span className="fw-bold">{name}</span>}
          {type && (
            <span
              className={`badge text-capitalize ${
                type === "Professional" ? "bg-warning text-dark" : "bg-danger "
              }`}
            >
              {type}
            </span>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {email && (
              <div>
                <i className="fas fa-envelope-open text-info me-3" />
                {email}
              </div>
            )}
            {phone && (
              <div>
                <i className="fas fa-phone text-info me-3" />
                {phone}
              </div>
            )}
          </Card.Text>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="dark"
              onClick={() => dispatch(setCurrentContact(contact))}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const ContactCard = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContactRequested(contact.id));
    // clearCurrent();
  };

  return contactCard(contact, handleDelete, dispatch, setCurrentContact);
};

export default ContactCard;
