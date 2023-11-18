import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Cart } from "./Svgs";
import { ClientContext } from "../ClientContext";

const ProductOpen = () => {
  const [product, setProduct] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  const { CartProducts, setCartProducts, isLogged, token } =
    useContext(ClientContext);

  const { id } = useParams();

  useEffect(() => {
    handleFetch();
  }, [id]);

  useEffect(() => {
    // Check if the product is in the cart
    if (CartProducts?.includes(product._id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [CartProducts, product]);

  async function handleFetch() {
    try {
      const response = await axios.get(
        `/api/products/${id}`
      );
      setProduct(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  // Function to handle image selection
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  async function addFeatureProductToCart() {
    try {
      const response = await axios.post(
        "/api/add/to/cart",
        { productId: product._id }, // Send the product ID in the request body
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setCartProducts((prev) => {
          // Ensure prev is an array before using the spread operator
          if (!Array.isArray(prev)) {
            return [product._id];
          }
          return [...prev, product._id];
        });
      }
    } catch (error) {
      // Handle errors here
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  }

  return (
    <div
      class=" background-image overflow-scroll"
      style={{ paddingTop: "100px", height: "100vh" }}
    >
      <div className="container my-5 text-white">
        <div class="row">
          <div class="col-md-5">
            <div class="main-img">
              <div className="d-flex justify-content-center">
                <img
                  class="img-fluid product-open-container"
                  src={
                    product?.images &&
                    JSON.parse(product?.images)[selectedImageIndex]
                  }
                  alt="ProductS"
                />
              </div>

              <div class="row my-3 previews">
                {product.images &&
                  JSON.parse(product.images).map((image, index) => (
                    <div class="col-md-3">
                      <img
                        src={image}
                        alt="Sale"
                        className={`cursor-pointer w-100  product-open-option   object-center rounded mx-1 ${
                          index === selectedImageIndex
                            ? "border border-primary"
                            : ""
                        }`}
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="main-description px-2">
              <strong class="text-bold-600 text-primary">
                Category: {product.category}
              </strong>
              <h2 class="product-title font-weight-bold my-3">
                <strong>{product.title}</strong>
              </h2>
              <div class="price-area my-4">
                {/* <p class="old-price mb-1">
            <del>$100</del>
            <span class="old-price-discount text-danger">(20% off)</span>
          </p> */}
                <h2 class="new-price font-weight-bold mb-1">
                  <strong>₹{product.price}</strong>
                </h2>
                <p class="text-info mb-1">
                  (Additional tax may apply on checkout)
                </p>
              </div>
              {isLogged && (
                <div class="buttons d-flex my-5 gap-2">
                  {!isInCart ? (
                    <div class="block">
                      <button
                        class="shadow btn btn-primary"
                        onClick={addFeatureProductToCart}
                      >
                        Add to cart
                      </button>
                    </div>
                  ) : (
                    <div class="block">
                      <Link to="/account/cart" class="shadow btn btn-success">
                        Go to cart
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div class="product-details my-4">
              <p class="text-color mb-1 text-uppercase">
                <strong>Product Description</strong>
              </p>
              <p class="description">{product.description}</p>
            </div>
            <div class="product-details my-4">
              <p class="details-title text-color mb-2 text-uppercase">
                <strong>Product Details</strong>
              </p>
              <table
                className="product_open_property"
                style={{ backgroundColor: "none" }}
              >
                <tbody>
                  {product.properties &&
                    JSON.parse(product.properties).map((property) => (
                      <tr>
                        <td>{property.name}</td>
                        <td>{property.parent}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOpen;
