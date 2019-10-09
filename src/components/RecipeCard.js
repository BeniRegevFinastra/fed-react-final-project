import React from 'react'
import { Card } from 'react-bootstrap'

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigateToID: null,
            recipeDetails: null,
        }
        this.openRecipeDetails = this.openRecipeDetails.bind(this);
    }

    openRecipeDetails() {
        console.log("openRecipeDetails - RecipeId: " + this.props.recipe.id);
        this.state.navigateToID = this.props.recipe.id;
        this.state.recipeDetails = this.props.recipe;
        this.setState(this.state);
    }

    render() {
        const { recipe } = this.props;
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

export default RecipeCard;