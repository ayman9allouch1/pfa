import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import AnnotateA from "./AnnotateA";
import { useOutletContext } from "react-router-dom"
import axios from "axios";
import { Navigate } from 'react-router-dom';


const UploadAndDisplayImageA = () => {

  const [title, setTitle] = useState('Upload and Display Image for Annotation')

  const [selectedImage, setSelectedImage] = useState(null);

  const Trash = <FontAwesomeIcon icon={faTrashAlt} />
  const FileImage = <FontAwesomeIcon icon={faFileImage} />

  const access = useOutletContext()

  function refreshPage() {
    if(window.confirm("You will lose all annotations along with the image! Do you want to proceed?")) {
      setSelectedImage(null);
      window.location.reload(true);
      <Navigate to='/dashboard/annotate' />;
    }
  }

  function handleImageChange(event) {

    const file = event.target.files[0];

    const validExtensions = [".png", ".jpeg", ".jpg"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      
      setSelectedImage(file);
      setTitle('Annotate Image')
    } else {

      alert("Invalid file extension. Please select a PNG image.");
      event.target.value = null;
      setSelectedImage(null);
    }
  };


  const [ImageName, setImageName] = useState('')
  const [Images, setImages] = useState([])

  const getImageId = () => {
    if (ImageName !== '') {
      const dicomId = ImageName.split('__')[0]
      try {
        axios.get(
          `http://localhost:8000/api/dicom-images/?dicom_file=${dicomId}`,
          {
            headers: { Authorization: `Bearer ${access}` },
          }
        )
        .then((response) => {
          setImages(response.data)
        })
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    if (selectedImage) {
      setImageName(selectedImage.name)
      getImageId();
    }
  }, [selectedImage, ImageName]);
  


  return (
    <div className="container mt-5">

      <h1> {title} </h1>

      {selectedImage && (
        <div className='image-wrapper' style={{position: 'relative', display: 'inline-block'}}>        

          <AnnotateA dicomimage= {URL.createObjectURL(selectedImage)} filedata= {selectedImage} access={access} image={ImageName} images={Images}/>

          <button id='toggle-btn' onClick={refreshPage}>
            <i style={{padding:'5px'}}>{Trash}</i>
            Remove
          </button>
          
        </div>
      )}

      <br />
      <br />

      {!selectedImage && (
        <div>

          <label id='button-icon'><i style={{padding:'5px'}}>{FileImage}</i></label>
          <input
            style={{
              border: 'none',
              padding: '16px 32px',
              textDecoration: 'none',
              margin: '4px 2px',
              cursor: 'pointer'
            }}
            type="file"
            accept="image/*"
            name="myImage"
            onChange={handleImageChange}
            required
          />
          <br />
          <br />
          <br />
          <br /> 
       </div>
      )}

    </div>
  );
};

export default UploadAndDisplayImageA;