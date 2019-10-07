import React from 'react'
import { Jumbotron, Button, Container } from 'react-bootstrap'
import RecipesNavbar from '../components/RecipesNavbar';

class ShoppingListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { activeUser, handleLogout } = this.props;

        return (
            <div>
                <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">Your Shopping List For  Dinner</h1>
                        <p>
                            You are now browsing as a Guest, You can 
                            <Button variant="primary" href="#/login">Login</Button>
                        </p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default ShoppingListPage;

