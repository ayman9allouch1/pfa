import { useEffect, useRef, useState } from 'react';
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';
import SelectorPack from '@recogito/annotorious-selector-pack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVectorSquare, faDrawPolygon, faCrosshairs, faDownload, faUndo, faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons'
import "../../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Toast from 'react-bootstrap/Toast';


let obj = [];
let obj1 = [];
let obj2 = [];
let obj3 = [];
let resetClick;


function Annotate(props) {

  const Rectangle = <FontAwesomeIcon icon={faVectorSquare} />
  const Polygon = <FontAwesomeIcon icon={faDrawPolygon} />
  const Download = <FontAwesomeIcon icon={faDownload} />
  const RESET = <FontAwesomeIcon icon={faUndo} />
  const ShowEye = <FontAwesomeIcon icon={faEye} />
  const HideEye = <FontAwesomeIcon icon={faEyeSlash} />
  const Ellipse = <FontAwesomeIcon icon={faCrosshairs} />
  const Save = <FontAwesomeIcon icon={faSave} />


  const [showS, setShowS] = useState(false);
  const [showD, setShowD] = useState(false);

  const [isShownAnno, setIsShownAnno] = useState(true);  

  // eslint-disable-next-line
  const [xyz, setXyz] = useState([]);

  const [selected, setSelected] = useState("btn1")

  const changeColor = (btn) => {
    setSelected(btn);
  };

  const [image_id, setImage_id] = useState(0)


  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(obj2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "annotations.json";
    link.click();
  };


  const saveAnnotations = async () => {

    const image_name = props.image.split('__')[1]
    const dicom_id = props.image.split('__')[0]

    for (let i in props.images) {
      
      if (props.images[i].url_name === image_name) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/dicom-images/?name=${props.images[i].url_name}`,
            {
              headers: { Authorization: `Bearer ${props.access}` },
            }
          );
            const imageId = response.data[0].id;
            setImage_id(imageId)
        } catch (error) {
          setShowD(true);
        }
      }
    }

    if(image_id !== 0){
    
    for (let obj of obj3) {
      obj.image_id = image_id;
      try {
        await axios.post('http://127.0.0.1:8000/api/annotations/', obj, {
          headers: { Authorization: `Bearer ${props.access}` },
        });
        setShowS(true);
      } catch (error) {
        setShowD(true);
      }
    }

    }
  };

  const imgEl = useRef();
  
  const [ anno, setAnno ] = useState();

  const [ tool, setTool ] = useState('rect');

  
  useEffect(() => {

    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        crosshair: false
        , widgets: [
            'TAG', 'COMMENT'
          ]
      });


      SelectorPack(annotorious);

      annotorious.on('createAnnotation', annotation => {

        const annotations = annotorious.getAnnotations(); 

        let ob = [];
        let ob31T;
        let ob31C;
        let ob32T = "";
        let ob32C = "";


        for (let o=0; o < annotation.body.length; o++) {
          ob.push({purpose:annotation.body[o].purpose, value:annotation.body[o].value})


          if (annotation.body[o].purpose === "tagging") {
            ob31T = "tagging"
            ob32T += annotation.body[o].value + ", "
          }
          if (annotation.body[o].purpose === "commenting") {
            ob31C = "commenting"
            ob32C += annotation.body[o].value + ", "
          }
          
        }

        if (annotation.target.selector.type === 'FragmentSelector') {
          let temp = {id:annotation.id, type:annotation.target.selector.type, value:(annotation.target.selector.value).slice(11,)}
          obj.push(temp)

          obj1 = annotations;

          setXyz(obj1);

          let temp2 = {
            file_name:props.filedata.name, 
            file_size:props.filedata.size,
            region_count:annotations.length,
            region_id:annotation.id,
            region_shape_attributes:{tool_name:annotation.target.selector.type, value:(annotation.target.selector.value).slice(11,)},
            region_attributes:ob
          }
          obj2.push(temp2)

          let temp3 = {
            file_name:props.filedata.name, 
            file_size:props.filedata.size,
            region_count:annotations.length,
            region_id:annotation.id,
            region_shape_attributes_tool_name:annotation.target.selector.type,
            region_shape_attributes_value:annotation.target.selector.value.slice(11,),
            region_attributes_tag:ob31T,
            region_attributes_tag_value:ob32T,
            region_attributes_comment:ob31C,
            region_attributes_comment_value:ob32C
          }
          obj3.push(temp3)
        }
        else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='p') {
          let temp = {id:annotation.id, type:annotation.target.selector.type, value:(annotation.target.selector.value).slice(22,-18)}
          obj.push(temp) 

          obj1 = annotations;

          setXyz(obj1);

          let temp2 = {
            file_name:props.filedata.name, 
            file_size:props.filedata.size, 
            region_count:annotations.length,
            region_id:annotation.id,
            region_shape_attributes:{tool_name:annotation.target.selector.type, value:(annotation.target.selector.value).slice(22,-18)},
            region_attributes:ob
          }
          obj2.push(temp2)

          let temp3 = {
            file_name:props.filedata.name, 
            file_size:props.filedata.size,
            region_count:annotations.length,
            region_id:annotation.id,
            region_shape_attributes_tool_name:annotation.target.selector.type,
            region_shape_attributes_value:annotation.target.selector.value.slice(22,-18),
            region_attributes_tag:ob31T,
            region_attributes_tag_value:ob32T,
            region_attributes_comment:ob31C,
            region_attributes_comment_value:ob32C
          }
          obj3.push(temp3)
        }
        else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='e') {
          let temp = {id:annotation.id, type:annotation.target.selector.type, value:(annotation.target.selector.value).slice(13,-17)}
          obj.push(temp) 

          obj1 = annotations;

          setXyz(obj1);

          let temp2 = {
            file_name:props.filedata.name, 
            file_size:props.filedata.size, 
            region_count:annotations.length,
            region_id:annotation.id,
            region_shape_attributes:{tool_name:annotation.target.selector.type, value:(annotation.target.selector.value).slice(13,-17)},
            region_attributes:ob
          }
          obj2.push(temp2)

          let temp3 = {
            file_name:props.filedata.name, 
            file_size:props.filedata.size,
            region_count:annotations.length,
            region_id:annotation.id,
            region_shape_attributes_tool_name:annotation.target.selector.type,
            region_shape_attributes_value:annotation.target.selector.value.slice(13,-17),
            region_attributes_tag:ob31T,
            region_attributes_tag_value:ob32T,
            region_attributes_comment:ob31C,
            region_attributes_comment_value:ob32C
          }
          obj3.push(temp3)
          
        }

        for (let c in obj2) {
          obj2[c].region_count=annotations.length;
        }
        for (let c in obj3) {
          obj3[c].region_count=annotations.length;
        }

      });

      annotorious.on('updateAnnotation', (annotation, previous) => {
        
        const annotations = annotorious.getAnnotations();

        const index = obj.findIndex(i => {
          return i.id === annotation.id;
        });
        if (annotation.target.selector.type === 'FragmentSelector') {
          obj[index].value = (annotation.target.selector.value).slice(11,);

          obj1 = annotations;

          setXyz(obj1);
        }
        else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='p'){
          obj[index].value = (annotation.target.selector.value).slice(22,-18);

          obj1 = annotations;

          setXyz(obj1);
        }
        else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='e'){
          obj[index].value = (annotation.target.selector.value).slice(13,-17);

          obj1 = annotations;

          setXyz(obj1);
        }

        let ob = [];
        let ob31T;
        let ob31C;
        let ob32T = "";
        let ob32C = "";


        for (let o=0; o < annotation.body.length; o++) {
          ob.push({purpose:annotation.body[o].purpose, value:annotation.body[o].value})

          if (annotation.body[o].purpose === "tagging") {
            ob31T = "tagging"
            ob32T += annotation.body[o].value + ", "
          }
          if (annotation.body[o].purpose === "commenting" || annotation.body[o].purpose === "replying") {
            ob31C = "commenting"
            ob32C += annotation.body[o].value + ", "
          }
        }

        const index2 = obj2.findIndex(i2 => {
          return i2.region_id === annotation.id;
        });
        if (annotation.target.selector.type === 'FragmentSelector') {
          obj2[index2].region_shape_attributes.value = (annotation.target.selector.value).slice(11,);
          obj2[index2].region_attributes = ob;
        }
        else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='p'){
          obj2[index2].region_shape_attributes.value = (annotation.target.selector.value).slice(22,-18);
          obj2[index2].region_attributes = ob;
        }
        else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='e'){
          obj2[index2].region_shape_attributes.value = (annotation.target.selector.value).slice(13,-17);
          obj2[index2].region_attributes = ob;
        }

        for (let c in obj2) {
          obj2[c].region_count=annotations.length;
        }


        const index3 = obj3.findIndex(i3 => {
            return i3.region_id === annotation.id;
          });
          if (annotation.target.selector.type === 'FragmentSelector') {
            obj3[index3].region_shape_attributes_value = (annotation.target.selector.value).slice(11,);
            obj3[index3].region_attributes_tag = ob31T;
            obj3[index3].region_attributes_tag_value = ob32T;
            obj3[index3].region_attributes_comment = ob31C;
            obj3[index3].region_attributes_comment_value = ob32C;
          }
          else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='p'){
            obj3[index3].region_shape_attributes_value = (annotation.target.selector.value).slice(22,-18);
            obj3[index3].region_attributes_tag = ob31T;
            obj3[index3].region_attributes_tag_value = ob32T;
            obj3[index3].region_attributes_comment = ob31C;
            obj3[index3].region_attributes_comment_value = ob32C;
          }
          else if (annotation.target.selector.type === 'SvgSelector' && annotation.target.selector.value.slice(6,7) ==='e'){
            obj3[index3].region_shape_attributes_value = (annotation.target.selector.value).slice(13,-17);
            obj3[index3].region_attributes_tag = ob31T;
            obj3[index3].region_attributes_tag_value = ob32T;
            obj3[index3].region_attributes_comment = ob31C;
            obj3[index3].region_attributes_comment_value = ob32C;
          }
  
          for (let c in obj3) {
            obj3[c].region_count=annotations.length;
          }

      });

      annotorious.on('deleteAnnotation', annotation => {

        const annotations = annotorious.getAnnotations();

        const indexOfObject = obj.findIndex(object => {
          return object.id === annotation.id;
        });
        
        obj = [
          ...obj.slice(0, indexOfObject),
          ...obj.slice(indexOfObject + 1),
        ];

        obj1 = annotations;

        setXyz(obj1);

        const indexOfObject2 = obj2.findIndex(object2 => {
          return object2.region_id === annotation.id;
        });

        const indexOfObject3 = obj3.findIndex(object3 => {
            return object3.region_id === annotation.id;
          });

        obj2 = [
          ...obj2.slice(0, indexOfObject2),
          ...obj2.slice(indexOfObject2 + 1),
        ];

        obj3 = [
          ...obj3.slice(0, indexOfObject3),
          ...obj3.slice(indexOfObject3 + 1),
        ];

        for (let c in obj2) {
          obj2[c].region_count=annotations.length;
        }

        for (let c in obj3) {
          obj3[c].region_count=annotations.length;
        }
      });
    }

    setAnno(annotorious);

    return () => annotorious.destroy();
  }, [props.filedata.name,props.filedata.size]);

  const RectTool = () => {
    if (tool === 'polygon' || tool === 'ellipse') {
      setTool('rect');
      anno.setDrawingTool('rect');
      changeColor("btn1");
    }
  }
  const PolygonTool = () => {
    if (tool === 'rect' || tool === 'ellipse') {
      setTool('polygon');
      anno.setDrawingTool('polygon');
      changeColor("btn2");
    }
  }
  const CircleTool = () => {
    if (tool === 'rect' || tool === 'polygon') {
      setTool('ellipse');
      anno.setDrawingTool('ellipse');
      changeColor("btn3");
    }
  }

  const exportRef = useRef(); 

  const handleHiddenAnno = () => {
    if (isShownAnno === true) {
      setIsShownAnno(false);
      anno.setVisible(false);
    }
    else {
      setIsShownAnno(true);
      anno.setVisible(true)
    }
  };

  resetClick = () => {
    if(window.confirm("You will lose all annotations! Do you want to proceed?")) {
    obj.splice(0,obj.length)
    obj1.splice(0,obj1.length)
    obj2.splice(0,obj2.length)
    obj3.splice(0,obj3.length)

    return anno.clearAnnotations();}
  };

  return (
    <Container>
      <div className="parent">
        <div className="container mt-5">
        <Row>
          <div style={{margin: 'auto', width: '25%', padding: '10px'}}>
            <Toast onClose={() => setShowS(false)} show={showS} delay={3000} autohide bg={'success'}>
              <Toast.Body>Annotation added successfully</Toast.Body>
            </Toast>

            <Toast onClose={() => setShowD(false)} show={showD} delay={3000} autohide bg={'danger'}>
              <Toast.Body>Something went wrong! Please check if the image belongs to the dataset</Toast.Body>
            </Toast>
          </div>
        </Row>
        <Row  xs="12">
            
            <br/>
            <br/>
            <br/>
            <br/>
            <div className='BtnGroup' role='group' style={{padding:'0px'}}>
            <button title='Rectangle'
                className={
                selected === "btn1" ? "selectedA" : "notSelectedA"
                }
                onClick={RectTool}>
                <i style={{padding:'5px'}}>{Rectangle}</i>   
            </button>

            <button title='Polygon'
                className={
                selected === "btn2" ? "selectedA" : "notSelectedA"
                }
                onClick={PolygonTool}>
                <i style={{padding:'5px'}}>{Polygon}</i>   
            </button>

            <button title='Ellipse'
                className={
                selected === "btn3" ? "selectedA" : "notSelectedA"
                }
                onClick={CircleTool}>
                <i style={{padding:'5px'}}>{Ellipse}</i>  
            </button>
            
            &nbsp;&nbsp;

            <button id='toggle-btnA' title={isShownAnno === true ? 'Hide Annotations' : 'Show Annotations'} onClick={handleHiddenAnno} >
            { isShownAnno === true ? 
                <i style={{padding:'5px'}}>{ShowEye}</i> 
                : <i style={{padding:'5px'}}>{HideEye}</i> 
            }
            </button>
            
            <button id='toggle-btnA' title='Download Annotations (JSON)' type="button" onClick={exportData}>
            <i style={{padding:'5px'}}>{Download}</i>
            </button>

            <button id='toggle-btnA' title='Save Annotations' type="button" onClick={saveAnnotations}>
            <i style={{padding:'5px'}}>{Save}</i>
            </button>

            <button id='toggle-btnA' title='Reset' onClick={resetClick}>
            <i style={{padding:'5px'}}>{RESET}</i>
            </button>
            </div>
        </Row>
    
        <Row>

          <Col>
            
            <div className='image-wrapper' ref={exportRef} style={{position: 'relative', display: 'inline-block', height: `450px`}}>
              <img 
                ref={imgEl} 
                src={props.dicomimage} 
                alt="Annotation" 
                id='my-image'
                style={{top:'10px', 
                  left:'10px', 
                  padding:'0px',
                  height:'auto', 
                  width:'auto', 
                  display: 'block',
                  maxWidth:'1000px',
                  maxHeight:'1000px',
                  verticalAlign: 'bottom'  
                }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
          <br/>
          <br/>
          <br/>
          <h1> Annotations: </h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TYPE</th>
                        <th>VALUE</th>
                    </tr>
                </thead>
                <tbody>
                    {obj.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.type}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <br/>
            <br/>
          </Col> 
        </Row>
        </div>
      </div>
      
    </Container>
  );
}

export default Annotate;