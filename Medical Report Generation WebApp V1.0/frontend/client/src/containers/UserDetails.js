import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Account from './Account';

function UserDetails(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
    setShow(false)
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button className='test' onClick={handleClick}> Test </button>
        </Offcanvas.Body>
      </Offcanvas>

      {isShown && <Account access={props.access}/>}
    </>
  );
}

export default UserDetails;
