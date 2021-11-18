import React from "react";
import { Container, Message } from "semantic-ui-react";

const ErrorView = ({ message }) => {
  return (
    <Container text>
      <Message
        attached="top"
        error
        header="On no! Something went wrong."
        list={[`${message}`]}
      />
    </Container>
  );
};

export default ErrorView;
