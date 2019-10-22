import React, { useState, createContext } from "react";
import jsonRecipes from "./data/recipes";
import jsonKitchens from "./data/Kitchens";
import jsonDishTypes from "./data/DishTypes";
import jsonIngredients from "./data/Ingredient";
import jsonRecipeIngredients from "./data/RecipeIngrediaent";
import jsonRecipesPreperationSteps from "./data/RecipePreperationStep";

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
      ImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Selidi_pod_shuboi.jpg/1024px-Selidi_pod_shuboi.jpg",
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

  console.log("allRecipes: " + allRecipes);
  console.log("allKitchens: " + allKitchens);
  console.log("allDishTypes: " + allDishTypes);
  console.log("allIngredients: " + allIngredients);
  console.log("allRecipesIngredients: " + allRecipesIngredients);
  console.log("allRecipesPreperationSteps: " + allRecipesPreperationSteps);

  render() {
    //  "...this.state" creates a cpy of "this.state"
    //  "handleLogout" is a simple function, I make it a stateless function
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleLogout: () =>
            this.setState({
              activeUser: null
            }),
          selectRecipe: () =>
            this.setState({
              recipeId: 999,
              selectedRecipe: {
                id: 999,
                name: "Recipe name here",
                imageUrl: "Recipe image URL here",
                calories: "Many"
              }
            })
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
