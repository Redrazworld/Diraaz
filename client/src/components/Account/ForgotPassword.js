import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClientContext } from "../../ClientContext";
import { Button } from "react-bootstrap";

function ForgotPassword() {
  const { isLogged, setIsLogged } = useContext(ClientContext);
  const navigate = useNavigate();
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [EnteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [NewPasswordReEntered, setNewPasswordReEntered] = useState("");
  const [Attempts, setAttempts] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    upperCase: false,
    specialCharacter: false,
  });

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  console.log(window.reload);

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, []);

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

  const handelGenerateOtp = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/verify/user/email/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setIsGenerated(true);
        setGeneratedOtp(data.otp);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("server error");
    }finally{
      setIsLoading(false);
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (Number(EnteredOtp.join("").trim()) === generatedOtp) {
      setIsValid(true);
    }else {
      setAttempts(Attempts+1)
      if (Attempts >= 2) {
        toast.error("Maximum attempts reached. Reloading the window.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }else{
      toast.info("Wrong OTP");
      }
    }
  }

  const handleUpdatePassword = async (e) =>{
    e.preventDefault()
    if(NewPasswordReEntered===NewPassword){
      setIsLoading(true)
      try {
        const formdata={email,password:NewPassword,generatedOtp:Number(EnteredOtp.join("").trim())}
        const response = await fetch("/api/to/update/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });
        const data = await response.json();
        if (response.status === 200) {
          toast.success(data.message);
          navigate("/login")
        } else {
          toast.info(data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("server error");
      }finally{
        setIsLoading(false);
      }
    }else{
      toast.error("Password did not match.")
    }
  }

  return (
    <div
      className="d-flex justify-content-center w-100 background-image"
      style={{ paddingTop: "140px", height: "100vh" }}
    >
      <div className="container height-100 d-flex justify-content-center align-items-center">
        {!isValid ? (
          <div className="position-relative col-md-4">
            <form className="card p-4 text-center">
              <h2>Forgot password</h2>
              <div className="inputs d-flex flex-row justify-content-center">
                <input
                  className="form-control m-2"
                  placeholder="Email"
                  value={email}
                  disabled={isGenerated ? true : false}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {isGenerated && (
                <div
                  id="otp"
                  className="inputs d-flex flex-row justify-content-center "
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
              )}
              <div className="mt-4 ">
                {!isGenerated ? (
                  <button
                    type="submit"
                    className="btn btn-danger px-4 text-uppercase"
                    disabled={isGenerated||isLoading}
                    onClick={handelGenerateOtp}
                  >
                  {isLoading?"Please wait..":"Generete otp"}
                    
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-danger px-4 text-uppercase"
                    disabled={!isGenerated||isLoading}
                    onClick={handleVerify}
                  >
                  {isLoading?"Please wait..":"Validate"}
                  </button>
                )}
              </div>
            </form>
            {isGenerated&&<div className="position-relative ">
              <div className="content d-flex justify-content-center align-items-center">
                <span className="text-white">
                  Number of attmepts <span className="text-danger">{Attempts}/3</span>
                </span>
              </div>
            </div>}
          </div>
        ) : (
          <div className="position-relative col-md-4">
            <div className="card p-4 text-center">
              <form>
                <div>
                  <h2>Forgot password</h2>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        passwordValidation.minLength &&
                        passwordValidation.upperCase &&
                        passwordValidation.specialCharacter
                          ? "is-valid"
                          : passwordValidation.minLength ||
                            passwordValidation.upperCase ||
                            passwordValidation.specialCharacter
                          ? "is-invalid"
                          : ""
                      }`}
                      id="floatingPassword"
                      placeholder="Password"
                      required
                      value={NewPassword}
                      onChange={(e) => {setNewPassword(e.target.value)
                        validatePassword(e.target.value)
                      }}
                    />
                    <label htmlFor="floatingPassword">New password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                      value={NewPasswordReEntered}
                      onChange={(e) => setNewPasswordReEntered(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Re-enter password</label>
                  </div>
                  <ul className="">
                  <li
                    className={`login-password-msg ${
                      !passwordValidation.minLength
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    Password must be at least 8 characters.
                  </li>

                  <li
                    className={`login-password-msg ${
                      !passwordValidation.upperCase
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    Password must contain an uppercase letter.
                  </li>

                  <li
                    className={`login-password-msg ${
                      !passwordValidation.specialCharacter
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    Password must contain a special character.
                  </li>
                </ul>
                </div>
                <Button className="text-uppcase" type="submit" onClick={handleUpdatePassword} disabled={isLoading}>{isLoading?"Please wait..":"Change Password"}</Button>
              </form>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
