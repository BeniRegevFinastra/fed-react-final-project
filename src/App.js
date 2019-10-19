import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import PlannedDinnerPage from "./pages/PlannedDinnerPage";
import ShoppingListPage from "./pages/ShoppingListPage";
// import jsonUsers from "./data/users";
// import jsonKitchens from './data/Kitchens'
// import jsonDishTypes from './data/DishTypes'
// import jsonIngredients from './data/Ingredient'
// import jsonRecipes from './data/recipes'
// import jsonRecipeIngredients from './data/RecipeIngrediaent'
// import jsonRecipesPreperationSteps from './data/RecipePreperationStep'
import { UserProvider } from "./components/userContext";
import { AppContext } from "./components/AppContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  // handleLogout() {
  //   this.setState({ activeUser: null });
  // }

  // handleLogin(activeUser) {
  //   const activeUserRecipes = this.state.allRecipes.filter(
  //     recipe => recipe.userId === activeUser.id
  //   );
  //   this.setState({ activeUser, activeUserRecipes });
  // }

  addRecipe(newRecipe) {
    //const {activeUser, allRecipes, activeUserRecipes} this.state.activeUser
    // 1) add id and user to the recipe
    newRecipe.userId = this.state.activeUser.id;
    newRecipe.id =
      this.state.allRecipes[this.state.allRecipes.length - 1].id + 1;

    // 2) update all recipes and active user recipes
    const allRecipes = this.state.allRecipes.concat(newRecipe);
    const activeUserRecipes = this.state.activeUserRecipes.concat(newRecipe);

    this.setState({ allRecipes, activeUserRecipes });
  }

  render() {
    return (
      <AppContext.Provider>
        <Switch>
          <Route exact path="/">
            <HomePage
            // activeUser={activeUser}
            // handleLogout={this.handleLogout}
            />
          </Route>
          <Route path="/login">
            {/* <LoginPage users={allUsers} handleLogin={this.handleLogin} /> */}
            <LoginPage />
          </Route>
          <Route exact path="/recipes">
            {/* <RecipesPage activeUser={activeUser} addRecipe={this.addRecipe} allRecipes={allRecipes} handleLogout={this.handleLogout} userRecipes={activeUserRecipes} /> */}
            <RecipesPage />
          </Route>
          {/* 
            <Route path="/recipes/:id">
              <RecipeDetailsPage activeUser={activeUser} addRecipe={this.addRecipe} allRecipes={allRecipes} handleLogout={this.handleLogout} userRecipes={activeUserRecipes} />
            </Route> 
          */}
          {/* <Route path="/recipes/:id" component={RecipeDetailsPage} activeUser={activeUser} allRecipes={allRecipes} /> */}
          <Route path="/recipes/:id" component={RecipeDetailsPage} />
          <Route path="/dinner">
            <PlannedDinnerPage />
          </Route>
          <Route path="/shopping">
            <ShoppingListPage />
          </Route>
        </Switch>
      </AppContext.Provider>
    );
  }
}

export default App;
