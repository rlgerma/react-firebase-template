import React, { useEffect, useState, createContext } from "react";
import { db, auth } from "./index";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setTimeout(() => {
        setPending(false);
      }, 1000);

      return () => clearTimeout();
    });
  }, []);

  if (pending) {
    return (
      <Container className='h-100 bg-lightBlue d-flex justify-content-center'>
        <Row style={{ marginTop: "35%" }}>
          <Col lg={12}>
            <Spinner animation='border' variant='primary' />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <UserContext.Provider
        value={{
          authUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
};
export const generateUserDocument = async (user, userInfo) => {
  if (!user) return;

  const { uid } = user;

  const userRef = db.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      await userRef.set(
        {
          profilePic: null,
          ...userInfo,
        },
        { merge: true }
      );

      return getUserDocument(uid);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  } else if (snapshot.exists) {
    return getUserDocument(uid);
  }
};

const getUserDocument = async (uid) => {
  const userRef = db.doc(`users/${uid}`);

  if (!uid) return null;

  await userRef.onSnapshot((snap) => {
    const user = snap.data();
    return {
      ...user,
    };
  });
};
