import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import StudyList from "./StudyList";
import NewStudyModal from "./NewStudyModal";
import axios from "axios";


class Study extends Component {
  state = {
    studies: []
  };

  componentDidMount() {
    this.resetState();
  }

  getStudies = () => {
    axios.get('http://127.0.0.1:8000/api/studies/?patient=' + this.props.pk, {
      headers: { Authorization: `Bearer ${this.props.access}` }
    }
      ).then(res => this.setState({ studies: res.data }));
  };

  resetState = () => {
    this.getStudies();
  };

  render() {

    const pk = this.props.pk;
    const access = this.props.access;

    return (
      <>
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <StudyList
              studies={this.state.studies}
              resetState={this.resetState}
              pk={pk}
              access={access}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewStudyModal create={true} resetState={this.resetState} access={access} pk={pk}/>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Study;