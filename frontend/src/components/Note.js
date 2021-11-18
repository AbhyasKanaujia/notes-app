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
      <Button as={Link} to={`/edit/${id}`} icon="pencil" size="tiny" basic />
      <Transition visible={!deleted} unmountOnHide>
        <Popup
          trigger={<Button icon="trash" basic />}
          on="click"
          content={
            <Button
              size="tiny"
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
        <Card>
          <Card.Content>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              trigger={<Card.Header>{title}</Card.Header>}
              header={title}
              content={content}
              actions={[
                { content: "Edit" },
                {
                  content: "Delete",
                  negative: true,
                  onClick: () => deleteNote(),
                },
              ]}
            />
            <Card.Content>{content}</Card.Content>
            <Card.Content>{extra}</Card.Content>
          </Card.Content>
        </Card>
      </Transition>
    );
  };
  return <>{error ? <ErrorView message={error.message} /> : getNoteCard()}</>;
};

export default Note;
