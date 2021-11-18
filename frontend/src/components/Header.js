import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container style={{ margin: "1rem" }}>
      <Menu secondary>
        <Menu.Item as={Link} to="/" name="notes" />
        <Menu.Item as={Link} to="/create" name="create" />
        <Menu.Menu position="right">
          <Menu.Item icon="search" />
          <Menu.Item name="Login" />
          <Menu.Item name="Sign Up" />
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Header;
