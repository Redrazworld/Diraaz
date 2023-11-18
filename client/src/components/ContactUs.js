import React, { useState } from "react";
import "./CSS/ContactUs.css";
import { ArrowRight } from "./Svgs";

const ContactUs = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setIsSuccess(true);
        setIsError(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        });
      } else {
        setIsSuccess(false);
        setIsError(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSuccess(false);
      setIsError(true);
    }
  };

  return (
    <div
      className="bg-white overflow-scroll"
      style={{ height: "100vh", paddingTop: "100px" }}
    >
      <div className="row contact">
        <div className="col-md-6 p-5">
          <h5>We are happy to reached</h5>
          <h5 className="contact-request">Requests</h5>
          <form>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="w-100 contact-input"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              className="w-100 contact-input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className="w-100 contact-input"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              className="w-100 contact-input"
              value={formData.country}
              onChange={handleInputChange}
            />
            <textarea
              type="text"
              placeholder="Message"
              name="message"
              className="w-100 contact-input"
              value={formData.message}
              onChange={handleInputChange}
            />
            <button className="contact-button" onClick={handleFormSubmit}>
              <ArrowRight height="25" /> SUBMIT REQUEST
            </button>
            <p
              className={`text-success ${isSuccess ? "visible" : "invisible"}`}
            >
              Email sent successfully.
            </p>
            <p className={`text-danger ${isError ? "visible" : "invisible"}`}>
              Failed to send the email.
            </p>
          </form>
        </div>
        <div className="col-md-6 p-5" style={{ backgroundColor: "#530050" }}>
          <div className="text-white contact-detail">
            <br />
            <br />
            <h5>
              <strong>Retailers,</strong>
            </h5>
            <h5>
              <strong>Wholesalers & Distributors of</strong>
            </h5>
            <h5>Premium HandPicked CTC & Leaf Teas.</h5>
            <p>
              Bharwara Crossing, near Loyala Public School, Vigyan Khand-1,
              <br />
              Gomti Nagar, Lucknow, 226018.
            </p>
            <br />
            <br />
            <br />
            <p className="text-small">
              +91-8081085077 | connect@diraaz.com | diraaz.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
