import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";

class RecipesNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.handleLogout();

    if (window.location.hash !== "#/") {
      this.setState({ redirectToHome: true });
    }
  }

  render() {
    const { activeUser } = this.props;
    const { redirectToHome } = this.state;

    if (redirectToHome) {
      return <Redirect to="/" />;
    }

    const linkSignup = !activeUser ? (
      <Nav.Link href="#/signup">Signup</Nav.Link>
    ) : null;
    const linkLogin = !activeUser ? (
      <Nav.Link href="#/login">Login</Nav.Link>
    ) : null;
    const linkLogout = activeUser ? (
      <Nav.Link onClick={this.logout}>Logout</Nav.Link>
    ) : null;

    return (
      <Navbar bg="primary" variant="dark" sticky="top" expand="lg">
        <Navbar.Brand href="#/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {" Chef BEN"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#/recipes">Recipes</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link disabled={!activeUser} href="#/dinner">
              Dinner
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link disabled={!activeUser} href="#/shopping">
              Shopping
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {linkSignup}
            {linkLogin}
            {linkLogout}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default RecipesNavbar;
