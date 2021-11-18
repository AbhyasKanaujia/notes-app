import React from "react";
import { Container, Icon, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted vertical textAlign="center" style={{ marginTop: "1rem" }}>
      <Container text>
        Made with <Icon name="heart" color="red" /> by Abhyas
      </Container>
    </Segment>
  );
};

export default Footer;
