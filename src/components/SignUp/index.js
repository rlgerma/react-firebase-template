import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// Firebase
import { auth } from "../../firebase";
import { generateUserDocument } from "../../firebase/context";
import { UserContext } from "../../firebase/context";
// react bootstrap

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";

// exported component
const SignUp = () => {
  const { authUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleCreateUser = async (event, email, password) => {
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return generateUserDocument(user, { firstName, lastName });
    } catch (error) {
      setErr("Error creating account");
    }

    setPassword("");
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  };

  return authUser ? (
    <Redirect to='/account' />
  ) : (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control
              name='firstName'
              value={firstName}
              onChange={(event) => handleChange(event)}
              type='text'
              placeholder='First Name'
              autoComplete='new-firstname'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name='lastName'
              value={lastName}
              onChange={(event) => handleChange(event)}
              type='text'
              placeholder='Last Name'
              autoComplete='new-lastname'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name='email'
              value={email}
              onChange={(event) => handleChange(event)}
              type='text'
              placeholder='Email Address'
              autoComplete='new-email'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name='password'
              value={password}
              onChange={(event) => handleChange(event)}
              type='password'
              placeholder='Password'
              autoComplete='new-password'
            />
          </Form.Group>

          <Button
            type='submit'
            style={{ width: "100%" }}
            onClick={(event) => {
              handleCreateUser(event, email, password);
            }}
          >
            Enter
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer>{err && <p className='text-danger'>{err}</p>}</Card.Footer>
    </Card>
  );
};

export default SignUp;
