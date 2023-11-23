import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PaymentFailed() {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col md={8} className="mx-auto text-center bg-light p-4 rounded">
          <h1 className="text-danger">Order Failed</h1>
          <p className="lead">Oops! Something went wrong with your purchase.</p>
          <p>Please try again or contact customer support.</p>
          <p className="mt-4">
            <i className="bi bi-exclamation-circle-fill text-danger" style={{ fontSize: '2rem' }}></i>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentFailed;
