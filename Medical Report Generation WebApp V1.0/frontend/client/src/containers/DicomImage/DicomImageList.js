import React from "react";
import { Col, Container, Row } from "reactstrap";
import NewDicomImageModal from "./NewDicomImageModal";
import ConfirmRemovalModalDicomImage from "./ConfirmRemovalModalDicomImage";


const DicomImageList = (props) => {


  return (
    <>
      <Container className="py-2 h-100">
              
        <Row md={2}>
          {!props.images || props.images.length <= 0 ? (
            <Col className="mb-2">
              <b>No data!</b>
            </Col>
          ) : (
            props.images.map(image => (
              image.image_url? (
                <Col className="mb-2" key={image.id}>
                    
                  <div id="imagesMain">
                    <div className="imagebox">
                      <img src={('/images/' + image.image_url.slice(24,))} 
                        className="w-100 rounded-3" id="zoom"
                        alt="Dicom"
                      />
                      <div className="caption">

                        &nbsp;&nbsp;

                        <NewDicomImageModal 
                          create={false}
                          image={image}
                          resetState={props.resetState}
                          pk={props.pk}
                          access={props.access}
                        />
                        &nbsp;&nbsp;

                        <ConfirmRemovalModalDicomImage
                          pk={image.id}
                          resetState={props.resetState}
                          access={props.access}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              ) : null
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default DicomImageList;
