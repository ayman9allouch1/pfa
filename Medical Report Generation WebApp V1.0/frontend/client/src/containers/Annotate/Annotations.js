import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';


function Annotations (props) {

    return (
        <div>
            <br/>
            <h1> Annotations: </h1>
            <br/>
            <Row xs={1} md={3} className="g-4">
              
                {props.data.map((item, index) => (
                    <Col key={index}>   
                    <Card id='card' key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title> ID: {item.id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Type: {item.type}
                            {item.type === 'FragmentSelector' ?
                            <p> x y h w</p>
                            :<p> (x, y)</p>
                            }
                        </Card.Subtitle>
                        <Card.Text>
                        {item.type === 'FragmentSelector' ?
                        item.value.split(",").map((it,ind) => (
                        
                        <Badge key={ind} bg="secondary" style={{margin:'2px'}}>{it}</Badge> ))
                        : 
                        item.value.split(" ").map((it,ind) => (
                            <Badge key={ind} bg="secondary" style={{margin:'2px'}}>{it}</Badge> ))
                        }
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>
                ))}

            </Row>
        </div>
    );
}

export default Annotations;