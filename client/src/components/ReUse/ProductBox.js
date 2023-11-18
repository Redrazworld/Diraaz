import React from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductWrapper = styled.div`
  cursor: pointer;
  padding: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  background: url(${(props) => props.image}) no-repeat center/contain;
  @media (max-width: 992px) {
    padding: 5px;
  }
  background-color: #ffffff63;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  align-items: stretch;
`;

const Box = styled(Link)`
  padding: 20px;
  max-height: 140px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  @media (max-width: 992px) {
    height: auto;
    padding: 10px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  gap: 5px;
`;

const Price = styled.span`
  background-color: #530050;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  @media (max-width: 992px) {
    font-size: 1rem;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 140px;
  height: 100%;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const image = JSON.parse(images);
  const navigate = useNavigate()
  return (
    <ProductWrapper image={image[0]} onClick={()=>navigate(`/products/${_id}`)}>
      <Box>
        <div>
          <ProductImage />
        </div>
      </Box>
      <PriceRow>
        <Price className="left-product w-100">{title}</Price>
        <Price className="right-product w-100">₹{price}</Price>
      </PriceRow>
    </ProductWrapper>
  );
};

export default ProductBox;
