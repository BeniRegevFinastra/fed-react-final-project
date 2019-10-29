/*  ShopProduct = {
        "id": "3",
        "shopId": "3",
        "shopName": "",
        "productId": "1",
        "productName": "",
        "pricePerUnit": 11.30,
        "measuringUnits": "box"
    } */
class ShopProduct {
  constructor(
    idOrObj,
    shopId,
    productId,
    pricePerUnit,
    measuringUnits
    // ,shopName
    // ,productName
  ) {
    console.log("arguments.length=" + arguments.length + ", id: " + idOrObj + ", shopId: " + shopId + ", productId: " + productId);
    if (arguments.length === 1) {
      //  First and only argument is an object
      this.id = idOrObj.id;
      this.shopId = idOrObj.shopId;
      this.productId = idOrObj.productId;
      this.pricePerUnit = idOrObj.pricePerUnit;
      this.measuringUnits = idOrObj.measuringUnits;
      // this.shopName = idOrObj.shopName;
      // this.productName = idOrObj.productName;
    } else {
      this.id = idOrObj;
      this.shopId = shopId;
      this.productId = productId;
      this.pricePerUnit = pricePerUnit;
      this.measuringUnits = measuringUnits;
      // this.shopName = shopName;
      // this.productName = productName;
    }
  }
  toString() {
    return (
      '{ "id": "' +
      this.id +
      '", "shopId": "' +
      this.shopId +
      '", "shopName": "' +
      this.shopName +
      '", "productId": "' +
      this.productId +
      '", "productName": "' +
      this.productName +
      '", "pricePerUnit": ' +
      this.pricePerUnit +
      ', "measuringUnits": "' +
      this.measuringUnits +
      '" }'
    );
  }
}
