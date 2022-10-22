import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import {
  clearFilteredContacts,
  setfilterContacts,
} from "../../redux/slices/contactSlice";

const ContactFilter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value !== "") {
      dispatch(setfilterContacts(value));
    } else {
      dispatch(clearFilteredContacts());
    }
  }, [value]);

  return (
    <div className="container shadow py-4 mb-3">
      <Form.Group className="">
        <Form.Control
          type="text"
          placeholder="Search Contact"
          name="search"
          onChange={onChange}
          value={value}
          required
        />
      </Form.Group>
    </div>
  );
};

export default ContactFilter;
