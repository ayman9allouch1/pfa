import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import NewStudyModal from "./NewStudyModal";
import ConfirmRemovalModalStudy from "./ConfirmRemovalModalStudy";
import { Table } from "reactstrap";
import Serie from "containers/Serie/Serie";


class StudyList extends Component {

  state = {
    date: null,
    time: null
  };

  render() {

    const studies = this.props.studies;
    const pk = this.props.pk;
    const access = this.props.access;


    return (
      <Container className="py-2 h-100">
  
        <Table className="My_tables">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th></th>
              <th>Series</th>
            </tr>
          </thead>
          <tbody>
            {!studies || studies.length <= 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  No data
                </td>
              </tr>
            ) : (
              studies 
              .map(study => (
                <tr key={study.id} >
                  <td>{study.study_date.slice(0, 10)}</td>
                  <td>{study.study_date.slice(11, -1)}</td>
                  <td>{study.study_description}</td>
                  <td align="center"> 
                    <NewStudyModal
                      create={false}
                      study={study}
                      resetState={this.props.resetState}
                      pk={pk}
                      access={access}
                    />
                    <ConfirmRemovalModalStudy
                      pk={study.id}
                      resetState={this.props.resetState}
                      access={access}
                    />
                  </td>
                  <td align="center">
                    <Serie 
                      pk={study.id}
                      access={access}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default StudyList;