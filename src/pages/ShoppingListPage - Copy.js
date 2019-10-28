import React from "react";
import { Jumbotron, Container, Table } from "react-bootstrap";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RecipesNavbar from "../components/RecipesNavbar";
import ProductComponent from "../components/ProductComponent";

class ShoppingListPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props.ingredients = [" + this.props.ingredients + "]");
    this.state = {
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

    console.log("componentDidMount() --> ");
    productsForShopping.map(product =>
      console.log(
        '\t ShopProduct = { id: "' +
          product.id +
          '", productId: "' +
          product.productId +
          '", productName: "' +
          product.productName +
          '", shopId: "' +
          product.shopId +
          '", shopName: "' +
          product.shopName +
          '", measuringUnits: "' +
          product.measuringUnits +
          '", pricePerUnit: ' +
          product.pricePerUnit +
          " }"
      )
    );
    //  Filter out products that are not in any recipe
    productsForShopping = productsForShopping.filter(
      product => product.quantity !== null
    );

    //  Get lowest price and shop-details from price-compare API  for every product in shopping-list
    for (let i = 0; i < productsForShopping.length; i++) {
      let lowestPriceProduct = this.getProductLowestPrice(
        productsForShopping[i]
      );
      if (lowestPriceProduct !== null) {
        productsForShopping[i] = lowestPriceProduct;
      }
    }

    // const sampleShopProduct1 = {
    //   id: 1,
    //   name: "Egg",
    //   measuringUnits: "unit",
    //   quantity: null,
    //   lowestPricePerUnit: null,
    //   lowestPriceStopId: null,
    //   lowestPriceShopName: null
    // };
    // this.getProductLowestPrice("1");
    // console.log("sampleShopProduct1 returned (should be successful)");
    // const sampleShopProduct7 = {
    //   id: 7,
    //   index: 7,
    //   name: "White Pepper Powder",
    //   measuringUnits: "teaspoon",
    //   quantity: null,
    //   lowestPricePerUnit: null,
    //   lowestPriceStopId: null,
    //   lowestPriceShopName: null
    // };
    // this.getProductLowestPrice("7");
    // console.log(
    //   "sampleShopProduct7 returned (should have FAILED with HTTPStatusCode 404 NOT FOUND)!"
    // );
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
    console.log(
      "getProductLowestPrice(" +
        productId +
        ') --> ShopProduct = { id: "' +
        shopProduct.id +
        '", productId: "' +
        shopProduct.productId +
        '", productName: "' +
        shopProduct.productName +
        '", shopId: "' +
        shopProduct.shopId +
        '", shopName: "' +
        shopProduct.shopName +
        '", measuringUnits: "' +
        shopProduct.measuringUnits +
        '", pricePerUnit: ' +
        shopProduct.pricePerUnit +
        " }"
    );

    let apiGetProductLowestPriceURL = `http://localhost:8080/shopProduct/getLowestPrice/product/${productId}`;

    // const response = await axios.get(apiGetProductLowestPriceURL)
    //   .catch(error => console.log(`😱 Axios request failed (priductID=${productId}): ${error}`));
    // const { data, status, statusText } = response;
    // console.log(apiGetProductLowestPriceURL + ' statusCode: ' + status + ' ' + statusText);
    // if (response.status >= 200 && response.status <= 299) {
    //     // shopProduct.productId = data.productId;
    //     // shopProduct.shopId = data.shopId;
    //     shopProduct.productName = data.productName;
    //     shopProduct.shopName = data.shopName;
    //     shopProduct.measuringUnits = data.measuringUnits;
    //     shopProduct.pricePerUnit = data.pricePerUnit;
    //     console.log("getProductLowestPrice(" + productId+ ") -- Successful \n" +
    //       'ShopProduct = { id: "' +
    //         data.id +
    //         '", productId: "' +
    //         data.productId +
    //         '", productName: "' +
    //         data.productName +
    //         '", shopId: "' +
    //         data.shopId +
    //         '", shopName: "' +
    //         data.shopName +
    //         '", measuringUnits: "' +
    //         data.measuringUnits +
    //         '", pricePerUnit: ' +
    //         data.pricePerUnit +
    //         " }" );

    //     this.setState({ productId, productName, shopId, shopName, pricePerUnit });
    //     return shopProduct;
    //   }
    return shopProduct;
    // this.setState({ productsForShopping });
  }

  render() {
    const { activeUser, handleLogout } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    let productRows = [];
    let totalCost = 0.0;
    for (var i = 0; i < this.state.productsForShopping.length; i++) {
      let productRow = (
        <ProductComponent productData={this.state.productsForShopping[i]} />
      );
      productRows.push(productRow);
      totalCost +=
        this.state.productsForShopping[i].quantity *
        this.state.productsForShopping[i].pricePerUnit;
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
                <th>Price Per Unit</th>
                <th>Quantity</th>
                <th>Units</th>
                <th>Cost (price x qty)</th>
              </tr>
            </thead>
            <tbody>{productRows}</tbody>
          </Table>
          <h6>Total Cost: USD {totalCost}</h6>
        </Container>
      </div>
    );
  }
}

export default ShoppingListPage;
