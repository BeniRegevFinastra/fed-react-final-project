import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class MyRecipesNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.handleLogout();

        if (window.location.hash != "#/") {
            this.setState({redirectToHome: true})
        }
    }

    render() {
        const { activeUser } = this.props;
        const { redirectToHome } = this.state;

        if (redirectToHome) { return <Redirect to="/"/> }

        const linkSignup = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const linkLogin = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const linkLogout = activeUser ? <Nav.Link onClick={this.logout}>Logout</Nav.Link> : null;


        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/">Chef BEN</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#/recipes">Recipes</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link href="#/dinner">Dinner</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link href="#/shopping">Shopping</Nav.Link>
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

export default MyRecipesNavbar;