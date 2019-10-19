import React, { useState, createContext } from "react";
import jsonUsers from "../data/users";
import jsonRecipes from '../data/recipes';
import jsonKitchens from '../data/Kitchens';
import jsonDishTypes from '../data/DishTypes';
import jsonIngredients from '../data/Ingredient';
import jsonRecipeIngredients from '../data/RecipeIngrediaent';
import jsonRecipesPreperationSteps from '../data/RecipePreperationStep';

export const AppContext = createContext();

export class AppProvider extends React.Component {
    emailInput = React.createRef();
    pwdInput = React.createRef();
    
    state = {
        invalidLogin: false,
        successLogin: false,
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

    login = () => {
        let newActiveUser = null;
        for (let i = 0; i < this.state.allUsers.length && !newActiveUser; i++) {
            if (this.state.allUsers[i].email === emailInput.current.value &&
                this.state.allUsers[i].pwd === pwdInput.current.value) {
                    newActiveUser = this.state.allUsers[i];
                }
        }
        if (newActiveUser) {
            this.props.handleLogin(newActiveUser);
            this.setState({successLogin: true});
        } else {
            this.setState({invalidLogin: true});
        }
    }

    handleLogin = (activeUser) => {
        const activeUserRecipes = this.state.allRecipes.filter(
            recipe => recipe.userId === activeUser.id
        );
        this.setState({ activeUser, activeUserRecipes });
    }

    render() {
        console.log("allUsers: " + this.state.jsonUsers);
        console.log("allRecipes: " + this.state.allRecipes);
        console.log("allKitchens: " + this.state.allKitchens);
        console.log("allDishTypes: " + this.state.allDishTypes);
        console.log("allIngredients: " + this.state.allIngredients);
        console.log("allRecipesIngredients: " + this.state.allRecipesIngredients);
        console.log("allRecipesPreperationSteps: " + this.state.allRecipesPreperationSteps);
  
        //  "...this.state" creates a cpy of "this.state"
        //  "handleLogout" is a simple function, I make it a stateless function
        return (
        <AppContext.Provider
            value={{
            ...this.state,
            login: this.login,
            handleLogin: this.handleLogin,
            handleLogout: () => this.setState({ activeUser: null }),
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
