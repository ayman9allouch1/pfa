import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { Button } from 'react-bootstrap';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { Table } from "reactstrap";
import NewDicomFileModal from "./NewDicomFileModal";
import ConfirmRemovalModalDicomFile from "./ConfirmRemovalModalDicomFile";
import DicomImage from '../DicomImage/DicomImage';


class DicomFileDetails extends Component {

  state = {
    modal: false
  };


  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  sendImageURL = (url) => {
    localStorage.setItem('url', url);
  }

  render() {

    const Open = <FontAwesomeIcon icon={faFolderOpen} />
    const External = <FontAwesomeIcon icon={faExternalLinkAlt} />
    const dicom_files = this.props.dicom_files;
    const pk = this.props.pk;
    const access = this.props.access;


    return (
      <Fragment>
        <Button
          variant="outline-primary"
          style={{padding:'5px', border:'9px', borderRadius: '50%'}}
          onClick={this.toggle}
          >
          <i style={{padding:'5px'}}>{Open}</i>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} fullscreen className="My_tables">
          <ModalHeader toggle={this.toggle}>
            DICOM Images
          </ModalHeader>

          <ModalBody style={{textAlign: "center" }}>
            <Container className="py-5 h-100">
              <Row className="justify-content-center align-items-center h-100">
                <Col className="justify-content-center align-items-center h-100">
                  <Card style={{ width: '1100px', textAlign: "center" }} className="My_tables">
                    <Card.Body className="text-black p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                      </div>
                      <Table>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image Path</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {!dicom_files || dicom_files.length <= 0 ? (
                            <tr>
                              <td colSpan="6" align="center">
                                No data
                              </td>
                            </tr>
                            ) : (
                            dicom_files 
                            .map(dicom_file => (
                              <tr key={dicom_file.id} >
                                <td>{dicom_file.title}</td>
                                <td>{dicom_file.description}</td>
                                <td>{dicom_file.image_url.slice(16,)}</td>
                                <td align="center"> 
                                  <Button variant="outline-primary" type='button' style={{padding:'5px', border:'9px', borderRadius: '50%'}} onClick={() => this.sendImageURL(dicom_file.image_url)}>
                                    <a  id='link-background' href={`http://localhost:5000/dwv/`} target="_blank" rel="noreferrer" >
                                      <i style={{padding:'5px'}}>{External}</i>
                                    </a>
                                  </Button>

                                  <NewDicomFileModal
                                    create={false}
                                    dicom_file={dicom_file}
                                    resetState={this.props.resetState}
                                    pk={pk}
                                    access={access}
                                  />
                                    
                                  <ConfirmRemovalModalDicomFile
                                    pk={dicom_file.id}
                                    resetState={this.props.resetState}
                                    access={access}
                                  />

                                  <DicomImage
                                    pk={dicom_file.id}
                                    url={dicom_file.image_url}
                                    resetState={this.props.resetState}
                                    access={access}
                                  /> 
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>

                      <NewDicomFileModal create={true} resetState={this.props.resetState} access={access} pk={pk}/>

                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" type="button" onClick={() => this.toggle()}>
              Exit
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default DicomFileDetails;