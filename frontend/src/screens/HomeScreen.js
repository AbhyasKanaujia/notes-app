import React, { useState, useEffect } from "react";
import { Button, Card, Container, Loader, Message } from "semantic-ui-react";
import Note from "../components/Note";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState(null);

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
  const getNotesList = () => {
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
      <Container text>
        <Message
          header="Nothing to show yet"
          content="Let's create a new note!"
          attached="top"
        />
        <Button
          as={Link}
          to={"/create"}
          content="Create Note"
          primary
          attached="bottom"
        />
      </Container>
    );
  };
  return (
    <>
      {error
        ? getErrorView()
        : notes?.length === 0
        ? emptyView()
        : getNotesList()}
    </>
  );
};

export default HomeScreen;
