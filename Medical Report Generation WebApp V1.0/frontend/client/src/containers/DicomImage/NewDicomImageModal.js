import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button } from 'react-bootstrap';
import NewDicomImageForm from "./NewDicomImageForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class NewDicomImageModal extends Component {
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

    var title = "Editing Image";
    var button = <Button variant="outline-secondary" style={{padding:'5px', border:'9px', borderRadius: '50%'}} onClick={this.toggle}>
      <i style={{padding:'5px'}}>{Edit}</i>
    </Button>;
    if (create) {
      title = "Add New Image";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
         >
          Add Image
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> {title} </ModalHeader>

          <ModalBody>
            <NewDicomImageForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              pk={pk}
              image={this.props.image}
              access={access}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewDicomImageModal;