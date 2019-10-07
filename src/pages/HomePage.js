import React from 'react'
import {Jumbotron, Button, Container} from 'react-bootstrap'
import RecipesNavbar from '../components/RecipesNavbar';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { activeUser, handleLogout } = this.props;

        return (
            <div>
                <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout}/>
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">Chef BEN's Recipe Book App</h1>
                        <h4 className="display-7">Master your recipes</h4>
                        <p>
                            You are now browsing as a Guest, You can <Button variant="primary" href="#/login">Login</Button>
                        </p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default HomePage;