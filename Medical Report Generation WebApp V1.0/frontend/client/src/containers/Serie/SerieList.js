import React, { Component } from "react";
import { Container, Col } from 'react-bootstrap';
import NewSerieModal from "./NewSerieModal";
import ConfirmRemovalModalSerie from "./ConfirmRemovalModalSerie";
import { Table } from "reactstrap";
import DicomFile from "containers/DicomFile/DicomFlie";
import Card from 'react-bootstrap/Card';


class SerieList extends Component {

  state = {
    date: null,
    time: null
  };

  render() {

    const series = this.props.series;
    const pk = this.props.pk;
    const access = this.props.access;


    return (
      <>
      {!series || series.length <= 0 ? (
        null
      ) : (
      <Container className="py-2 h-100">
         
        <Card bg='light'>
          <Card.Body className="My_nested_tables">
            <Col>
            <Table>
              <thead>
                <tr>
                  <th>Modality</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Description</th>
                  <th>Dicom Images</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {series 
                .map(serie => (
                  <tr key={serie.id} >
                    <td>{serie.modality}</td>
                    <td>{serie.date.slice(0, 10)}</td>
                    <td>{serie.date.slice(11, -1)}</td>
                    <td>{serie.description}</td>
                    <td align="center">
                      <DicomFile
                        pk={serie.id}
                        access={access}
                      />
                    </td>
                    <td align="center"> 
                      <NewSerieModal
                        create={false}
                        serie={serie}
                        resetState={this.props.resetState}
                        pk={pk}
                        access={access}
                      />
                      
                      <ConfirmRemovalModalSerie
                        pk={serie.id}
                        resetState={this.props.resetState}
                        access={access}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </Col>
          </Card.Body>
        </Card>
      </Container>
      )}
      </>
    );
  }
}

export default SerieList;