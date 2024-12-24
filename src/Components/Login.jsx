import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MDBCard className="m-5" style={{ maxWidth: "600px", width: "100%" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Log In</h2>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <form onSubmit={handleLogin}>
            <MDBInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mb-4"
            />
            <MDBInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mb-4"
            />
            <MDBBtn className="mb-4 w-100" size="lg" type="submit">
              Login
            </MDBBtn>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
