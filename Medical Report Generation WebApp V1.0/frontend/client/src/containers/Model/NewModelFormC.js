import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";


class NewModelFormC extends React.Component {
  state = {
    id: 0,
    name: "",
    type:"",
    version: "",
    model_description: "",
    model_file: null
  };

  componentDidMount() {
    if (this.props.model) {
      const { id, name, type, version, model_description } = this.props.model;
      this.setState({ id, name, type, version, model_description });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];

    const validExtensions = [".h5", ".pkl", ".pickle", ".model", ".joblib"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      this.setState({
        model_file: file
      });
    } else {
      alert("Invalid file extension. Please select a valid model file.");
      e.target.value = null;
      this.setState({
        model_file: null
      });
    }
  };

  createModel = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/image-captioning-models/', this.state, 
      {headers: { 
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.access}` 
      }})
    .then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editModel = e => {
    e.preventDefault();
    axios.patch('http://127.0.0.1:8000/api/image-captioning-models/' + this.state.id, this.state, {
      headers: { 
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.access}` 
      }})
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
      <Form onSubmit={this.props.model ? this.editModel : this.createModel}>
        <FormGroup>
          <Label for="name">Model Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="type">Model Type:</Label>
          <Input
            type="text"
            name="type"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.type)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="version">Model Version:</Label>
          <Input
            type="text"
            name="version"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.version)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="model_description">Model Description:</Label>
          <Input
            type="textarea"
            name="model_description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.model_description)}
            required
          />
        </FormGroup>

        {!this.props.model ? (
        <FormGroup>
          <Label for="model_file">Model File:</Label>
          <Input
            type="file"
            name="model_file"
            onChange={this.handleFileChange}
            required
          />
        </FormGroup>
        ): null}

        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewModelFormC;