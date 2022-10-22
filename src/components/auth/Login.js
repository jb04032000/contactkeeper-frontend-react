import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, loginUserRequested } from "../../redux/slices/authSlice";
import alertMessage from "../../utils/alertMessages";
import Notification from "../../utils/notification";

const userInitialState = {
  email: "",
  password: "",
};

const loginForm = (user, onSubmit, onChange) => {
  const { email, password } = user;
  return (
    <div className="container d-flex  justify-content-center align-items-center mt-5">
      <div className="shadow p-5 d-flex flex-column justify-content-center align-items-center">
        <div className="fs-3 fw-bold mb-4">Login</div>
        <Form className="fw-bold" onSubmit={onSubmit}>
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
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              minLength={8}
              name="password"
              onChange={onChange}
              value={password}
              required
            />
          </Form.Group>

          <Button variant="info" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState(userInitialState);
  const { email, password } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUserRequested({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error && Object.keys(error).length !== 0) {
      Notification("error", alertMessage.somethingWentWrong);
      dispatch(clearError());
    }
  }, [error, isAuthenticated]);

  return loginForm(user, onSubmit, onChange);
};

export default Login;
