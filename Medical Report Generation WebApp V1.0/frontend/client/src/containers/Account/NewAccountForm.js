import React from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { API_URL_AUTH_R } from "../../constants";


class NewAccountForm extends React.Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '', 
    phone: '', 
    grade: '',
    password: '',
    passwordType: 'password',
  };

  ShowEye = <FontAwesomeIcon icon={faEye} />
  HideEye = <FontAwesomeIcon icon={faEyeSlash} />

  togglePassword =()=>{
    if(this.state.passwordType==="password"){
      this.setState({passwordType: "text"})
      return;
    }
    this.setState({passwordType:"password"})
  }

  componentDidMount() {
    if (this.props.account) {
      const { id, first_name, last_name, email, date_of_birth, phone, grade, password } = this.props.account;
      this.setState({ id, first_name, last_name, email, date_of_birth, phone, grade, password });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createAccount = e => {
    e.preventDefault();
    axios.post(API_URL_AUTH_R, this.state, {headers: { Authorization: `Bearer ${this.props.access}` }})
    .then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editAccount = e => {
    e.preventDefault();
    axios.put("http://localhost:8000/auth/users/" + this.state.id + '/', this.state, {headers: { Authorization: `Bearer ${this.props.access}` }})
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
      <Form onSubmit={this.props.account ? this.editAccount : this.createAccount}>
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
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
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
          <Label for="phone">Phone Number:</Label>
          <Input
            type="tel"
            name="phone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="grade">Grade:</Label>
          <Input
            type="text"
            name="grade"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.grade)}
            required
          />
        </FormGroup>

        {!this.props.account ? (
        <FormGroup>
          <Label for="password">Password:</Label>
          <Row> 
          <Col md={10}>
          <Input
            type={this.state.passwordType}
            name="password"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.password)}
            required
          />
          </Col>
          <Col md={2}>
          <button className="button-password" type="button" onClick={this.togglePassword}>
            { this.state.passwordType === "password"? 
            <i style={{padding:'4px'}}>{this.HideEye}</i> 
            : <i style={{padding:'5px'}}>{this.ShowEye}</i>} 
          </button>
          </Col>
          </Row> 
        </FormGroup>
        ):(null)}

        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewAccountForm;