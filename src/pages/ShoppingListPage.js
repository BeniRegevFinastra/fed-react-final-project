import React from "react";
import { Jumbotron, Container, Table } from "react-bootstrap";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RecipesNavbar from "../components/RecipesNavbar";
import ProductComponent from "../components/ProductComponent";
import ShopProduct from "../models/ShopProduct";

class ShoppingListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      productsForShopping: [],
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
        //  Scan each recipe-ingredients to find in ingredients array
        for (let i = 0; i < recipe.ingredients.length; i++) {
          for (let j = 0; j < productsForShopping.length; j++) {
            if (
              productsForShopping[j].id === recipe.ingredients[i].id ||
              productsForShopping[j].name === recipe.ingredients[i].name
            ) {
              /*  {
                    "id": nnnnn,
                    "name": "ingredient-name",
                    "imageUrl": ""https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Cacik-1.jpg/800px-Cacik-1.jpg"",
                    "defaultMeasuring": "gr/kg/pcs/pkgs/cups/etc",
                    "quantity": nnn.nn,
                    "lowestPricePerUnit": nnnnnn.nn,
                    "lowestPriceStopId": nnnn,
                    "lowestPriceShopName": "shop-name"
                  } */
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

    for (let i = 0; i < productsForShopping.length; i++) {
      this.getLowestPriceOfProduct(productsForShopping[i].id).then(response => {
        /*  data = ShopProduct = {
              "id": "3",
              "shopId": "3",
              "shopName": "",
              "productId": "1",
              "productName": "",
              "pricePerUnit": 11.30,
              "measuringUnits": "box"
            } */

        console.log("\t response: " + response);
        if (response !== undefined) {
          let { dataArray } = this.state;
          dataArray.push(response.data);
          this.setState({ dataArray });
        }
        //// const productLowestPrice = new ShopProduct (data.id, data.shopId, data.shopName, data.productId, data.productName, data.pricePerUnit, data.measuringUnits);
      });
    }

    this.setState({ productsForShopping });
  }

  // new way of writing an consuming an async function
  async getLowestPriceOfProduct(productId) {
    let apiGetProductLowestPriceURL = `http://localhost:8080/shopProduct/getLowestPrice/product/${productId}`;
    const response = await axios
      .get(apiGetProductLowestPriceURL)
      .catch(error => {
        console.log("async GET request: " + error);
      });
    return response;
  }

  getProductLowestPrice(shopProduct) {
    let {
      productName,
      pricePerUnit,
      shopId,
      shopName,
      measuringUnits,
      productsForShopping
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
      } else {
        console.log("HTTP StatusCode is " + status + ", " + statusText);
      }

      this.setState({ productId, productName, shopId, shopName, pricePerUnit });
      console.log("ShoppingListPage.getProductLowestPrice(shopProduct) -- End");
    });
    this.setState({ productsForShopping });
  }

  render() {
    const { activeUser, handleLogout } = this.props;
    const { dataArray } = this.state;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    let productRows = [];
    let totalCost = 0.0;
    for (var i = 0; i < this.state.productsForShopping.length; i++) {
      let productRow = (
        <ProductComponent productData={this.state.productsForShopping[i]} responses={dataArray} />
      );
      productRows.push(productRow);
      const productCost = (totalCost +=
        this.state.productsForShopping[i].quantity *
        this.state.productsForShopping[i].lowestPricePerUnit);
    }

    return (
      <div>
        <RecipesNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Jumbotron>
          <Container id="shopping-list-title">
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
        <Container id="shopping-list-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Cheapest Price</th>
                <th>Quantity</th>
                <th>Units</th>
                <th>Cost</th>
                <th>Cheapest Shop</th>
              </tr>
            </thead>
            <tbody>{productRows}</tbody>
          </Table>
          {/* <h5>Total Cost: USD {totalCost} </h5> */}
        </Container>
      </div>
    );
  }
}

export default ShoppingListPage;
