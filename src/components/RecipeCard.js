import React from "react";
import { Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import style from "./RecipeCard.component.css";

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      navigateToID: null,
      recipeDetails: null
    };
    this.openRecipeDetails = this.openRecipeDetails.bind(this);
    this.addRemoveFromSelectedRecipes = this.addRemoveFromSelectedRecipes.bind(this);
  }

  openRecipeDetails() {
    console.log("openRecipeDetails - RecipeId: " + this.props.recipe.id);
    let { navigateToRecipeId, recipeDetails } = this.state;
    navigateToRecipeId = this.props.recipe.id;
    recipeDetails = this.props.recipe;
    this.setState({ navigateToRecipeId, recipeDetails });
  }

  addRemoveFromSelectedRecipes() {
    console.log("addRemoveFromSelectedRecipes(event)");
    const { recipe } = this.props;
    this.props.selectRecipe(recipe);
  }

  /*
        activeUser={activeUser} 
        addRecipe={this.addRecipe}
        allRecipes={allRecipes} 
        handleLogout={this.handleLogout} 
        recipe={recipe} 
        recipeId={recipeId} 
        userRecipes={activeUserRecipes} 
    */
  render() {
    const { activeUser, recipe, activeUserRecipes } = this.props;

    if (this.state.navigateToRecipeId != null) {
      const { navigateToRecipeId, recipeDetails } = this.state;
      return (
        <Redirect
          to={"/recipes/" + navigateToRecipeId}
          activeUser={activeUser}
          recipe={recipe}
          recipeDetails={recipeDetails}
        />
      );
    } else {
      const selectedRecipe = this.props.selectedRecipes.find(r => r.id === recipe.id);
      const isSelected = selectedRecipe !== undefined;
      const buttonText = (isSelected ? "Remove From" : "Add To") + " Dinner";

      const styleAddRemoveButton = {
        textAlign: "center"
        , fontSize: "1em"
        , fontWeight: "bold"
        , width: "100%"
      };
  
      return (
        <Card className={style.recipeCard}>
          <Card.Img
            className={style.image}
            onClick={this.openRecipeDetails}
            variant="top"
            src={recipe.img}
          />
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Subtitle>{recipe.desc}</Card.Subtitle>
            <Card.Text>Cooking Time: {recipe.duration} min</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button style={styleAddRemoveButton} onClick={this.addRemoveFromSelectedRecipes}>{buttonText}</Button>
          </Card.Footer>
        </Card>
      );
    }
  }
}

export default RecipeCard;
