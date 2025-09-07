import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import DicomFileDetails from "./DicomFileDetails";


class DicomFile extends Component {

  state = {
    dicom_files: []
  };

  componentDidMount() {
    this.resetState();
  }

  getDicomFiles = () => {
    axios.get('http://127.0.0.1:8000/api/dicom-files/?series=' + this.props.pk, {
      headers: { Authorization: `Bearer ${this.props.access}` }
    }
      ).then(res => this.setState({ dicom_files: res.data }));
  };

  resetState = () => {
    this.getDicomFiles();
  };

  render() {

    const pk = this.props.pk;
    const access = this.props.access;

    return (
      <>
      <Container>
        <Row>
          <Col>
            <DicomFileDetails
              dicom_files={this.state.dicom_files}
              resetState={this.resetState}
              pk={pk}
              access={access}
            />
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default DicomFile;