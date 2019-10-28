import React from "react";

class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: null,
      navigateToProductId: null
    };
    // this.openProductDetails = this.openProductDetails.bind(this);
    // this.addRemoveFromShoppingList = this.addRemoveFromShoppingList.bind(this);
  }

  render() {
    /*  {
          "id": 1,
          "name": "Egg",
          "imageUrl": "https://5.imimg.com/data5/NC/UD/MY-68350052/fresho-fresh-white-eggs-500x500.jpg",
          "defaultMeasuring": "unit",
          "quantity": null,
          "lowestPricePerUnit": null,
          "lowestPriceStopId": null,
          "lowestPriceShopName": null
        } */
    const productCost =
      (this.props.productData.lowestPricePerUnit !== null
        ? this.props.productData.lowestPricePerUnit
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
        <td>{this.props.productData.lowestPricePerUnit}</td>
        <td>{this.props.productData.quantity}</td>
        <td>{this.props.productData.defaultMeasuring}</td>
        <td>{productCost}</td>
      </tr>
    );
  }
}

export default ProductComponent;
