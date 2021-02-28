import React, { useContext } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { UserContext } from "../../firebase/context";

const Account = () => {
  const { authUser } = useContext(UserContext);

  return (
    <Container>
      <Row className='my-5 text-center'>
        <Col lg={12}>
          <h1>Account</h1>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col lg={6}>Welcome, {authUser.email}</Col>
        <Col lg={6}></Col>
      </Row>
    </Container>
  );
};
export default Account;
