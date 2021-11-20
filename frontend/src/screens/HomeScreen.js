import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Loader,
  Message,
} from "semantic-ui-react";
import Note from "../components/Note";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState(null);

  const unListNote = (id) => {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      setNotes(notes.filter((note) => note._id !== id))
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/notes");
      setNotes(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getErrorView = () => {
    return (
      <Container text>
        <Message
          attached="top"
          error
          header="On no! Something went wrong."
          list={[`${error.message}`]}
        />
        <Button as={Link} to="/" attached="bottom" basic>
          Try Again
        </Button>
      </Container>
    );
  };
  const getNotesView = () => {
    if (notes) {
      return (
        <Container>
          <Card.Group centered>
            {notes.map((note) => (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                unListNote={unListNote}
              />
            ))}
          </Card.Group>
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

  const emptyView = () => {
    return (
      <Grid verticalAlign="top">
        <Grid.Column>
          <Container>
            <Header as="h1" content="Nothing to show yet" />
            <p>Let's create a new note!</p>
            <Button as={Link} to={"/create"} content="Create Note" primary />
          </Container>
        </Grid.Column>
      </Grid>
    );
  };

  return (
    <>
      {error
        ? getErrorView()
        : notes?.length === 0
        ? emptyView()
        : getNotesView()}
    </>
  );
};

export default HomeScreen;
