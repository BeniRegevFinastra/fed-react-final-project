import React from "react";
import axios from "axios";

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
      lowestPricePerUnit: null,
      lowestShopId: null,
      lowestShopName: null,
      navigateToProductId: null,
    };
    // this.openProductDetails = this.openProductDetails.bind(this);
    // this.addRemoveFromShoppingList = this.addRemoveFromShoppingList.bind(this);
  }

  componentDidMount() {
    const { productData } = this.props;
    const productId = this.props.productData.id;
    let apiGetProductLowestPriceURL = `http://localhost:8080/shopProduct/getLowestPrice/product/${productId}`;
    axios.get(apiGetProductLowestPriceURL).then(response => {
        const { status, statusText, data } = response;
        console.log("status=" + status + "; statusText=" + statusText);
        /*  data = ShopProduct = {
              "id": "3",
              "shopId": "3",
              "shopName": "",
              "productId": "1",
              "productName": "",
              "pricePerUnit": 11.30,
              "measuringUnits": "box"
            } 
        */
        productData.lowestPricePerUnit = data.pricePerUnit;
        productData.lowestShopId = data.shopId;
        productData.lowestShopName = data.shopName;
        console.log("componentDidMount() -- id=" + productId + 
                    " ; lowestPricePerUnit=" + data.pricePerUnit + 
                    " ; lowestShopId=" + data.shopId + 
                    " ; lowestShopName=" + data.shopName);

        this.setState({ productData, 
            lowestPricePerUnit: data.pricePerUnit, 
            lowestShopId: data.shopId, 
            lowestShopName: data.shopName
        });
      })
      .catch(error => {
        console.log(error)
      }
    );
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
        {/* <td>{this.state.productData.name}</td>
        <td>{this.state.productData.lowestPricePerUnit}</td>
        <td>{this.state.productData.quantity}</td>
        <td>{this.state.productData.defaultMeasuring}</td> */}
        <td>{productCost}</td>
      </tr>
    );
  }
}

export default ProductComponent;
