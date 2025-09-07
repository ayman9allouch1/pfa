import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";


class NewPatientForm extends React.Component {
  state = {
    pk: 0,
    first_name: "",
    last_name:"",
    phone_number: "",
    address: "",
    date_of_birth: "",
    gender: "Male"
  };

  componentDidMount() {
    if (this.props.patient) {
      const { pk, first_name, last_name, phone_number, address, date_of_birth, gender } = this.props.patient;
      this.setState({ pk, first_name, last_name, phone_number, address, date_of_birth, gender });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPatient = e => {
    e.preventDefault();
    axios.post(API_URL, this.state, {headers: { Authorization: `Bearer ${this.props.access}` }})
    .then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editPatient = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state, {headers: { Authorization: `Bearer ${this.props.access}` }})
    .then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.patient ? this.editPatient : this.createPatient}>
        <FormGroup>
          <Label for="first_name">First name:</Label>
          <Input
            type="text"
            name="first_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.first_name)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="last_name">Last name:</Label>
          <Input
            type="text"
            name="last_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.last_name)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="phone_number">Phone Number:</Label>
          <Input
            type="tel"
            name="phone_number"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone_number)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="address">Address:</Label>
          <Input
            type="textarea"
            name="address"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.address)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="date_of_birth">Date of birth:</Label>
          <Input
            type="date"
            name="date_of_birth"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.date_of_birth)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="gender">Select</Label>
          <Input
            type="select"
            name="gender"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.gender)}
            required
            >
            <option>
              Male
            </option>
            <option>
              Female
            </option>
          </Input>
        </FormGroup>

        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewPatientForm;