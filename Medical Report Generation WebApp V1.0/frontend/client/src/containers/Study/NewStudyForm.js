import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";


class NewStudyForm extends React.Component {


  state = {
    id: 0,
    study_date: '',
    study_description: '',
    patient_id: this.props.pk
  };

  componentDidMount() {
    if (this.props.study) {
      const { id, study_date, study_description } = this.props.study;
      const patient_id = this.props.pk;

      this.setState({ id, study_date, study_description, patient_id });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  
  CreateStudy = (e) => {
    e.preventDefault();
    let url = 'http://localhost:8000/api/studies/';
    axios.post(url, this.state, {
      headers: {
        Authorization: `Bearer ${this.props.access}`
      }, 
    })
    .then(() => {
      this.props.resetState();
      this.props.toggle();
    })
  };

  editStudy = (e) => {
    e.preventDefault();
    let url = 'http://localhost:8000/api/studies/';
    axios.put(url + this.state.id, this.state, {
      headers: {
        Authorization: `Bearer ${this.props.access}`
      }
    })
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
      <Form onSubmit={this.props.study? this.editStudy : this.CreateStudy}>
        <FormGroup>
          <Label for="study_date">Study Date:</Label>
          <Input
            type="datetime-local"
            name="study_date"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.study_date)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="study_description">Study Description:</Label>
          <Input
            type="textarea"
            name="study_description"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.study_description)}
            required
          />
        </FormGroup>
        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudyForm;