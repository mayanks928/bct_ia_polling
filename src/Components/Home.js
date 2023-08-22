import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import "../global.css"

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
    <Container className="mainBody">
      <Table variant="dark" style={{ margin: "2vh 0vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Poll List</th>
            <th>Go to Poll</th>
          </tr>
        </thead>
        <tbody style={{fontSize:"1.3rem"}}>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  {" "}
                  <Button style={{backgroundColor:"#CBB33A",color:"black",borderColor:"green"}} onClick={() => props.changeCandidates(el)}>
                    Go to Poll
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
