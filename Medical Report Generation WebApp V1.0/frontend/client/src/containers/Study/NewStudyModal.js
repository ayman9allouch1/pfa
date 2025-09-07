import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button } from 'react-bootstrap';
import NewStudyForm from "./NewStudyForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class NewStudyModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;
    const pk = this.props.pk;
    const access = this.props.access;

    const Edit = <FontAwesomeIcon icon={faEdit} />

    var title = "Editing Study";
    var button = <Button variant="outline-secondary" style={{padding:'5px', border:'9px', borderRadius: '50%'}} onClick={this.toggle}>
      <i style={{padding:'5px'}}>{Edit}</i>
    </Button>;
    if (create) {
      title = "Add New Study";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
         >
          Add Study
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> {title} </ModalHeader>

          <ModalBody>
            <NewStudyForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              pk={pk}
              study={this.props.study}
              access={access}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewStudyModal;