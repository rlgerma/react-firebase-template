import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../firebase/context";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// firebase
import { auth } from "../../firebase";
import { generateUserDocument } from "../../firebase/context";

// exported component
const SignIn = () => {
  const { authUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        generateUserDocument(res.user);
      })
      .catch((error) => {
        console.error("Error signing in ", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return authUser ? (
    <Redirect to='/account' />
  ) : (
    <Card style={{ border: "none" }}>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(event) => handleChange(event)}
              name='email'
              value={email}
              autoComplete='current-email'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name='password'
              value={password}
              onChange={(event) => handleChange(event)}
              type='password'
              placeholder='Password'
              autoComplete='current-password'
            />
          </Form.Group>
          <Button
            type='submit'
            style={{ width: "100%" }}
            onClick={(event) => {
              handleSignIn(event, email, password);
            }}
          >
            Sign In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
