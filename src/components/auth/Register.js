import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  registerUserRequested,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Notification from "../../utils/notification";
import alertMessage from "../../utils/alertMessages";

const userInitialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const registrationForm = (user, onSubmit, onChange) => {
  const { name, email, password, password2 } = user;
  return (
    <div className="container d-flex  justify-content-center align-items-center mt-5">
      <div className="shadow p-5 d-flex flex-column justify-content-center align-items-center">
        <div className="fs-3 fw-bold mb-4">Register</div>
        <Form className="fw-bold" onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Name"
              name="name"
              onChange={onChange}
              value={name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={onChange}
              value={email}
              required
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              minLength={8}
              onChange={onChange}
              value={password}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="password2"
              type="password"
              placeholder="Confirm Password"
              minLength={8}
              onChange={onChange}
              value={password2}
              required
            />
          </Form.Group>

          <Button variant="info" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState(userInitialState);
  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password didn't matched");
    } else {
      dispatch(
        registerUserRequested({
          name,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error && Object.keys(error).length !== 0) {
      Notification("error", alertMessage.somethingWentWrong);
      dispatch(clearError());
    }
    return () => {
      setUser(userInitialState);
    };
  }, [isAuthenticated, error]);

  return registrationForm(user, onSubmit, onChange);
};

export default Register;
