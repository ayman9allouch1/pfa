import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import PatientList from "./PatientList";
import NewPatientModal from "./NewPatientModal";
import axios from "axios";
import { API_URL } from "../../constants";
import { useOutletContext } from "react-router-dom"


const Patient1 = () => {

  const access = useOutletContext()

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    resetState();
  }, []);

  const getPatients = () => {
    axios
      .get(API_URL, {
        headers: { Authorization: `Bearer ${access}` }
      })
      .then((res) => setPatients(res.data));
  };

  const resetState = () => {
    getPatients();
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1> Patient List</h1>
        <Row>
          <Col>
            <PatientList
              patients={patients}
              resetState={resetState}
              access={access}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewPatientModal
              create={true}
              resetState={resetState}
              access={access}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Patient1;
