import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Row, Container, Col} from "reactstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';


function ImageUpload() {

  const access = useOutletContext()

  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const [title, setTitle] = useState('Upload Image for Report Generation')

  const [showS, setShowS] = useState(false);
  const [showD, setShowD] = useState(false);

  let navigate = useNavigate()

  const obj = {}

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setTitle(null)
  };


  const handleImageUpload = async (event) => {    

    const formData = new FormData();
    formData.append('image', selectedImage);

    setResult('Loading...');
    
    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData);
  
      if (response.status === 200) {
        const result = response.data;
        setResult(result.result);
      } else {
        setResult(response.statusText);
      }
    } catch (error) {
      setError('error');
    }
  };

  const [image_id, setImage_id] = useState(0)
  const saveReport = async () => {

    const image_name = selectedImage.name.split('__')[1]
    const dicom_id = selectedImage.name.split('__')[0]



   
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dicom-images/?name=${image_name}`,
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );
          
      const imageId = response.data[0].id;
      setImage_id(imageId)
          
    } catch (error) {
      setShowD(true);
    }

    if(image_id !== 0){
      if (result!=='Loading...' || result!=='') {
    
      obj.report = result;
      obj.image_id = image_id;
      obj.image_captioning_model_id = 4;
      try {
        await axios.post('http://127.0.0.1:8000/api/reports/', obj, {
          headers: { Authorization: `Bearer ${access}` },
        });
        setShowS(true);
      } catch (error) {
        setShowD(true);
      }
    }
    else {
      setShowD(true);
    }
    }
  };
  useEffect(() => {
  }, [image_id]);


  return (
    <div>

      <h1> {title} </h1>

      <Container style={{ 
        marginTop: "20px", textAlign: "center", display: "grid",
        height: "100vh",
        justifyContent: "center",
        marginBottom: "25px",
        alignItems: "center"}}>

        {!selectedImage && (
          <Row>
            <Col>
              <label id='button-icon'><i style={{padding:'5px'}}> Image 1 </i></label>
              <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
            </Col>
          </Row>
        )}
        {selectedImage && (
          <>
          <Row>
            <div style={{margin: 'auto', width: '25%', padding: '10px'}}>
              <Toast onClose={() => setShowS(false)} show={showS} delay={3000} autohide bg={'success'}>
                <Toast.Body>Report added successfully</Toast.Body>
              </Toast>

              <Toast onClose={() => setShowD(false)} show={showD} delay={3000} autohide bg={'danger'}>
                <Toast.Body>Something went wrong! Please check if the image belongs to the dataset</Toast.Body>
              </Toast>
            </div>
          </Row>
          <img src={URL.createObjectURL(selectedImage)} alt='X-Ray' style={{maxHeight:'500px',}}/>
          <Row style={{ marginTop: "20px" }}>
            <Col> 
            <Button
              color="primary"
              className="float-right"
              onClick={handleImageUpload}
              style={{ width: "200px" }}
              >
              Generate Report
            </Button>
            {error && <p>{error}</p>}
            </Col>
          </Row>
          <Row> 
            <Col>
              {result==='Loading...' ?  <Spinner animation="border" variant="secondary" /> : <p>{result}</p>}
            </Col>
          </Row>
          </> 
        )}

        <Row>
          
          <div style={{ marginTop: "20px" }}>
          {result==='Loading...' || result==='' ? 
            <Button color='success' disabled>Save</Button>:
            <Button color='success' onClick={saveReport}>Save</Button>}
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

export default ImageUpload;
