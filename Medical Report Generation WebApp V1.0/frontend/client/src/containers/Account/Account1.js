import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import AccountList from "./AccountList";
import NewAccountModal from "./NewAccountModal";
import axios from "axios";
import { useOutletContext } from "react-router-dom"


const Account1 = () => {

  const access = useOutletContext()

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    resetState();
  }, []);

  const getAccounts = () => {
    axios
      .get('http://127.0.0.1:8000/auth/users/', {
        headers: { Authorization: `Bearer ${access}` }
      })
      .then((res) => setAccounts(res.data));
  };

  const resetState = () => {
    getAccounts();
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1> Accounts </h1>
        <Row>
          <Col>
            <AccountList
              accounts={accounts}
              resetState={resetState}
              access={access}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewAccountModal
              create={true}
              resetState={resetState}
              access={access}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Account1;
