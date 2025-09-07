import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";


class NewDicomImageForm extends React.Component {


  state = {
    id: 0,
    title: '',
    description: '',
    image_url: null,
    dicom_file_id: this.props.pk
  };

  componentDidMount() {
    if (this.props.image) {
      const { id, title, description, } = this.props.image;
      const dicom_file_id = this.props.pk;

      this.setState({ id, title, description, dicom_file_id });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];

    const validExtensions = [".png"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      
      this.setState({
        image_url: file
      });
    } else {
      alert("Invalid file extension. Please select a PNG image.");
      e.target.value = null;
      this.setState({
        image_url: null
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let url = 'http://localhost:8000/api/dicom-images/';
    axios.post(url, this.state, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.access}`
      }, 
    })
    .then(() => {
      this.props.resetState();
      this.props.toggle();
    })
  };

  editImage = (e) => {
    e.preventDefault();
    let url = 'http://localhost:8000/api/dicom-images/';
    axios.patch(url + this.state.id, this.state, {
      headers: {
        'content-type': 'multipart/form-data',
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
      <Form onSubmit={this.props.image? this.editImage : this.handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.title)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="textarea"
            name="description"
            onChange={this.handleChange}
            value={this.defaultIfEmpty(this.state.description)}
            required
          />
        </FormGroup>

        {!this.props.image ? (
          <FormGroup>
          <Label for="image_url">Image:</Label>
          <Input
            type="file"
            name="image_url"
            accept="image/png"
            onChange={this.handleImageChange}
            required
          />
        </FormGroup>
        ): null}
        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewDicomImageForm;