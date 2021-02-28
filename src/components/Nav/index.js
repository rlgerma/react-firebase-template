import React, { useContext } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../firebase/context";

import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  const { authUser } = useContext(UserContext);

  return (
    <Nav activeKey='/' className='d-flex justify-content-end'>
      <Nav.Item>
        <Nav.Link href='/'>Home</Nav.Link>
      </Nav.Item>
      {authUser ? (
        <>
          <Nav.Item>
            <Nav.Link href='/account'>Account</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                auth.signOut();
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <Nav.Item>
          <Nav.Link href='/login'>Login</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};
export default NavBar;
