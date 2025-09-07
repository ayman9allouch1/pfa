import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Row, Container, Col} from "reactstrap";
import { useNavigate } from "react-router-dom"
import segmentedimage from '../../assets/images/Yolo OUTput.png';


function ImageUploadS() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');

  const [title, setTitle] = useState('Upload Image for Object Detection')

  let navigate = useNavigate()

  
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setTitle(null)
  };


  const handleImageUpload = async (event) => {    

    const formData = new FormData();
    formData.append('image', selectedImage);

    setResult('Loading...');

    await new Promise(resolve => {
        return setTimeout(resolve, 5000)
    });

    setResult('Result:');

  };

  return (
    <div>

      <h1> {title} </h1>

      <Container style={{ 
        marginTop: "20px", textAlign: "center", display: "grid",
        height: "200vh",
        justifyContent: "center",
        marginBottom: "25px",
        alignItems: "center"}}>

        {!selectedImage && (
          <Row>
            <Col>
              <label id='button-icon'><i style={{padding:'5px'}}> Image </i></label>
              <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
            </Col>
          </Row>
        )}
        {selectedImage && (
          <>
          <img src={URL.createObjectURL(selectedImage)} alt='X-Ray' style={{maxHeight:'500px',}}/>
          <Row style={{ marginTop: "20px" }}>
            <Col> 
            <Button
              color="primary"
              className="float-right"
              onClick={handleImageUpload}
              style={{ width: "200px" }}
              >
              Detect
            </Button>
            </Col>
          </Row>
          <Row> 
            <Col>
              {result==='Loading...' ?  <Spinner animation="border" variant="secondary" />:null}
              {result==='Result:' ?
              <>
               <p> {result}</p>
               <img src={segmentedimage} alt='X-Ray' style={{maxHeight:'500px',}}/>
               </>
               :null}
            </Col>
          </Row>
          <div style={{ marginTop: "20px" }}>
            </div>
          </> 
        )}

        <Row>
          
          <div style={{ marginTop: "20px" }}>
            <Button color='success' disabled>Save</Button>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button variant='secondary' onClick={() => navigate("/dashboard/models")}>Back</Button>
          </div>
          
        </Row>
      </Container>
    </div>
  );
}

export default ImageUploadS;
