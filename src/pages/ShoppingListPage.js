import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { Button } from "reactstrap";
import RecipesNavbar from "../components/RecipesNavbar";
import { Redirect } from "react-router-dom";
import axios from "axios";

class ShoppingListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null,
      pricePerUnit: null,
      shopId: "",
      shopName: "",
      measuringUnits: ""
    };
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
        for (let i = 0; i < recipe.ingredients.length; i++) {
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
    //  Filter out products that are not in any recipe
    productsForShopping = productsForShopping.filter(
      product => product.quantity !== null
    );

    //  Get lowest price and shop-details from price-compare API
    // productsForShopping.map(product => {
    // });
    const sampleShopProduct1 = {
      id: 1,
      name: "Egg",
      defaultMeasuring: "unit",
      quantity: null,
      lowestPricePerUnit: null,
      lowestPriceStopId: null,
      lowestPriceShopName: null
    };
    this.getProductLowestPrice(sampleShopProduct1);
    console.log("sampleShopProduct1 returned (should be successful)");
    const sampleShopProduct7 = {
      id: 7,
      index: 7,
      name: "White Pepper Powder",
      defaultMeasuring: "teaspoon",
      quantity: null,
      lowestPricePerUnit: null,
      lowestPriceStopId: null,
      lowestPriceShopName: null
    };
    this.getProductLowestPrice(sampleShopProduct7);
    console.log(
      "sampleShopProduct7 returned (should have FAILED with HTTPStatusCode 404 NOT FOUND)!"
    );
  }

  getProductLowestPrice(shopProduct) {
    let {
      productName,
      pricePerUnit,
      shopId,
      shopName,
      measuringUnits
    } = this.state;
    let productId = shopProduct.id;
    let apiGetProductLowestPriceURL = `http://localhost:8080/shopProduct/getLowestPrice/product/${productId}`;
    axios.get(apiGetProductLowestPriceURL).then(res => {
      const { data, status, statusText } = res;
      if (status >= 200 && status <= 299) {
        productName = data.productName;
        shopId = data.shopId;
        shopName = data.shopName;
        measuringUnits = data.measuringUnits;
        pricePerUnit = data.pricePerUnit;

        console.log(
          'ShopProduct = { id: "' +
            data.id +
            '", productId: "' +
            data.productId +
            '", productName: "' +
            data.productName +
            '", shopId: "' +
            data.shopId +
            '", shopName: "' +
            data.shopName +
            '", defaultMeasuring: "' +
            data.defaultMeasuring +
            '", pricePerUnit: ' +
            data.pricePerUnit +
            " }"
        );
      } else {
        console.log("HTTP StatusCode is " + status + ", " + statusText);
      }

      this.setState({ productId, productName, shopId, shopName, pricePerUnit });
      console.log("ShoppingListPage.getProductLowestPrice(shopProduct) -- End");
    });
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
          <Container id="dinner-title">
            <h1 className="display-3">Your Shopping List For Dinner</h1>
            <h6>
              The products in the shopping list are the ingredients extracted
              from the recipes you selected for dinner.
            </h6>
            <h6>
              Here you can set quantity of each recipe, to change your selection
              of recipes for dinner go to
              <Button color="link" href="#recipes">
                Recipes Page.
              </Button>
            </h6>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default ShoppingListPage;
