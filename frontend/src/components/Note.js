import React, { useState } from "react";
import { Button, Card, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorView from "./ErrorView";

const Note = ({ id, title, content }) => {
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const deleteNote = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/notes/${id}`).then(() => {
        setDeleted(true);
        setDeleting(false);
      });
    } catch (error) {
      setError(error);
    }
  };

  const extra = (
    <>
      <Button.Group floated="right">
        <Button as={Link} to={`/edit/${id}`} icon="pencil" basic />
        <Popup
          trigger={<Button icon="trash" basic />}
          on="click"
          content={
            <Button
              loading={deleting}
              content="Delete"
              negative
              onClick={() => deleteNote()}
            />
          }
        />
      </Button.Group>
    </>
  );

  const getNoteCard = () => {
    return <Card header={title} description={content} extra={extra} />;
  };
  return (
    <>
      {error ? (
        <ErrorView message={error.message} />
      ) : !deleted ? (
        getNoteCard()
      ) : (
        <></>
      )}
    </>
  );
};

export default Note;
