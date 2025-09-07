import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";


class NewSerieForm extends React.Component {


  state = {
    id: 0,
    modality: '',
    date: '',
    description: '',
    study_id: this.props.pk
  };

  componentDidMount() {
    if (this.props.serie) {
      const { id, modality, date, description } = this.props.serie;
      const study_id = this.props.pk;

      this.setState({ id, modality, date, description, study_id });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  
  CreateSerie = (e) => {
    e.preventDefault();
    let url = 'http://localhost:8000/api/series/';
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

  editSerie = (e) => {
    e.preventDefault();
    let url = 'http://localhost:8000/api/series/';
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
      <Form onSubmit={this.props.serie? this.editSerie : this.CreateSerie}>
        <FormGroup>
          <Label for="modality">Modality:</Label>
          <Input
            type="text"
            name="modality"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.modality)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="date">Serie Date:</Label>
          <Input
            type="datetime-local"
            name="date"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.date)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Serie Description:</Label>
          <Input
            type="textarea"
            name="description"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.description)}
            required
          />
        </FormGroup>
        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewSerieForm;