import React from 'react'
import { Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            navigateToID: null,
            recipeDetails: null,
        }
        this.openRecipeDetails = this.openRecipeDetails.bind(this);
    }

    openRecipeDetails() {
        console.log("openRecipeDetails - RecipeId: " + this.props.recipe.id);
        let {navigateToRecipeId, recipeDetails} = this.state;
        navigateToRecipeId = this.props.recipe.id;
        recipeDetails = this.props.recipe;
        this.setState({navigateToRecipeId, recipeDetails});
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
                <Redirect to={'/recipes/' + navigateToRecipeId} activeUser={activeUser} recipe={recipe} recipeDetails={recipeDetails} />
            );
        } else {
            return (
                <Card className="recipe" >
                    <Card.Img onClick={this.openRecipeDetails} variant="top" src={recipe.img} />
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Subtitle>{recipe.desc}</Card.Subtitle>
                        <Card.Text>Cooking Time: {recipe.duration} min</Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default RecipeCard;