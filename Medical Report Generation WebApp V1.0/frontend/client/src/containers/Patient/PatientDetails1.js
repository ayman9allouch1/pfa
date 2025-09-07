import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Col, Container, Row, Card } from 'react-bootstrap';
import image from '../../assets/images/user.png'
import Study from "containers/Study/Study";
import { useParams } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { API_URL } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom"


const PatientDetails1 = () => {

  const access = useOutletContext()

  let {pk} = useParams()

  const [patientData, setPatientData] = useState({});

  let navigate = useNavigate()

  useEffect(() => {
    getPatient()
  }, []);

  const getPatient = () => {
    axios
      .get(API_URL + pk, {
        headers: { Authorization: `Bearer ${access}` }
      })
      .then((res) => setPatientData(res.data));
  };


  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: '1150px', textAlign: "center" }} className="My_tables">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#053350', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <Card.Img src={image} 
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fuid="true" o="true" style={{ width: '150px', zIndex: '1' }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h2>{patientData.first_name + " " + patientData.last_name}</h2>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">

                </div>
              </div>
              <Card.Body className="text-black p-4">
                <div className="mb-5">
                  <p className="Texts">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <Card.Text className="font-italic mb-1">Phone Number: {patientData.phone_number}</Card.Text>
                    <Card.Text className="font-italic mb-1">Date of Birth: {patientData.date_of_birth}</Card.Text>
                    <Card.Text className="font-italic mb-1">Age: {patientData.age}</Card.Text>
                    <Card.Text className="font-italic mb-1">Gender: {patientData.gender}</Card.Text>
                    <Card.Text className="font-italic mb-1">Address: {patientData.address}</Card.Text>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Card.Text className="Texts">Studies</Card.Text>
                </div>

                <Study pk={pk} access={access} />

              </Card.Body>
            </Card>
          </Col>

          <div style={{ marginTop: "20px" }}>
            <Button onClick={() => navigate("/dashboard/patients")}>Back</Button>
          </div>
        </Row>
      </Container>
        
    </>
  );
};

export default PatientDetails1;
