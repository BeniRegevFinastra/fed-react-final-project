/*  ingredient: {
        "id": 1,
        "name": "Egg",
        "imageUrl": "https://5.imimg.com/data5/NC/UD/MY-68350052/fresho-fresh-white-eggs-500x500.jpg",
        "defaultMeasuring": "unit",
        "quantity": null,
        "lowestPricePerUnit": null,
        "lowestPriceShopId": null,
        "lowestPriceShopName": null
    } */
class Ingredient {
  constructor(
    nameOrObj,
    id,
    imageUrl,
    defaultMeasuring,
    quantity,
    lowestPricePerUnit,
    lowestPriceShopId,
    lowestPriceShopName
  ) {
    if (arguments.length === 1) {
      //  First and only argument is an object
      this.id = nameOrObj.id;
      this.name = nameOrObj.name;
      this.imageUrl = nameOrObj.imageUrl;
      this.defaultMeasuring = nameOrObj.defaultMeasuring;
      this.quantity = nameOrObj.quantity;
      this.lowestPricePerUnit = nameOrObj.lowestPricePerUnit;
      this.lowestPriceShopId = nameOrObj.lowestPriceShopId;
      this.lowestPriceShopName = nameOrObj.lowestPriceShopName;
    } else {
      this.id = id;
      this.name = name;
      this.imageUrl = imageUrl;
      this.defaultMeasuring = defaultMeasuring;
      this.quantity = quantity;
      this.lowestPricePerUnit = lowestPricePerUnit;
      this.lowestPriceShopId = lowestPriceShopId;
      this.lowestPriceShopName = lowestPriceShopName;
    }
  }
  toString() {
    return (
      '{ "id": ' +
      this.id +
      ', "name": "' +
      this.name +
      '", "imageUrl": "' +
      this.imageUrl +
      '", "defaultMeasuring": "' +
      this.defaultMeasuring +
      '", "quantity": ' +
      this.quantity +
      ', "lowestPricePerUnit": ' +
      this.lowestPricePerUnit +
      ', "lowestPriceShopId": "' +
      this.lowestPriceShopId +
      '", "lowestPriceShopName": "' +
      this.lowestPriceShopName +
      '" }'
    );
  }
}
