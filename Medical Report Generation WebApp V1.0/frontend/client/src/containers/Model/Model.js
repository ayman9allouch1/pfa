import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import NewModelModal from "./NewModelModal";
import NewModelModalC from "./NewModelModalC";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ConfirmRemovalModalModel from "./ConfirmRemovalModalModel";
import ConfirmRemovalModalModelC from "./ConfirmRemovalModalModelC";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'


const Model = () => {

  const access = useOutletContext()

  const [segmentationModels, setSegmentationModels] = useState([]);
  const [imageCaptioningModels, setImageCaptioningModels] = useState([]);

  const FileImage = <FontAwesomeIcon icon={faFileImage} />

  let navigate = useNavigate()

  useEffect(() => {
    resetState();
  }, []);

  const getSegmentationModels = () => {
    axios
      .get('http://127.0.0.1:8000/api/segmentation-models/', {
        headers: { Authorization: `Bearer ${access}` }
      })
      .then((res) => setSegmentationModels(res.data));
  };

  const getImageCaptioningModels = () => {
    axios
      .get('http://127.0.0.1:8000/api/image-captioning-models/', {
        headers: { Authorization: `Bearer ${access}` }
      })
      .then((res) => setImageCaptioningModels(res.data));
  };

  const resetState = () => {
    getSegmentationModels();
    getImageCaptioningModels();
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>  Models </h1>
        <br />
        <Row>
          <Col>
          <Card className="My_tables">
                <Card.Header>Image Captioning Models</Card.Header>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th> 
                                <th>Type</th>
                                <th>Version</th>
                                <th>Description</th>
                                <th>File Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!imageCaptioningModels || imageCaptioningModels.length <= 0 ? (
                                <tr>
                                    <td colSpan="6" align="center">
                                        No data
                                    </td>
                                </tr>
                            ) : (
                                imageCaptioningModels
                                .map(imageCaptioningModel => (
                                    <tr key={imageCaptioningModel.id} >
                                        <td>{imageCaptioningModel.name}</td>
                                        <td>{imageCaptioningModel.type}</td>
                                        <td>{imageCaptioningModel.version}</td>
                                        <td>{imageCaptioningModel.model_description}</td>
                                        <td>{imageCaptioningModel.model_file.split("/").slice(-1)}</td>
                                        <td align="center">
                                            <NewModelModalC
                                                create={false}
                                                model={imageCaptioningModel}
                                                resetState={resetState}
                                                access={access}
                                            />
                                            &nbsp;&nbsp;
                                            <ConfirmRemovalModalModelC
                                                pk={imageCaptioningModel.id}
                                                resetState={resetState}
                                                access={access}
                                            />
                                            &nbsp;&nbsp;
                                            <Button variant="outline-primary" title="generate report" style={{padding:'5px', border:'9px', borderRadius: '50%'}} /*onClick={() => this.toggle()}*/>
                                                <Link  id='link-background' to={`/dashboard/models/generate`}>
                                                    <i style={{padding:'5px'}}>{FileImage}</i>
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    <br />
                    <br />
                    <NewModelModalC
                        create={true}
                        resetState={resetState}
                        access={access}
                    />
                </Card.Body>
            </Card>
            <br />
            <br />
            <Card className="My_tables">
                <Card.Header>Object Detection Models</Card.Header>
                <Card.Body>
                    <Table className="My_tables">
                        <thead>
                            <tr>
                                <th>Name</th> 
                                <th>Type</th>
                                <th>Version</th>
                                <th>Description</th>
                                <th>File Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!segmentationModels || segmentationModels.length <= 0 ? (
                                <tr>
                                    <td colSpan="6" align="center">
                                        No data
                                    </td>
                                </tr>
                            ) : (
                                segmentationModels
                                .map(segmentationModel => (
                                    <tr key={segmentationModel.id} >
                                        <td>{segmentationModel.name}</td>
                                        <td>{segmentationModel.type}</td>
                                        <td>{segmentationModel.version}</td>
                                        <td>{segmentationModel.model_description}</td>
                                        <td>{segmentationModel.model_file.split("/").slice(-1)}</td>
                                        <td align="center">
                                            <NewModelModal
                                                create={false}
                                                model={segmentationModel}
                                                resetState={resetState}
                                                access={access}
                                            />
                                            &nbsp;&nbsp;
                                            <ConfirmRemovalModalModel
                                                pk={segmentationModel.id}
                                                resetState={resetState}
                                                access={access}
                                            />
                                            &nbsp;&nbsp;
                                            <Button variant="outline-primary" title="segment image" style={{padding:'5px', border:'9px', borderRadius: '50%'}} /*onClick={() => this.toggle()}*/>
                                                <Link  id='link-background' to={`/dashboard/models/segment`}>
                                                    <i style={{padding:'5px'}}>{FileImage}</i>
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    <br />
                    <br />
                    <NewModelModal
                        create={true}
                        resetState={resetState}
                        access={access}
                    />
                </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
            <div style={{ marginTop: "20px" }}>
                <Button variant='secondary' onClick={() => navigate("/dashboard")}>Back</Button>
            </div>
        </Row>
      </Container>
    </>
  );
};

export default Model;
