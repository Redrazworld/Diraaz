import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "../../ClientContext";
import { Button } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { toast } from "react-toastify";

function ProfileEdit() {
  const { isLogged, setIsLogged, token, userData, setUserData } =
    useContext(ClientContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    image: userData?.image || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    city: userData?.city || "",
  });

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setIsLoading(true);
    handleFormSubmit(selectedFile);
  };

  const handleFormSubmit = async (file) => {
    if (file) {
      const storageRef = ref(storage, `profile-images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prevData) => ({ ...prevData, image: downloadURL }));
      setIsLoading(false);
    }
  };

  const handelInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (!formData.name) {
      toast.info("Name cant be empty.");
      return;
    }
    try {
      const response = await fetch("/api/update/user", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData({
          ...userData,
          image: formData.image,
          name: formData.name,
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
        });
        toast.success(updatedUserData.message);
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div
      className="background-image overflow-scroll text-white"
      style={{ height: "100vh", paddingTop: "100px" }}
    >
      <div className="container">
        <h1>Edit Profile</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              {formData.image && (
                <div className="profile-image">
                  <img
                    src={formData.image}
                    alt="Profile Image"
                    className="img-fluid rounded-circle"
                    width="200"
                    height="200"
                  />
                </div>
              )}
              <input
                type="file"
                className="form-control my-2"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-md-6">
              <div>
                <label>Email</label>
                <input
                  disabled
                  placeholder="E-mail"
                  className="form-control"
                  name="email"
                  onChange={handelInput}
                  value={formData.email}
                />
              </div>
              <div>
                <label>Name</label>
                <input
                  placeholder="Full-name"
                  className="form-control"
                  name="name"
                  onChange={handelInput}
                  value={formData.name}
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  placeholder="+91 99******56"
                  className="form-control"
                  name="phone"
                  onChange={handelInput}
                  value={formData.phone}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  placeholder="City"
                  className="form-control"
                  name="city"
                  onChange={handelInput}
                  value={formData.city}
                />
              </div>
              <div>
                <label>Address</label>
                <textarea
                  placeholder="Address"
                  className="form-control"
                  name="address"
                  onChange={handelInput}
                  value={formData.address}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Please wait" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
