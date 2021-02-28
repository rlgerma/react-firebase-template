import React, { useState } from "react";

import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

// react-bootstrap
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Login = () => {
  const [card, setCard] = useState({ comp: <SignUp />, title: "Sign Up" });

  return (
    <Container>
      <Row className='my-5 text-center'>
        <Col lg={12}>
          <h1>{card.title}</h1>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col lg={6}>
          <a
            href='#'
            onClick={() => setCard({ comp: <SignIn />, title: "Login" })}
          >
            Login
          </a>{" "}
          or{" "}
          <a
            href='#'
            onClick={() => setCard({ comp: <SignUp />, title: "Sign Up" })}
          >
            Sign Up
          </a>
        </Col>
        <Col lg={6}>{card.comp}</Col>
      </Row>
    </Container>
  );
};
export default Login;
