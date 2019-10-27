import React from "react";
import { Jumbotron, Button, Container } from "react-bootstrap";
import RecipesNavbar from "../components/RecipesNavbar";
import { Redirect } from "react-router-dom";

class ShoppingListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { ingredients, userRecipes } = this.props;
    let productsForShopping = ingredients.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    //  Scan all recipes
    userRecipes.map(recipe => {
      if (recipe.ingredients.length > 0) {
        //    Scan each recipe-ingredients to find in ingredients array
        for (let i = 0; i < recipe.ingredients.lenght; i++) {
          for (let j = 0; j < productsForShopping.length; j++) {
            if (
              productsForShopping[j].id === recipe.ingredients[i].id ||
              productsForShopping[j].name === recipe.ingredients[i].name
            ) {
              /*  {
                    "id": nnnnn,
                    "name": "ingredient-name",
                    "defaultMeasuring": "gr/kg/pcs/pkgs/cups/etc",
                    "quantity": nnn.nn,
                    "lowestPricePerUnit": nnnnnn.nn,
                    "lowestPriceStopId": nnnn,
                    "lowestPriceShopName": "shop-name"
                }    */
              productsForShopping[j].quantity =
                productsForShopping[j].quantity === null
                  ? recipe.ingredients[i].quantity
                  : productsForShopping[j].quantity +
                    recipe.ingredients[i].quantity;
            }
          }
        }
      }
    });
    let productsForShopping;
  }

  render() {
    const { activeUser, handleLogout } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Jumbotron>
          <Container>
            <h1 className="display-3">Your Shopping List For Dinner</h1>
            <p>
              You are now browsing as a Guest, You can
              <Button variant="primary" href="#/login">
                Login
              </Button>
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default ShoppingListPage;
