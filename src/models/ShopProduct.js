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
    shopName,
    productId,
    productName,
    pricePerUnit,
    measuringUnits
  ) {
    if (arguments.length === 1) {
      //  First and only argument is an object
      this.id = idOrObj.id;
      this.shopId = idOrObj.shopId;
      this.shopName = idOrObj.shopName;
      this.productId = idOrObj.productId;
      this.productName = idOrObj.productName;
      this.pricePerUnit = idOrObj.pricePerUnit;
      this.measuringUnits = idOrObj.measuringUnits;
    } else {
      this.id = idOrObj;
      this.shopId = shopId;
      this.shopName = shopName;
      this.productId = productId;
      this.productName = productName;
      this.pricePerUnit = pricePerUnit;
      this.measuringUnits = measuringUnits;
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
