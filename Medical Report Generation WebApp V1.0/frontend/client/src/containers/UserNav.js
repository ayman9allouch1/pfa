import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faAddressCard, faProcedures, faHome, faGears, faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


function UserNav(props) {

  const Users = <FontAwesomeIcon icon={faUsers} />
  const Patients = <FontAwesomeIcon icon={faProcedures} />
  const UserProfile = <FontAwesomeIcon icon={faAddressCard} />
  const Home = <FontAwesomeIcon icon={faHome} />
  const Model = <FontAwesomeIcon icon={faGears} />
  const Rectangle = <FontAwesomeIcon icon={faVectorSquare} />


  const handleClick = event => {

    setShow(false);
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  const ServiceHeadLinks = (
    <>
    <button className='nav-button' onClick={handleClick}> 
      <Link  className='nav-link' to="accounts">
        <i style={{padding:'20px'}}>{Users}</i> 
        Accounts
      </Link> 
    </button>
    </>
	);

	const ResidentLinks = (
    <>
    <button className='nav-button' onClick={handleClick}>
      <Link  className='nav-link' to="patients">
        <i style={{padding:'20px'}}>{Patients}</i> 
        Patients
      </Link>
    </button>

    <button className='nav-button' onClick={handleClick}>
      <Link  className='nav-link' to="models">
        <i style={{padding:'20px'}}>{Model}</i> 
        DL Models
      </Link>
    </button>

    <button className='nav-button' onClick={handleClick}>
      <Link  className='nav-link' to="annotate">
        <i style={{padding:'20px'}}>{Rectangle}</i> 
        Annotate
      </Link>
    </button>
    </>
	);


  return (
    <>
      <Navbar id='user-nav' expand='xxl' className="mb-3" onSelect={false}	 >
        <Container fluid>
          <Navbar.Brand id='nav-bar-brand'>Welcome {props.user.first_name} {props.user.last_name}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} onClick={handleShow}/>
         
          <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Dashboard</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="justify-content-end flex-grow-1 pe-3">

                <button className='nav-button'>
                  <Nav.Link  href="/">
                    <i style={{padding:'20px'}}>{Home}</i> 
                    Home
                  </Nav.Link>
                </button>

                <button className='nav-button' onClick={handleClick}>
                  <Link  className='nav-link' to="profile">
                    <i style={{padding:'20px'}}>{UserProfile}</i> 
                    Profile
                  </Link>
                </button>

                {props.user.is_staff ? (
                  ServiceHeadLinks
                  ) : (
                  ResidentLinks
                )}
                
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNav;