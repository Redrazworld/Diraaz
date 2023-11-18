import React, { useContext, useEffect, useState } from "react";
import { Bag, Cart, Edit, Logout, User } from "../Svgs";
import "./Profile.css"; // Create a separate CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "../../ClientContext";
import { toast } from "react-toastify";

function Login() {
  const { isLogged, setIsLogged,setToken } = useContext(ClientContext);
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLogged){
    navigate("/")
    }
  },[])

  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!inputForm.email || !inputForm.password) {
      toast.info("Please enter all fields.");
      return;
    }

    try {
      const response = await fetch(
        "/api/client/do/login",
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
        setIsLogged(true);
        sessionStorage.setItem("token", data.token);
        setToken(data.token)
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
  };

  return (
    <div className="background-image">
      <div className="container h-80-profile d-flex align-items-center justify-content-center text-white">
        <div class="container col-xl-10 col-xxl-8 px-4 py-5">
          <div class="row align-items-center g-lg-5 py-5">
            <div class="col-md-7 text-center text-lg-start">
              <h1 class="display-4 fw-bold lh-1 mb-3">DIRAAZ</h1>
              <p class="col-lg-10 fs-4">
                Below is an example form built entirely with Bootstrap’s form
                controls. Each required form group has a validation state that
                can be triggered by attempting to submit the form without
                completing it.
              </p>
            </div>
            <div class="col-md-5 mx-auto col-lg-5 text-black">
              <form class="p-4 p-md-5 border rounded-3 bg-light">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="floatingInput"
                    onChange={handleInputForm}
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={handleInputForm}
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <button
                  class="w-100 btn btn-lg btn-success mb-2"
                  type="submit"
                  onClick={handleRegistration}
                >
                  Sign In
                </button>
                <Link>Forgot password?</Link>
                <hr class="my-4" />
                <small>
                  New account? <Link to="/register">Register here.</Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
