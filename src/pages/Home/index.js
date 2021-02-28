import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Home = () => (
  <Container>
    <Row className='my-5 text-center'>
      <Col lg={12}>
        <h1>Home</h1>
      </Col>
    </Row>
    <Row className='text-center'>
      <Col lg={12}>Welcome!</Col>
    </Row>
  </Container>
);

export default Home;
