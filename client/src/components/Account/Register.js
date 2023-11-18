import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "../../ClientContext";
import { toast } from "react-toastify";

function Register() {
  const { isLogged, setIsLogged } = useContext(ClientContext);
  const navigate = useNavigate();
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [EnteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(()=>{
    if(isLogged){
    navigate("/")
    }
  },[])

  function handleInput(e, index) {
    const { value } = e.target;
    const updatedEnteredOtp = [...EnteredOtp];
    updatedEnteredOtp[index] = value;
    setEnteredOtp(updatedEnteredOtp);
    // Automatically focus on the next input field if a digit is entered
    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  }

  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (EnteredOtp.join("") === generatedOtp) {
      try {
        const response = await fetch("/api/create/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputForm),
        });
        const data = await response.json();
        if (response.status === 201) {
          setIsLogged(true);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.details));
          toast.success(data.message);
          navigate("/");
        } else {
          toast.info(data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("server error");
      }
    } else {
      toast.info("Wrong OTP");
    }
  };

  const handleResend = async () => {
    if (resendAttempts < 3) {
      try {
        const response = await fetch(
          "/api/verify/user/email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputForm),
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          toast.success(data.message);
          setIsGenerated(true);
          setGeneratedOtp(data.otp);
          setResendAttempts(resendAttempts + 1);
        } else {
          toast.info(data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("server error");
      }
    } else {
      toast.info("You have reached the maximum number of resend attempts.");
    }
  };
  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/verify/user/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputForm),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setIsGenerated(true);
        setGeneratedOtp(data.otp);
      } else {
        setIsLoading(false);
        toast.info(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("server error");
    }
  };

  return (
    <div className="background-image">
      <div className="container h-80-profile d-flex align-items-center justify-content-center text-white">
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
          {!isGenerated ? (
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-md-7 text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 mb-3">DIRAAZ</h1>
                <p className="col-lg-10 fs-4">
                  Below is an example form built entirely with Bootstrap's form
                  controls. Each required form group has a validation state that
                  can be triggered by attempting to submit the form without
                  completing it.
                </p>
              </div>
              <div className="col-md-5 mx-auto col-lg-5 text-black">
                <form className="p-4 p-md-5 border rounded-3 bg-light">
                  <div className="form-floating mb-3">
                    <input
                      type="name"
                      name="name"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name"
                      value={inputForm.name}
                      onChange={handleInputForm}
                    />
                    <label htmlFor="floatingInput">Full name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={inputForm.email}
                      onChange={handleInputForm}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={inputForm.password}
                      onChange={handleInputForm}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <button
                    className="w-100 btn btn-lg btn-success mb-2"
                    type="submit"
                    onClick={handleEmailCheck}
                    disabled={isLoading}
                  >
                    {isLoading ? "Please wait" : " Sign up"}
                  </button>
                  <hr className="my-3" />
                  <small className="text-muted">
                    By clicking Sign up, you agree to the terms of use.
                  </small>
                  <br />
                  <small>
                    Already registered? <Link to="/login">Click here.</Link>
                  </small>
                </form>
              </div>
            </div>
          ) : (
            <div className="container height-100 d-flex justify-content-center align-items-center">
              <div className="position-relative col-md-6">
                <div className="card p-4 text-center">
                  <h6 className="text-danger">
                    Please enter the one-time password
                    <br /> to verify your account
                  </h6>
                  <div>
                    <span>A code has been sent to</span>
                    <small>*******9897</small>
                  </div>
                  <div
                    id="otp"
                    className="inputs d-flex flex-row justify-content-center mt-2"
                  >
                    {EnteredOtp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`otp-${index}`}
                        value={digit}
                        className="m-2 text-center form-control rounded"
                        maxLength="1"
                        onChange={(e) => handleInput(e, index)}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <button
                      className="btn btn-danger px-4"
                      onClick={handleRegistration}
                    >
                      Validate
                    </button>
                  </div>
                </div>
                <div className=" ">
                  <div className="content d-flex justify-content-center align-items-center">
                    <span>Didn't get the code</span>
                    <button
                      className="btn btn-link text-decoration-none ms-3"
                      onClick={handleResend}
                    >
                      Resend ({resendAttempts}/3)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
