import React from "react";
import { Jumbotron, Container, Row, Col, Form } from "react-bootstrap";
import { Button} from "reactstrap";
import { Redirect } from 'react-router-dom'
import RecipesNavbar from "../components/RecipesNavbar";
import RecipeCard from "../components/RecipeCard";

class PlannedDinnerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { activeUser, userSelectedRecipes, handleLogout } = this.props;

    if (!activeUser) {
        return <Redirect to="/" />
    }

    const selectedRecipesCards = userSelectedRecipes.map(recipe => (
      <Col key={recipe.id} lg="3" md="6">
        <RecipeCard
          fromPage={"dinner"} 
          activeUser={this.props.activeUser}
          recipe={recipe}
          selectedRecipes={this.props.userSelectedRecipes}
        />
      </Col>
    ));

    return (
      <div>
        <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Jumbotron>
          <Container id="dinner-title">
            <h1 className="display-3">This is what you choose for Dinner</h1>
            <h6>Here you can set quantity of each recipe, to change your selection go to<Button color="link" href="#recipes">Recipes Page.</Button></h6>
          </Container>
        </Jumbotron>
        <Container id="dinner-body">
          <h3>Here are the recipes you selected:</h3>
          <Row>{selectedRecipesCards}</Row>
        </Container>
      </div>
    );
  }
}

export default PlannedDinnerPage;
