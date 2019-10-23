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
import jsonUsers from './data/users'
import jsonKitchens from './data/Kitchens'
import jsonDishTypes from './data/DishTypes'
import jsonIngredients from './data/Ingredient'
import jsonRecipes from './data/recipes'
import jsonRecipeIngredients from './data/RecipeIngrediaent'
import jsonRecipesPreperationSteps from './data/RecipePreperationStep'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      activeUser: null,
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

    this.addRecipe = this.addRecipe.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlesSelectRecipe = this.handlesSelectRecipe.bind(this);

    console.log(this.state.allRecipes);
  }

  handlesSelectRecipe(recipeDetails) {
    this.setState({
      recipe: recipeDetails
    });
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
    const { recipe, activeUser, allUsers,
      allRecipes,
      allKitchens,
      allDishTypes,
      allIngredients,
      allRecipesIngredients,
      allRecipesPreperationSteps,
      activeUserRecipes } = this.state;
    
    console.log("allRecipes: " + allRecipes);
    console.log("allKitchens: " + allKitchens);
    console.log("allDishTypes: " + allDishTypes);
    console.log("allIngredients: " + allIngredients);
    console.log("allRecipesIngredients: " + allRecipesIngredients);
    console.log("allRecipesPreperationSteps: " + allRecipesPreperationSteps);

    return (
      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout} />
        </Route>
        <Route path="/login">
          <LoginPage users={allUsers} handleLogin={this.handleLogin} />
        </Route>
        <Route exact path="/recipes">
          <RecipesPage activeUser={activeUser} addRecipe={this.addRecipe} allRecipes={allRecipes} handleLogout={this.handleLogout} handleSelectRecipe={this.handlesSelectRecipe} userRecipes={activeUserRecipes} />
        </Route>
        {/* <Route path="/recipes/:id">
          <RecipeDetailsPage activeUser={activeUser} allRecipes={allRecipes} recipe={recipe} handleLogout={this.handleLogout} />
        </Route>  */}
        <Route path="/recipes/:id" component={RecipeDetailsPage} activeUser={activeUser} allRecipes={allRecipes} />
        <Route path="/dinner">
          <PlannedDinnerPage activeUser={activeUser} addRecipe={this.addRecipe} allRecipes={activeUserRecipes} handleLogout={this.handleLogout} />
        </Route>
        <Route path="/shopping">
          <ShoppingListPage activeUser={activeUser} addRecipe={this.addRecipe} allRecipes={allRecipes} handleLogout={this.handleLogout} userRecipes={activeUserRecipes} />
        </Route>
      </Switch>
    );
  }
}

export default App;
