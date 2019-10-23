import React from "react";
import {
  Jumbotron,
  Container,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import Media from "react-bootstrap/Media";
import RecipesNavbar from "../components/RecipesNavbar";
import jsonRecipes from "../data/recipes";
import { isNullOrUndefined } from "util";

class RecipeDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRecipe: 69,
      allRecipes: jsonRecipes,
      recipe: null
    };
    console.log(
      "constructor(props) -- this.props.match.params.id=" +
        this.props.match.params.id
    );
    console.log(
      "constructor(props) -- this.state.allRecipes=" + this.state.allRecipes
    );
  }

  componentDidMount() {
    //console.log("RecipeDetailsPage.componentDidMount() -- this.props.match.params.id = " + this.props.match.params.id);
    console.log(
      "componentDidMount() -- this.props.match.params.id=" +
        this.props.match.params.id
    );
    console.log(
      "componentDidMount() -- this.state.allRecipes = " + this.state.allRecipes
    );
  }

  render() {
    const { activeUser, handleLogout } = this.props;
    const { allRecipes } = this.state;
    const recipeId = parseInt(this.props.match.params.id);
    console.log("render() -- allRecipes: " + allRecipes);
    console.log(
      "render() -- this.props.match.params.id=" + this.props.match.params.id
    );
    console.log("render() -- recipeId: " + recipeId);

    const recipe = allRecipes.find(r => r.id === recipeId);
    const ingredientsArray = recipe.ingredients
      .sort((a, b) => {
        return a.index - b.index;
      })
      .map(ingredient => (
        <li>
          {ingredient.quantity} {ingredient.units} {ingredient.name}
        </li>
      ));
    const preparationStepsArray = recipe.preparationSteps
      .sort((a, b) => {
        return a.stepNumber - b.stepNumber;
      })
      .map(step => (
        <ListGroupItem>
          {step.stepNumber}. {step.description}
        </ListGroupItem>
      ));

    const styleIngredientsUnorderedList = {
        listStyleType: "none"
    }
    const styleIngredients = {
      textAlign: "left"
      , fontSize: "1.2em"
      , color: "blue"
      , fontWeight: "bold"
    //   , padding: "20px 10px 0 10px"
    };

    const stylePreparation = {
      fontSize: "1.2em",
      color: "blue",
      fontWeight: "bold",
      padding: "20px 10px 10px 10px"
    };
    return (
      <div>
        <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Jumbotron>
          <Container>
            <Button href="#recipes">&lt;&lt; Back to Gallery</Button>
            <h1 className="display-3">Recipe Details: {recipe.name}</h1>
            <Media>
              <img
                height={300}
                className="mr-3"
                src={recipe.img}
                alt="recipe img"
              />
              <Media.Body as="ul" style={styleIngredientsUnorderedList}>
                <div id="ingredients" style={styleIngredients}>
                  Ingredients:
                </div>
                {ingredientsArray}
              </Media.Body>
            </Media>
            <div id="preparation" style={stylePreparation}>
              Preparation:
            </div>
            <ListGroup>{preparationStepsArray}</ListGroup>

            <Button href="#recipes">&lt;&lt; Back to Gallery</Button>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default RecipeDetailsPage;
