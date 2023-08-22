import React, { useRef, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(true);
  useEffect(() => {
    // Check if a user is logged in
    if (window.accountId !== "") {
      changeDisable(false); // Enable submit button
    }
  }, []);
  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
    <Container
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        paddingBottom: "10px",
        paddingTop: "10px",
        backgroundColor: "#212529",
        borderRadius: "5px",
        boxShadow: "10px 10px 20px #0d0f10,-20px -20px 60px #353b42",
      }}
    >
      <p
        style={{ color:"#D2BD40",fontSize:"1.5rem",textAlign:"center"
        }}
      >
        *Login To Add A New Poll
      </p>
      <Form style={{ color: "white", padding: "10px 0px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Candidiate 1 Name/Title</Form.Label>
          <Form.Control
            ref={candidateName1}
            placeholder="Enter Candidate 1 Name/Title"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidate 1 Image URL</Form.Label>
          <Form.Control
            ref={candidateName1URL}
            placeholder="Enter Image URL for Candidate 1"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidiate 2 Name/Title</Form.Label>
          <Form.Control
            ref={candidateName2}
            placeholder="Enter Candidate 2 Name/Title"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Candidate 2 Image URL</Form.Label>
          <Form.Control
            ref={candidateName2URL}
            placeholder="Enter Image URL for Candidate 2"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prompt</Form.Label>
          <Form.Control ref={promptRef} placeholder="Add Prompt"></Form.Control>
          <Form.Text id="promptInfoText" muted>
            Add a meaningful prompt for the poll. The prompt will be displayed
            on the poll list page and will help identify the poll among others.
          </Form.Text>
        </Form.Group>
      </Form>

      <Button
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant="primary"
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewPoll;
