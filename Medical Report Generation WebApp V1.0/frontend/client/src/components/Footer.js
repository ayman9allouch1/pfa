import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClinicMedical, faPhone, faPrint,  faHome,  faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function Footer() {
  const Company = <FontAwesomeIcon icon={faClinicMedical} />
  const Phone = <FontAwesomeIcon icon={faPhone} />
  const Fax = <FontAwesomeIcon icon={faPrint} />
  const Home = <FontAwesomeIcon icon={faHome} />
  const Mail = <FontAwesomeIcon icon={faEnvelope} />

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
     <br/> 

      <section className='mt-5'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' id="text">
                <i style={{padding:'5px'}}>{Company}</i>  
                Company name
              </h6>
              <p>
                
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' id="text">Products</h6>
              <p>
                <a href='/annotate' className='text-reset'>
                  Annotate
                </a>
              </p>
              <p>
                <a href='/features' className='text-reset'>
                  Features
                </a>
              </p>
              <p>
                <a href='/pricing' className='text-reset'>
                  Pricing
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' id="text">Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' id="text">Contact</h6>
              <p>
              <i style={{padding:'5px'}}>{Home}</i>
                Sfax, Tunisia
              </p>
              <p>
              <i style={{padding:'5px'}}>{Mail}</i>
                romaissa.ktata@gmail.com
              </p>
              <p>
                <i style={{padding:'5px'}}>{Phone}</i> + 00 000 000 00
              </p>
              <p>
              <i style={{padding:'5px'}}>{Fax}</i> + 00 000 000 00
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: 
        <a className='text-reset fw-bold' href='/'>
          Romaissa
        </a>
      </div>
    </MDBFooter>
    </>
  );
}