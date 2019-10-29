import React from "react";
import axios from "axios";
import { Button } from "reactstrap";

class ProductComponent extends React.Component {
  /*  productData: {
        defaultMeasuring: "xxxxxxx",
        id: nn,
        imageUrl: "xxxxxxx",
        lowestPricePerUnit: nnnnn.nn,
        lowestShopId: nnnnn,
        lowestShopName: "xxxxxxx"
        name: "xxxxxxx",
        quantity: nnnnn	
      } */
  constructor(props) {
    super(props);
    this.state = {
      productData: null,
      quantityValue: 0,
      lowestPricePerUnit: 0.0,
      lowestPriceShopId: -1,
      lowestPriceShopName: "Product Not Found in PriceApp",
      navigateToProductId: null,
      isLoading: true,
    };
    this.quantityIncrease = this.quantityIncrease.bind(this);
    this.quantityDecrease = this.quantityDecrease.bind(this);
    // this.addRemoveFromShoppingList = this.addRemoveFromShoppingList.bind(this);
    // this.openProductDetails = this.openProductDetails.bind(this);
  }

  componentDidMount() {
    const { productData } = this.props;
    console.log("componentDidMount() -- productData.id=" + productData.id);
    const productId = this.props.productData.id;
    this.setState({ quantityValue: productData.quantity });

    let { lowestPriceShopId, lowestPriceShopName, lowestPricePerUnit } = this.state;
    const { responses } = this.props;
    if (responses.length > 0) {
      const resData = responses.find(
        r => parseInt(r.productId) === this.props.productData.id
      );
      if (resData !== undefined) {
        lowestPriceShopId = resData.shopId;
        lowestPriceShopName = resData.shopName;
        lowestPricePerUnit = resData.pricePerUnit;
        this.setState({ lowestPriceShopId, lowestPriceShopName, lowestPricePerUnit });
      }
    }
    this.setState({ isLoading: false });
  }

  quantityIncrease() {
    this.setState({ quantityValue: this.state.quantityValue + 1 });
  }

  quantityDecrease() {
    if (this.state.quantityValue > 0) {
      this.setState({ quantityValue: this.state.quantityValue - 1 });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading Product(s)...</p>;
    }

    let { lowestPriceShopId, lowestPriceShopName, lowestPricePerUnit } = this.state;
    const { responses } = this.props;
    if (responses.length > 0) {
      const resData = responses.find(
        r => parseInt(r.productId) === this.props.productData.id
      );
      if (resData !== undefined) {
        lowestPriceShopId = resData.shopId;
        lowestPriceShopName = resData.shopName;
        lowestPricePerUnit = resData.pricePerUnit;
        // this.setState({ lowestPriceShopId, lowestPriceShopName, lowestPricePerUnit });
      }
    }

    const productCost =
      (lowestPricePerUnit !== null
        ? lowestPricePerUnit
        : 0) *
      (this.props.productData.quantity !== null
        ? this.props.productData.quantity
        : 0);

    return (
      <tr onClick={this.openProductDetails}>
        <td>
          {/* <a href={this.props.productData.imdbUrl} target="_blank">
            <img src={this.props.productData.imageUrl} alt=""></img>
          </a> */}
          <img height="50px" src={this.props.productData.imageUrl} alt=""></img>
        </td>
        <td>{this.props.productData.name}</td>
        <td>$ {lowestPricePerUnit}</td>
        <td>
          {/* <Button color="primary" onClick={this.quantityDecrease}>
            -
          </Button>
          {this.props.productData.quantity}
          <Button color="primary" onClick={this.quantityIncrease}>
            +
          </Button> */}
          <div className="def-number-input number-input">
            <button className="minus" onClick={this.quantityDecrease}></button>
            <input
              min="0"
              value="1"
              type="number"
              name="quantity"
              className="quantity"
              value={this.state.quantityValue}
              onChange={() => console.log("change")}
            />
            <button className="plus" onClick={this.quantityIncrease}></button>
          </div>
        </td>
        <td>{this.props.productData.defaultMeasuring}</td>
        <td>$ {productCost}</td>
        <td>
          ({lowestPriceShopId}) {lowestPriceShopName}
        </td>
      </tr>
    );
  }
}

export default ProductComponent;
