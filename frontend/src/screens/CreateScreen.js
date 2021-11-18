import React, { useState } from "react";
import axios from "axios";
import ErrorView from "../components/ErrorView";
import { Container, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const CreateScreen = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [changed, setChanged] = useState(false);
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();

  const createNote = async () => {
    try {
      setCreating(true);
      await axios.post("/api/notes", note).then((response) => {
        setCreating(false);
        setChanged(false);
        navigate(`/edit/${response.data._id}`);
      });
    } catch (error) {
      setError(error);
    }
  };

  const getEditor = () => {
    return (
      <Container text>
        <Form>
          <Form.Input
            label="Title"
            placeholder="Title"
            value={note.title}
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
              setChanged(true);
            }}
          />
          <Form.TextArea
            label="Note"
            placeholder="Enter your note here..."
            value={note.content}
            onChange={(e) => {
              setNote({ ...note, content: e.target.value });
              setChanged(true);
            }}
          />
          <Form.Button
            loading={creating}
            primary={changed}
            onClick={() => createNote()}
            fluid
          >
            Create Note
          </Form.Button>
        </Form>
      </Container>
    );
  };

  return <>{error ? <ErrorView message={error.message} /> : getEditor()}</>;
};

export default CreateScreen;
