import { useEffect, useRef, useState } from 'react';
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';
import SelectorPack from '@recogito/annotorious-selector-pack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVectorSquare, faDrawPolygon, faCrosshairs, faDownload, faUndo, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import "../../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Annotations from './Annotations';

let obj = [];
let obj1 = [];
let obj2 = [];
let resetClick;


function Annotate(props) {

  const Rectangle = <FontAwesomeIcon icon={faVectorSquare} />
  const Polygon = <FontAwesomeIcon icon={faDrawPolygon} />
  const Download = <FontAwesomeIcon icon={faDownload} />
  const RESET = <FontAwesomeIcon icon={faUndo} />
  const ShowEye = <FontAwesomeIcon icon={faEye} />
  const HideEye = <FontAwesomeIcon icon={faEyeSlash} />
  const Ellipse = <FontAwesomeIcon icon={faCrosshairs} />


  const [isShownAnno, setIsShownAnno] = useState(true);  

  // eslint-disable-next-line
  const [xyz, setXyz] = useState([]);

  const [selected, setSelected] = useState("btn1")

  const changeColor = (btn) => {
    setSelected(btn);
  };

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(obj2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "annotations.json";
    link.click();
  };

  
  const imgEl = useRef();
  
  const [ anno, setAnno ] = useState();

  const [ tool, setTool ] = useState('rect');

  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current
        , widgets: [
            'COMMENT'
          ]
      });

      SelectorPack(annotorious);
      
      annotorious.on('createAnnotation', annotation => {
        
        const annotations = annotorious.getAnnotations(); 

        let ob = [];
        for (let o=0; o < annotation.body.length; o++) {
          ob.push({purpose:annotation.body[o].purpose, value:annotation.body[o].value})
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
        }

        for (let c in obj2) {
          obj2[c].region_count=annotations.length;
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
        for (let o=0; o < annotation.body.length; o++) {
          ob.push({purpose:annotation.body[o].purpose, value:annotation.body[o].value})
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

        obj2 = [
          ...obj2.slice(0, indexOfObject2),
          ...obj2.slice(indexOfObject2 + 1),
        ];

        for (let c in obj2) {
          obj2[c].region_count=annotations.length;
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
    obj2.splice(0,obj2.length)

    return anno.clearAnnotations();}
  };

  return (
    <Container>
      <div className="parent">
        <div className="container mt-5">
    
        <Row>
          <Col xs={1} md={1}>

            <br/>
            <br/>
            <br/>
            <br/>
            <div className='BtnGroup' role='group' style={{padding:'0px'}}>
              <button title='Rectangle'
                className={
                  selected === "btn1" ? "selected" : "notSelected"
                }
                onClick={RectTool}>
                <i style={{padding:'5px'}}>{Rectangle}</i>   
              </button>

              <button title='Polygon'
                className={
                  selected === "btn2" ? "selected" : "notSelected"
                }
                onClick={PolygonTool}>
                <i style={{padding:'5px'}}>{Polygon}</i>   
              </button>

              <button title='Ellipse'
                className={
                  selected === "btn3" ? "selected" : "notSelected"
                }
                onClick={CircleTool}>
                <i style={{padding:'5px'}}>{Ellipse}</i>  
              </button>
            </div>

            <button id='toggle-btn' title={isShownAnno === true ? 'Hide Annotations' : 'Show Annotations'} onClick={handleHiddenAnno} >
              { isShownAnno === true ? 
                <i style={{padding:'5px'}}>{ShowEye}</i> 
                : <i style={{padding:'5px'}}>{HideEye}</i> 
              }
            </button>
             
            <button id='toggle-btn' title='Download Annotations (JSON)' type="button" onClick={exportData}>
              <i style={{padding:'5px'}}>{Download}</i>
            </button>

            <button id='toggle-btn' title='Reset' onClick={resetClick}>
              <i style={{padding:'5px'}}>{RESET}</i>
            </button>
            
          </Col>

          <Col xs={10}>
            
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
        </div>
      </div>

      <Annotations data={obj} /> 

    </Container>
  );
}

export default Annotate;