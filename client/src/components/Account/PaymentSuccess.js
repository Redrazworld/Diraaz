import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function PaymentSuccess() {

    const searchQuery = useSearchParams()[0]

    const referenceNum = searchQuery.get("reference")

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col md={12} className="mx-auto text-center bg-light p-4 rounded">
          <h1 className="text-success">Order Success!</h1>
          <p className="lead">Thank you for your purchase.</p>
          <p>Your reference number: <strong>{referenceNum}</strong></p>
          <p className="mt-4">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2rem' }}></i>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentSuccess;
