import React from 'react'
import { Jumbotron, Container, Button, Row, Col, Table, ListGroup, ListGroupItem } from 'react-bootstrap'
// import { Container, Row, Col, Table, ListGroup, ListGroupItem } from 'reactstrap';
import RecipesNavbar from '../components/RecipesNavbar';

class RecipeDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myRecipe: 69,
            recipe: null,
        }
    }

    componentDidMount() {
        //console.log("RecipeDetailsPage.componentDidMount() -- this.props.match.params.id = " + this.props.match.params.id);
        console.log("this.state.myRecipe = " + this.state.myRecipe);
    }

    render() {
        const { activeUser, handleLogout } = this.props;

        const styleIngredients = {
            fontSize: '1.2em',
            color: 'blue',
            fontWeight: 'bold',
            padding: '20px 10px 0 10px'
        }

        const stylePreparation = {
            fontSize: '1.2em',
            color: 'blue',
            fontWeight: 'bold',
            padding: '20px 10px 10px 10px'
        }
        return (
            <div>
                <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Jumbotron>
                    <Container>
                        <Button href="#recipes">&lt;&lt; Back to Gallery</Button>
                        <h1 className="display-3">Details of Selected Recipe</h1>
                        <Row>
                            <Col xs="12" md="6">
                                <span><b>Name: </b></span>
                                <span>&lt;Recipe Name&gt;</span>
                            </Col>
                            <Col xs="12" md="6">
                                <span><b>Duration: </b></span>
                                <span>999min</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6">
                                <span><b>Type: </b></span>
                                <span>&lt;Recipe Type&gt;</span>
                            </Col>
                            <Col xs="12" md="6">
                                <span><b>Kitchen: </b></span>
                                <span>&lt;The Kitchen it Belongs To&gt;</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="3" sm="2" md="1"><b>Description:</b></Col>
                            <Col xs="auto" sm="auto" md="auto">
                                Recipe Description. Recipe Description. Recipe Description. Recipe Description. Recipe Description.
                                Recipe Description. Recipe Description. Recipe Description. Recipe Description. Recipe Description.
                                Recipe Description. Recipe Description. Recipe Description. Recipe Description. Recipe Description.
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                            <Col xs="1">.col-xs-1</Col>
                        </Row>
                        <Row>
                            <Col xs="2">.col-xs-2</Col>
                            <Col xs="2">.col-xs-2</Col>
                            <Col xs="2">.col-xs-2</Col>
                            <Col xs="2">.col-xs-2</Col>
                            <Col xs="2">.col-xs-2</Col>
                            <Col xs="2">.col-xs-2</Col>
                        </Row>
                        <Row>
                            <Col xs="3">.col-xs-3</Col>
                            <Col xs="3">.col-xs-3</Col>
                            <Col xs="3">.col-xs-3</Col>
                            <Col xs="3">.col-xs-3</Col>
                        </Row>
                        <Row>
                            <Col xs="4">.col-xs-4</Col>
                            <Col xs="4">.col-xs-4</Col>
                            <Col xs="4">.col-xs-4</Col>
                        </Row>
                        <Row>
                            <Col xs="6">.col-xs-6</Col>
                            <Col xs="6">.col-xs-6</Col>
                        </Row>
                        <Row>
                            <Col xs="12">.col</Col>
                        </Row>
                        <div id="ingredients" style={styleIngredients}>Ingredients:</div>
                        <Table>
                            <thead>
                                <tr>
                                    <th xs="3" sm="1">Quantity</th>
                                    <th xs="3" sm="1">units</th>
                                    <th xs="6" sm="4">Ingredient</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td xs="3" sm="1">3</td>
                                    <td xs="3" sm="1">pcs</td>
                                    <td xs="6" sm="4">Onion</td>
                                </tr>
                                <tr>
                                    <td xs="3" sm="1">1</td>
                                    <td xs="3" sm="1">head</td>
                                    <td xs="6" sm="4">Garlic</td>
                                </tr>
                                <tr>
                                    <td xs="3" sm="1">300</td>
                                    <td xs="3" sm="1">gr</td>
                                    <td xs="6" sm="4">Rice</td>
                                </tr>
                                <tr>
                                    <td xs="3" sm="1">1</td>
                                    <td xs="3" sm="1">tblspn</td>
                                    <td xs="6" sm="4">White Sugar</td>
                                </tr>
                                <tr>
                                    <td xs="3" sm="1">2</td>
                                    <td xs="3" sm="1">cups</td>
                                    <td xs="6" sm="4">All Purpose Flour</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div id="preparation" style={stylePreparation}>Preparation:</div>
                        <ListGroup>
                            <ListGroupItem>3 pcs Union</ListGroupItem>
                            <ListGroupItem>1 head Garlic</ListGroupItem>
                            <ListGroupItem>300 gr Rice</ListGroupItem>
                            <ListGroupItem>1 tblspn White Sugar</ListGroupItem>
                            <ListGroupItem>2 cups All Purpose Flour</ListGroupItem>
                        </ListGroup>
                        <Button href="#recipes">&lt;&lt; Back to Gallery</Button>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default RecipeDetailsPage;
