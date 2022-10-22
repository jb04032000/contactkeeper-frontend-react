import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { loadUserRequested } from "../../redux/slices/authSlice";
import { getContactListRequested } from "../../redux/slices/contactSlice";
import ContactForm from "../contacts/ContactForm";
import ContactList from "../contacts/ContactList";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserRequested());
    dispatch(getContactListRequested());
  }, []);
  return (
    <div className="container pt-5 vw-100 " style={{ overflowX: "hidden" }}>
      <Row className="py-2 px-2 gx-5 gy-3 d-flex justify-content-evenly">
        <Col sm={12} lg={4}>
          <ContactForm />
        </Col>
        <Col
          sm={12}
          lg={4}
          className="mb-2 pb-3 pt-5 d-flex flex-column justify-content-center "
          style={{ overflowX: "hidden" }}
        >
          <ContactList />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
