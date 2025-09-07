import React, { Component } from "react";
import { Table } from "reactstrap";
import NewAccountModal from "./NewAccountModal";
import ConfirmRemovalModalAccount from "./ConfirmRemovalModalAccount";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Spinner from 'react-bootstrap/Spinner';


const Search = <FontAwesomeIcon icon={faSearch} />


class AccountList extends Component {

  state = {
    searchTerm: ''
  };


  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
  };


  render() {
    
    const accounts = this.props.accounts;
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
            <th>Email</th>
            <th>Date of birth</th>
            <th>Phone Number</th>
            <th>Grade</th>
            <th>Group ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!accounts || accounts.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                  <Spinner animation="border" variant="secondary" />
              </td>
            </tr>
          ) : (
            accounts
            .filter(account => 
              account.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              account.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              account.email.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              account.date_of_birth.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              account.phone.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
              account.grade.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            ) 
            .map(account => (
              <tr key={account.id} >
                <td>{account.first_name}</td>
                <td>{account.last_name}</td>
                <td>{account.email}</td>
                <td>{account.date_of_birth}</td>
                <td>{account.phone}</td>
                <td>{account.grade}</td>
                <td>{account.groups}</td>
                <td align="center">
                  <NewAccountModal
                    create={false}
                    account={account}
                    resetState={this.props.resetState}
                    access={access}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModalAccount
                    account={account}
                    id={account.id}
                    resetState={this.props.resetState}
                    access={access}
                  />
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

export default AccountList;