import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductBox from "./ReUse/ProductBox";
import { ClientContext } from "../ClientContext";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 0px;
`;

function OurProduct() {
  const { products } = useContext(ClientContext);
  return (
    <div
      className="d-flex justify-content-center w-100 background-image"
      style={{ paddingTop: "140px", height: "100vh" }}
    >
      <div className="our-product-container">
        <ProductGrid>
          {products.length > 0 &&
            products.map((product) => (
              <ProductBox key={product.id} {...product} />
            ))}
        </ProductGrid>
      </div>
    </div>
  );
}

export default OurProduct;
