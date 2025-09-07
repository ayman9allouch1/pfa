import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import NewDicomFileModal from "./NewDicomFileModal";
import ConfirmRemovalModalDicomFile from "./ConfirmRemovalModalDicomFile";
import { Table } from "reactstrap";


class DicomFileList extends Component {

  render() {

    const dicom_files = this.props.dicom_files;
    const pk = this.props.pk;
    const access = this.props.access;

    return (
      <Container className="py-2 h-100">
       
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image URL</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!dicom_files || dicom_files.length <= 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  No data
                </td>
              </tr>
              ) : (
              dicom_files 
              .map(dicom_file => (
                <tr key={dicom_file.id} >
                  <td>{dicom_file.title}</td>
                  <td>{dicom_file.description}</td>
                  <td>{dicom_file.image_url}</td>
                  <td align="center"> 
                    <NewDicomFileModal
                      create={false}
                      dicom_file={dicom_file}
                      resetState={this.props.resetState}
                      pk={pk}
                      access={access}
                    />
                      
                    <ConfirmRemovalModalDicomFile
                      pk={dicom_file.id}
                      resetState={this.props.resetState}
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

export default DicomFileList;