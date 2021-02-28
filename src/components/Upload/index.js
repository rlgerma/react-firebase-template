import React, { useState, useRef } from "react";
import { storage, auth, db } from "../../firebase";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";

// Image-Cropper
import { HiddenCropper } from "react-bootstrap-image-cropper";

const UploadImage = () => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState(false);
  const [err, setErr] = useState("");
  const triggerRef = useRef();

  const handleChange = (file) => {
    let user = auth.currentUser.uid;

    file.lastModifiedDate = new Date();
    file.name = `${user}_ProfilePic`;
    setImage(file);

    setUpload(true);
  };

  const handleUpload = (upload, profileRef) => {
    if (image === null) return;

    const user = auth.currentUser.uid;
    profileRef = db.collection("users").doc(`${user}`);
    upload = storage.ref(`users/${user}/images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      (snapshot, progress) => {
        progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref(`users/${user}/images`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            profileRef.update({
              profilePic: url,
            });
            sessionStorage.setItem("profilePic", JSON.stringify(url));
          })
          .catch((error) => {
            console.error(error);
            setErr(error.message);
          });
      }
    );
  };

  return (
    <>
      <ProgressBar
        variant='success'
        now={progress}
        className='progress'
        max={100}
      />

      <Form.Group className='m-0'>
        <Row className='text-center'>
          <Col lg={4}>
            <Button
              onClick={() => triggerRef.current.trigger()}
              className='waves-effect waves-light btn'
              style={{ margin: "10% 0 0" }}
            >
              Choose File
            </Button>
          </Col>
          <Col lg={4} />
          <Col lg={4}>
            {upload && (
              <>
                {progress === 100 ? (
                  <>
                    <p
                      style={{ margin: "15% 0 0" }}
                      className='mx-2 text-success'
                    >
                      Done
                    </p>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleUpload}
                      className='waves-effect waves-light btn'
                      style={{ margin: "10% 0 0" }}
                    >
                      Upload
                    </Button>

                    {err === "" ? (
                      <p className='mx-2 text-success'>Ready</p>
                    ) : (
                      <p className='mx-2 text-danger'>{err}</p>
                    )}
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
        <HiddenCropper
          triggerRef={triggerRef}
          onCropped={handleChange}
          cropOptions={{ aspect: 4 / 4, maxZoom: 5 }}
          outputOptions={{
            maxWidth: 400,
            maxHeight: 300,
            mimeType: "image/jpeg",
          }}
          previewOptions={{ width: 400, height: 400 }}
          displayOptions={{ title: "Scroll to zoom in/out" }}
        />
      </Form.Group>
    </>
  );
};

export default UploadImage;
