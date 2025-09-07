import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import SerieList from "./SerieList";
import NewSerieModal from "./NewSerieModal";
import axios from "axios";


class Serie extends Component {
  state = {
    series: []
  };

  componentDidMount() {
    this.resetState();
  }

  getSeries = () => {
    axios.get('http://127.0.0.1:8000/api/series/?study=' + this.props.pk, {
      headers: { Authorization: `Bearer ${this.props.access}` }
    }
      ).then(res => this.setState({ series: res.data }));
  };

  resetState = () => {
    this.getSeries();
  };

  render() {

    const pk = this.props.pk;
    const access = this.props.access;

    return (
      <>
      <Container>
        <Row>
          <Col>
            <SerieList
              series={this.state.series}
              resetState={this.resetState}
              pk={pk}
              access={access}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewSerieModal create={true} resetState={this.resetState} access={access} pk={pk}/>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Serie;