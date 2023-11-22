import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Blog, Cart, ContactUs, ForgotPassword, Login, Main, Navbarcomponent, OpenOrder, Opportunities, Order, OurProduct, OurStory, PageNotFound, PaymentFailed, PaymentSuccess, ProductOpen, Profile, ProfileEdit, Register,
} from "./components";
import { ClientContext } from "./ClientContext";
import axios from "axios";

function App() {
  
  const [isLogged,setIsLogged] = useState(sessionStorage.getItem("token")?true:false)
  const [userData, setUserData] = useState()
  const [CartProducts, setCartProducts] = useState([])
  const [Orders,setOrders] = useState([])
  const [token,setToken] = useState(sessionStorage.getItem("token"))
  const [products, setProducts] = useState([]);
  const [RazorPayKey,setRazorPayKey] = useState("")

  useEffect(() => {
    fetchProducts();
    if(isLogged&&token){
      usersData(token);
    }
  }, [isLogged,token]);

  const usersData = async (token) => {
    try {
      const response = await axios.get("/api/user/data",        {
        headers: {
          Authorization: "Bearer " + token, // Set the Authorization header
        },
      })
      if (response.status === 200) {
        setUserData(response.data.user)
        setOrders(JSON.parse(response?.data?.user?.orders ? response?.data?.user?.orders : []));
        setCartProducts(JSON.parse(response.data.user?.carts ? response.data.user?.carts : []));
        setRazorPayKey(response.data.key)
      }
    } catch (error) {
      toast.error(error.response)
      
    }
  }

  const fetchProducts = () => {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
  }


  return (
    <ClientContext.Provider value={{isLogged,setIsLogged,CartProducts,setCartProducts,OrdersIds:Orders,setOrders,token,setToken,products,userData,setUserData,RazorPayKey}}>
      <BrowserRouter>
        <Navbarcomponent />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/frogot/password" element={<ForgotPassword />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/our-story" element={<OurStory />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/opportunities" element={<Opportunities />} />
          <Route exact path="/products" element={<OurProduct />} />
          <Route exact path="/products/:id" element={<ProductOpen />} />

          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/account/edit" element={<ProfileEdit />} />
          <Route exact path="/account/orders" element={<Order />} />
          <Route exact path="/account/orders/:id" element={<OpenOrder />} />
          <Route exact path="/account/cart" element={<Cart />} />
          <Route exact path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route exact path="/paymentfailed" element={<PaymentFailed />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark"/>
    </ClientContext.Provider>
  );
}

export default App;
