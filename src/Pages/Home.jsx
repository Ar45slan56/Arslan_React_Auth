import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    password: '',
    contact: '', // Add contact field
    status: '' // Add status field
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      setEditedUser(storedUser); // Populate fields with stored user data
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleViewProfile = () => {
    setIsEditing(false);  // Set to view mode (read-only)
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);  // Toggle between edit and view modes
  };

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem("currentUser", JSON.stringify(editedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === editedUser.email ? editedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setIsEditing(false);

    // Trigger a page-wide update by reloading the window
    window.location.reload(); // Ensures all components refresh with updated data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
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
      <div className="mask gradient-custom-3" style={{ height: "100%" }}></div>
      <MDBCard className="m-5" style={{ maxWidth: "700px", width: "100%" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Welcome</h2>

          {/* Show Welcome Screen */}
          {user && !isEditing && (
            <>
              <h4>Welcome, {user.name}!</h4>
              <p>Email: {user.email}</p>
              <p>Contact: {user.contact}</p> {/* Display contact */}
              <p>Status: {user.status}</p> {/* Display status */}
             
              <MDBBtn className="mb-3 w-100" size="lg" onClick={handleLogout}>
                Logout
              </MDBBtn>

              <MDBBtn className="mb-3 w-100" size="lg" onClick={handleViewProfile}>
                View Profile
              </MDBBtn>
            </>
          )}

          {/* Profile View (Read-Only) */}
          {!isEditing && user && (
            <>
              <h5>Profile</h5>
              <MDBInput
                label="Username"
                name="name"
                value={user.name || ""}
                readOnly
                className="mb-3"
              />
              <MDBInput
                label="Email"
                name="email"
                value={user.email || ""}
                readOnly
                className="mb-3"
              />
              <MDBInput
                label="Contact"
                name="contact"
                value={user.contact || ""}
                readOnly
                className="mb-3"
              />
              <MDBInput
                label="Status"
                name="status"
                value={user.status || ""}
                readOnly
                className="mb-3"
              />
              <MDBBtn className="mb-3 w-100" size="lg" onClick={handleEditToggle}>
                Edit Profile
              </MDBBtn>
            </>
          )}

          {/* Profile Edit Mode */}
          {isEditing && (
            <>
              <h5>Edit Profile</h5>
              <MDBInput
                label="Username"
                name="name"
                value={editedUser.name || ""}
                onChange={handleInputChange}
                className="mb-3"
              />
              <MDBInput
                label="Email"
                name="email"
                value={editedUser.email || ""}
                readOnly
                className="mb-3"
              />
              <MDBInput
                label="Password"
                name="password"
                type="password"
                value={editedUser.password || ""}
                onChange={handleInputChange}
                className="mb-3"
              />
              <MDBInput
                label="Contact"
                name="contact"
                value={editedUser.contact || ""}
                onChange={handleInputChange}
                className="mb-3"
              />
              <MDBInput
                label="Status"
                name="status"
                value={editedUser.status || ""}
                onChange={handleInputChange}
                className="mb-3"
              />
              <MDBBtn className="mb-3 w-100" size="lg" onClick={handleSave}>
                Save Changes
              </MDBBtn>
              <MDBBtn className="w-100" size="lg" onClick={handleEditToggle}>
                Cancel
              </MDBBtn>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Home;
