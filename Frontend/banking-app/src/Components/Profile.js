import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "./Profile.css";
import NavBar2 from "../common/Navbar2";
import SideMenu from "../Components/Dashboard/SideMenu";
import RegulatoryFooter from "../common/RegulatoryFooter";

const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 10em;
`
const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const[password,setPassword]= useState("");
  const [errors, setErrors] = useState({});
  const validateField = (label, value) => {
    let error = "";
    if (label === "Email Id" && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      error = "Invalid email format";
    } else if (label === "Mobile no" && !/^\d{10}$/.test(value)) {
      error = "Mobile number must be 10 digits";
    } else if (label === "Pan no" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
      error = "Invalid PAN format";
    } else if (label === "Aadhaar no" && !/^\d{12}$/.test(value)) {
      error = "Aadhaar number must be 12 digits";
    }
    setErrors((prev) => ({ ...prev, [label]: error }));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const customerId = token ? atob(token) : undefined;
    if (customerId) {
      setCustomerId(JSON.parse(customerId));
    async function fetchProfile() {
      try {
        await axios.get(`http://localhost:8080/api/simple/banking/profile?customerId=${JSON.parse(customerId)}`).then(res => {
          setName(res.data.firstName + " " + res.data.lastName)
          setEmail(res.data.emailId)
          setPhone(res.data.contact)
          setAddress(res.data.address)
          setAadhaar(res.data.aadharNumber)
          setPan(res.data.panNumber)
          setPassword(res.data.password)
        })
      } catch (err) {
        console.log('Error fetching balance', err);
      }
    }
    fetchProfile();
  }
  }, []);
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }
    const updatedData = {
      accountNumber : customerId,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
      emailId: email,
      contact: phone,
      address,
      panNumber: pan,
      aadharNumber: aadhaar,
      password,
    };
    try {
      console.log(updatedData,'Data');
      const response = await axios.put(
        "http://localhost:8080/api/simple/banking/editProfile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add Content-Type header
          },
        }
      );
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditMode(false);
      } else {
        alert(`Failed to update profile. Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Axios error:", err);
      alert("Failed to update profile. Check console for details.");
    }
   };
  const handleEditToggle = () => {
    if (isEditMode) {
      handleSave();
    } else {
      setIsEditMode(true);
    }
  };
  return (
    <div style={{ "top": "0" }}>
      <div style={{ background: "#fff" }}>
        <NavBar2 />
      </div>
      <ProfileContainer>
        <SideMenu />
        <div className="main-contents">
          <div className="edit-button-container">
            <button className="EditBtn" onClick={handleEditToggle}>
              {isEditMode ? "Save" : "Edit"}
            </button>
          </div>
          <div className="profile-field">
            {[
              { label: "Customer ID", value: customerId, isEditable: false },
              { label: "Name", value: name, isEditable: true, setValue: setName },
              { label: "Email Id", value: email, isEditable: true, setValue: setEmail },
              { label: "Mobile no", value: phone, isEditable: true, setValue: setPhone },
              { label: "Address", value: address, isEditable: true, setValue: setAddress },
              { label: "Pan no", value: pan, isEditable: true, setValue: (value)=>setPan(value.toUpperCase()) },
              { label: "Aadhaar no", value: aadhaar, isEditable: true, setValue: setAadhaar },
            ].map(({ label, value, isEditable, setValue }, index) => (
              <div className="profile-row" key={index}>
                <div className="profile-label">{label}</div>
                <div className="profile-value">
                  {isEditMode && isEditable ? (
                    <div>
                    <input
                                     type="text"
                                     value={value}
                                     onChange={(e) => {
                                       setValue(e.target.value);
                                       validateField(label, e.target.value);
                                     }}
                                     onBlur={() => validateField(label, value)}
                                   />
                                   {errors[label] && <div className="error-message">{errors[label]}</div>}
                    </div>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProfileContainer>
      <RegulatoryFooter />
    </div>
  );
};
export default Profile;