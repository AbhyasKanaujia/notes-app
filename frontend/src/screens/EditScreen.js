import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Container, Loader } from "semantic-ui-react";
import ErrorView from "../components/ErrorView";
import { useNavigate } from "react-router-dom";

const EditScreen = () => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [changed, setChanged] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [lineCount, setLineCount] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    note && setLineCount(note.content.split("\n").length);
  }, [note]);

  const updateNote = async () => {
    try {
      setUpdating(true);
      await axios.put(`/api/notes/${id}`, note).then(() => {
        setUpdating(false);
        setChanged(false);
        navigate("/");
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  const getErrorView = () => {
    return <ErrorView message={error.message} />;
  };

  const getEditor = () => {
    if (note) {
      return (
        <Container text>
          <Form>
            <Form.Input
              label="Title"
              placeholder="Title"
              value={note.title}
              onChange={(e) => {
                setChanged(true);
                setNote({ ...note, title: e.target.value });
              }}
            />
            <Form.TextArea
              rows={lineCount}
              label="Note"
              placeholder="Enter your note here..."
              value={note.content}
              onChange={(e) => {
                setChanged(true);
                setNote({ ...note, content: e.target.value });
              }}
            />
            <Form.Button
              loading={updating}
              primary={changed}
              onClick={() => updateNote()}
              fluid
            >
              Save Changes
            </Form.Button>
          </Form>
        </Container>
      );
    } else {
      return (
        <Container>
          <Loader active />
        </Container>
      );
    }
  };

  return <>{error ? getErrorView() : getEditor()}</>;
};

export default EditScreen;
