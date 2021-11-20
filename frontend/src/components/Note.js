import React, { useState } from "react";
import { Button, Card, Modal, Popup, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorView from "./ErrorView";
import ReactMarkdown from "react-markdown";

const Note = ({ id, title, content, unListNote }) => {
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
        unListNote(id);
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
            <Transition visible={!deleted} unmountOnHide>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={
                  <Card.Header style={{ cursor: "pointer" }}>
                    {title}
                  </Card.Header>
                }
                header={title}
                content={<ReactMarkdown>{content}</ReactMarkdown>}
                actions={[
                  { icon: "pencil", basic: true },
                  <Transition visible={!deleted} unmountOnHide>
                    <Popup
                      trigger={<Button icon="trash" basic negative />}
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
                  </Transition>,
                ]}
              />
            </Transition>
            <Card.Content>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Card.Content>
            <Card.Content>{extra}</Card.Content>
          </Card.Content>
        </Card>
      </Transition>
    );
  };
  return <>{error ? <ErrorView message={error.message} /> : getNoteCard()}</>;
};

export default Note;
