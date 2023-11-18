import React, { useContext, useEffect } from "react";
import { Bag, Cart, Edit, Logout, User } from "../Svgs";
import "./Profile.css"; // Create a separate CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "../../ClientContext";

function Profile() {
  const { isLogged, setIsLogged, userData } = useContext(ClientContext);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!isLogged){
    navigate("/")
    }
  },[])

  function handelLogout(){
    sessionStorage.clear()
    navigate("/")
    setIsLogged(false)
  }

  return (
    <div className="background-image" style={{
      
    }}>
      {userData&&<div className="container h-80-profile d-flex align-items-center justify-content-center">
        <div className="card profile-card " style={{ background: "#ffffff78" }}>
          <div className="row">
            <div className="col-md-4 bg-success">
              <div className="profile-image">
                {userData.image?<img
                  src={userData.image}
                  alt="Profile Image"
                  className="img-fluid rounded-circle"
                  width="200"
                  height="200"
                />:
                <svg
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-gray-500 w-12 h-12 mb-3 inline-block img-fluid rounded-circle"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>}
                <h3 className="card-title text-white">{userData.name}</h3>
                <Link to="/account/edit" className="border-none bg-transparent">
                <Edit height="50" width="50" stroke="white" />
                </Link>
              </div>
            </div>
            <div className="col-md-8 ">
              <div className="profile-details">
                <h3>Information</h3>
                {(userData.email|| userData.phone) &&<div className="row">
                  <div className="col-md-6">
                    <table>
                      <thead>
                        <tr>
                          <td className="bordered-bottom">Email:</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userData.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {<div className="col-md-6">
                    <table>
                      <thead>
                        <tr>
                          <td className="bordered-bottom">Phone</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userData.phone?userData.phone:"Add phone no"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>}
                </div>}
                {<div className="row bordered-bottom">
                  <div className="col-md-6">
                    <table>
                      <thead>
                        <tr>
                          <td className="bordered-bottom">Address</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userData.address? userData.address:"add address"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <table>
                      <thead>
                        <tr>
                          <td className="bordered-bottom">City</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userData.city? userData.city:"add city"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>}
                <div className="d-flex justify-content-center gap-4">
                  <Link to="/account/orders">
                    {" "}
                    <Bag height="50" width="50" stroke="green" fill="none" />
                  </Link>
                  <Link to="/account/cart">
                    {" "}
                    <Cart height="50" width="50" stroke="green" fill="none" />
                  </Link>
                  <div className="pointer-cursor" onClick={handelLogout}>
                    {" "}
                    <Logout height="50" width="50" stroke="green" fill="none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Profile;
