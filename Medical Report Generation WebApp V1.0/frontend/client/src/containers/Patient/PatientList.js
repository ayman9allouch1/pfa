import React, { Component } from "react";
import { Table } from "reactstrap";
import NewPatientModal from "./NewPatientModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

const Search = <FontAwesomeIcon icon={faSearch} />


class PatientList extends Component {

  state = {
    searchTerm: ''
  };

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
  };


  render() {
    const patients = this.props.patients;
    const access = this.props.access;

    return (
      <>
      <br/>
      <br/>
      <br/>
      <Form>
        <FormGroup row>
          <Label for="search" sm={1}><i style={{padding:'5px'}}>{Search}</i> </Label>
          <Col sm={4}>
            <Input
              type="text"
              name="search"
              onChange={this.handleChange}
              placeholder="Search...."
              value={this.searchTerm}
            />
          </Col>
        </FormGroup>
      </Form>
      <Table dark>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!patients || patients.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <Spinner animation="border" variant="secondary" />
              </td>
            </tr>
          ) : (
            patients
            .filter(patient => 
              patient.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              patient.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              patient.phone_number.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              patient.date_of_birth.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              patient.gender.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            ) 
            .map(patient => (
              <tr key={patient.pk} >
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.phone_number}</td>
                <td>{patient.date_of_birth}</td>
                <td>{patient.gender}</td>
                <td align="center">
                  <NewPatientModal
                    create={false}
                    patient={patient}
                    resetState={this.props.resetState}
                    access={access}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={patient.pk}
                    resetState={this.props.resetState}
                    access={access}
                  />
                  &nbsp;&nbsp;
                  <Button color="primary">
                    <Link  style={{textDecoration: 'none', color: 'white'}} to={`${patient.pk}`}>
                      Details
                    </Link>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      </>
    );
  }
}

export default PatientList;