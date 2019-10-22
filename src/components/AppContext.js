import React, { useState, createContext } from "react";
import jsonRecipes from './data/recipes';
import jsonKitchens from './data/Kitchens';
import jsonDishTypes from './data/DishTypes';
import jsonIngredients from './data/Ingredient';
import jsonRecipeIngredients from './data/RecipeIngrediaent';
import jsonRecipesPreperationSteps from './data/RecipePreperationStep';

export const AppContext = createContext();

export class AppProvider extends Component {
  state = {
    name: "Beni",
    age: 50,
    //   activeUser:   {
    //     "id": 1,
    //     "fname": "Benny",
    //     "lname": "Regev",
    //     "email": "benny@regev.com",
    //     "pwd": "1969"
    // }
    activeUser: null,
    selectedRecipe: {
      id: 69,
      name: "Shuba Salad",
      calories: "A LOT!"
    },
    recipeId: null,
    activeUser: null,
    allUsers: jsonUsers,
    allKitchens: jsonKitchens,
    allDishTypes: jsonDishTypes,
    allIngredients: jsonIngredients,
    allRecipes: jsonRecipes,
    allRecipesIngredients: jsonRecipeIngredients,
    allRecipesPreperationSteps: jsonRecipesPreperationSteps,
    // Only recipes that are linked to activeUser
    activeUserRecipes: []
    // hack for starting with my recipes
    // activeUserRecipes: jsonRecipes.filter(recipe => recipe.userId === 1)
};

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          selectRecipe: () =>
            this.setState({
              selectedRecipe: { id: 77, name: "Shakshuka", calories: "Many" }
            })
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
