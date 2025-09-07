import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import image from '../assets/images/user.png'
import axios from "axios";
import { useOutletContext } from "react-router-dom"


export default function Profile() {
  
  const access = useOutletContext()

  const [me, setMe] = useState([]);

  useEffect(() => {
    resetState();
  }, [access]);

  const getMe = () => {
    axios
      .get('http://127.0.0.1:8000/api/users/me', {
        headers: { Authorization: `Bearer ${access}` }
      })
      .then((res) => setMe(res.data));
  };

  const resetState = () => {
    getMe();
  };

  
  return (
    <div className="gradient-custom-2" >
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="9" xl="7">
            <Card>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#053350', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <Card.Img src={image}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid="true" style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5> {me.first_name} {me.last_name} </h5>
                  <Card.Text> 
                    {me.is_staff ? (<b> Staff </b>):(null)}
                  </Card.Text>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>

              </div>
              <Card.Body className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <Card.Text className="font-italic mb-1">Phone Number: {me.phone}</Card.Text>
                    <Card.Text className="font-italic mb-1">Date of Birth: {me.date_of_birth}</Card.Text>
                    <Card.Text className="font-italic mb-0">Email Address: {me.email}</Card.Text>
                    <Card.Text className="font-italic mb-1">Grade: {me.grade}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}