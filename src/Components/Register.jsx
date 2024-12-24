import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.password2) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === formData.email)) {
      setError("Email already registered.");
      return;
    }

    users.push({ name: formData.name, email: formData.email, password: formData.password });
    localStorage.setItem("users", JSON.stringify(users));
    setSuccessMessage("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <h2 className="text-uppercase text-center mb-5">Register</h2>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-4"
            />
            <MDBInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="mb-4"
            />
            <MDBInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="mb-4"
            />
            <MDBInput
              label="Confirm Password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              type="password"
              className="mb-4"
            />
            
            <MDBBtn className="mb-4 w-100" size="lg" type="submit">
              Register
            </MDBBtn>
          </form>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
