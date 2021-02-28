import React, { useState } from "react";

import Upload from "../../components/Upload";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const Account = () => {
  const [modalShow, setModalShow] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const profilePic = JSON.parse(sessionStorage.getItem("profilePic"));

  return user === null ? (
    <Spinner />
  ) : (
    <Container>
      <Modal
        show={modalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Upload />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Row className='my-5 text-center'>
        <Col lg={12}>
          <h1>Account</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>Welcome, {user.firstName}</Col>
        <Col lg={4}>
          <Card className='text-center'>
            <Card.Header as='h5'>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Body>
              <Figure>
                <Figure.Image
                  src={
                    profilePic || user.profilePic || "https://picsum.photos/"
                  }
                  alt='profile-pic'
                  style={{ maxWidth: "100%" }}
                />
              </Figure>
            </Card.Body>
            <Card.Footer>
              <Button variant='primary' onClick={() => setModalShow(true)}>
                Set ProfilePic
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Account;
