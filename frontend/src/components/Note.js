import React, { useState } from "react";
import { Button, Card, Modal, Popup, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorView from "./ErrorView";

const Note = ({ id, title, content }) => {
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

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
    <Button.Group floated="right">
      <Button as={Link} to={`/edit/${id}`} icon="pencil" basic />
      <Transition visible={!deleted} unmountOnHide>
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
      </Transition>
    </Button.Group>
  );

  const getNoteCard = () => {
    return (
      <Transition visible={!deleted} unmountOnHide>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          trigger={<Card header={title} description={content} extra={extra} />}
          header={title}
          content={content}
          actions={[
            { content: "Edit" },
            { content: "Delete", negative: true, onClick: () => deleteNote() },
          ]}
        />
      </Transition>
    );
  };
  return <>{error ? <ErrorView message={error.message} /> : getNoteCard()}</>;
};

export default Note;
