import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button } from 'react-bootstrap';
import NewSerieForm from "./NewSerieForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faAdd } from '@fortawesome/free-solid-svg-icons'


class NewSerieModal extends Component {
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
    const Add = <FontAwesomeIcon icon={faAdd} />


    var title = "Editing Serie";
    var button = <Button variant="outline-secondary" style={{padding:'5px', border:'9px', borderRadius: '50%'}} onClick={this.toggle}>
      <i style={{padding:'5px'}}>{Edit}</i>
    </Button>;
    if (create) {
      title = "Add New Serie";

      button = (
        <Button
          variant="outline-primary"
          style={{padding:'5px', border:'9px', borderRadius: '50%'}}
          onClick={this.toggle}
         >
          <i style={{padding:'5px'}}>{Add}</i>
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> {title} </ModalHeader>

          <ModalBody>
            <NewSerieForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              pk={pk}
              serie={this.props.serie}
              access={access}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewSerieModal;