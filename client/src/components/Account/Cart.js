import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Minus, Plus } from "../Svgs";
import { ClientContext } from "../../ClientContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  const { CartProducts, setCartProducts, token, setOrders } =
    useContext(ClientContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // order information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [APhone, setAPhone] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchDetails();
    }
  }, [CartProducts]);

  const fetchDetails = () => {
    setError(null); // Clear any previous errors
    if (CartProducts && CartProducts?.length > 0) {
      axios
        .post(
          "/api/cart",
          { ids: CartProducts },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error); // Set the error state
        });
    } else {
      setLoading(false);
    }
  };
  async function lessOfTheProduct(id) {
    try {
      const response = await axios.post(
        "/api/remove/from/cart",
        { productId: id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => {
          const pos = prev.indexOf(id);
          if (pos !== -1) {
            return prev.filter((value, index) => index !== pos);
          }
          return prev;
        });
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }
  async function moreOfTheProduct(id) {
    try {
      const response = await axios.post(
        "/api/add/to/cart",
        { productId: id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => [...prev, id]);
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }
  let total = 0;
  for (const productId of CartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  const makeOrder = async () => {
    // console.log(paid,paidStatus)
    // return
    if (name && email && city && postalCode && street && country && phone) {
      try {
        const response = await axios.post(
          "/api/make/order",
          {
            name,
            email,
            city,
            postalCode,
            street,
            country,
            CartProducts,
            phone,
            APhone,
            total,
          },
          {
            headers: {
              Authorization: "Bearer " + token, // Set the Authorization header
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          toast.success(response.data.message);
          setOrders((prev) => [...prev, response.data.order._id]);
          setCartProducts([]);
          navigate("/account/orders");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  const removeAllItems = async (id) => {
    const response = await axios.post(
      "/api/remove/all/from/cart",
      { productId: id },
      {
        headers: {
          Authorization: "Bearer " + token, // Set the Authorization header
        },
      }
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      // setCartProducts(CartProducts.filter((Products) => Products !== id));
      setCartProducts(CartProducts.filter((product) => product !== id));
      fetchDetails();
    }
  };

  //check if the product is deleted
  const isPaymentDisabled = products.some((item) => item.isDeleted);
  return (
    <div
      className="d-flex justify-content-center w-100 background-image overflow-scroll"
      style={{ paddingTop: "100px", height: "100vh" }}
    >
      <div className="cart">
        {CartProducts && CartProducts?.length > 0 ? (
          <div className="row">
            <div className="col-md-7 w-full ">
              <div className="card rounded-3 p-4">
                <table className="table ">
                  <thead>
                    <tr>
                      <th className="text-muted">Image</th>
                      <th className="text-muted">Quantity</th>
                      <th className="text-muted">Action</th>
                      <th className="text-muted">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product) => (
                        <tr>
                          <td>
                            <img
                              width="120px"
                              src={JSON.parse(product.images)[0]}
                              alt="image"
                            />
                            <p>{product.title}</p>
                          </td>
                          <td>
                            <div className="quantity">
                              <button
                                className="btn btn-white"
                                onClick={() => lessOfTheProduct(product._id)}
                              >
                                <Minus height="20" width="20" />
                              </button>
                              <input
                                type="number"
                                className="form-control"
                                value={
                                  CartProducts?.filter(
                                    (id) => id === product._id
                                  ).length
                                }
                              />
                              <button
                                className="btn btn-white"
                                onClick={() => moreOfTheProduct(product._id)}
                              >
                                <Plus height="20" width="20" />
                              </button>
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeAllItems(product._id)}
                            >
                              Remove
                            </button>
                          </td>
                          <td>
                            ₹
                            {CartProducts?.filter((id) => id === product._id)
                              .length * product.price}
                          </td>
                        </tr>
                      ))}

                    <tr>
                      <td></td>
                      <td></td>
                      <td className="text-right">Total: </td>
                      <td>₹{total}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-success my-1">
                  Continue to Payment
                </button>
              </div>
            </div>
            <div className="col-md-5 w-full">
              <div className="card p-4">
                <h4>Order Information</h4>
                <form>
                  <input
                    className="form-control my-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="row m-1 gap-1 justify-content-between">
                    <input
                      className="address-input form-control"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      className="address-input form-control"
                      placeholder="Alternate Phone"
                      value={APhone}
                      onChange={(e) => setAPhone(e.target.value)}
                    />
                  </div>
                  <div className="row m-1 gap-1 justify-content-between">
                    <input
                      className="address-input form-control"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      className="address-input form-control"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <input
                    className="form-control my-2"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street Address"
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success w-100 my-1"
                    onClick={makeOrder}
                  >
                    Cash on Delivery
                  </button>
                  <button className="btn btn-success w-100 my-1">
                    Pay Online
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="card p-5">
              <h1>Your cart is empty</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
