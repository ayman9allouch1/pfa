import React, { useEffect, useState, Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import DicomImageList from "./DicomImageList";
import NewDicomImageModal from "./NewDicomImageModal";
import axios from "axios";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

const DicomImage = (props) => {

  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const FileImage = <FontAwesomeIcon icon={faFileImage} />
  
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    resetState();
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/dicom-images/?dicom_file=${props.pk}`,
        {
          headers: { Authorization: `Bearer ${props.access}` },
        }
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const resetState = () => {
    getImages();
  };

  return (
    <>
    <Fragment>
      <Button variant="outline-success" style={{padding:'5px', border:'9px', borderRadius: '50%'}} onClick={toggle} >
        <i style={{padding:'5px'}}>{FileImage}</i>
      </Button>
        
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>
          {props.url.slice(30,-4)}
        </ModalHeader>

        <ModalBody style={{textAlign: "center" }}>
          <Container>
            <Row>
              <Col>
                <DicomImageList
                  images={images}
                  resetState={resetState}
                  pk={props.pk}
                  access={props.access}
                />
              </Col>
            </Row>
          </Container>
        </ModalBody>

        <ModalFooter>
          <NewDicomImageModal
            create={true}
            resetState={resetState}
            pk={props.pk}
            access={props.access}
          />

          <Button variant="secondary" onClick={toggle} >
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
    </>
  );
};

export default DicomImage;
