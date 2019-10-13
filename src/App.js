import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import PlannedDinnerPage from './pages/PlannedDinnerPage';
import ShoppingListPage from './pages/ShoppingListPage';
import jsonUsers from './data/users';
import jsonKitchens from './data/Kitchens';
import jsonDishTypes from './data/DishTypes';
import jsonIngredients from './data/Ingredient';
import jsonRecipes from './data/Recipes';
import jsonRecipeIngredients from './data/RecipeIngrediaent';
import jsonRecipesPreperationSteps from './data/RecipePreperationStep'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      //   activeUser:   {
      //     "id": 1,
      //     "fname": "Benny",
      //     "lname": "Regev",
      //     "email": "benny@regev.com",
      //     "pwd": "1969"
      // }
      allUsers: jsonUsers,
      allKitchens: jsonKitchens,
      allDishTypes: jsonDishTypes,
      allIngredients: jsonIngredients,
      allRecipes: jsonRecipes,
      allRecipesIngredients: jsonRecipeIngredients,
      allRecipesPreperationSteps: jsonRecipesPreperationSteps,
      activeUserRecipes: []
      // hack for starting with my recipes
      // activeUserRecipes: jsonRecipes.filter(recipe => recipe.userId === 1)
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.addRecipe = this.addRecipe.bind(this);

    console.log(this.state.allRecipes);
  }

  handleLogout() {
    this.setState({ activeUser: null });
  }

  handleLogin(activeUser) {
    const activeUserRecipes = this.state.allRecipes.filter(recipe => recipe.userId === activeUser.id)
    this.setState({ activeUser, activeUserRecipes });
  }

  addRecipe(newRecipe) {
    //const {activeUser, allRecipes, activeUserRecipes} this.state.activeUser
    // 1) add id and user to the recipe
    newRecipe.userId = this.state.activeUser.id;
    newRecipe.id = this.state.allRecipes[this.state.allRecipes.length - 1].id + 1;

    // 2) update all recipes and active user recipes
    const allRecipes = this.state.allRecipes.concat(newRecipe);
    const activeUserRecipes = this.state.activeUserRecipes.concat(newRecipe);

    this.setState({ allRecipes, activeUserRecipes });
  }

  render() {

    // const activeUser = this.state.activeUser;
    const { activeUser, allUsers,
      allRecipes,
      allKitchens,
      allDishTypes,
      allIngredients,
      allRecipesIngredients,
      allRecipesPreperationSteps,
      activeUserRecipes } = this.state;

      console.log("allKitchens: " + allKitchens);
      console.log("allDishTypes: " + allDishTypes);

    return (
      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout} />
        </Route>
        <Route path="/login">
          <LoginPage users={allUsers} handleLogin={this.handleLogin} />
        </Route>
        <Route exact path="/recipes">
          <RecipesPage recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout} addRecipe={this.addRecipe} />
        </Route>
        <Route path="/recipes/:id">
          <RecipeDetailsPage recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout} addRecipe={this.addRecipe} />
        </Route>
        <Route path="/dinner">
          <PlannedDinnerPage recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout} addRecipe={this.addRecipe} />
        </Route>
        <Route path="/shopping">
          <ShoppingListPage recipes={activeUserRecipes} activeUser={activeUser} handleLogout={this.handleLogout} addRecipe={this.addRecipe} />
        </Route>
      </Switch>
    );
  }
}

export default App;
