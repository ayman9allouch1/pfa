import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { Button } from 'react-bootstrap';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


class ConfirmRemovalModalStudy extends Component {
  
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteStudy = pk => {
    axios.delete('http://127.0.0.1:8000/api/studies/' + pk, {headers: { Authorization: `Bearer ${this.props.access}` }})
    .then(() => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    const Remove = <FontAwesomeIcon icon={faTrashAlt} />

    return (
      <Fragment>
        <Button variant="outline-danger" style={{padding:'5px', border:'9px', borderRadius: '50%'}} onClick={() => this.toggle()}>
          <i style={{padding:'5px'}}>{Remove}</i>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Are you sure you want to delete the study?
          </ModalHeader>

          <ModalFooter>
            <Button variant="secondary" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteStudy(this.props.pk)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModalStudy;