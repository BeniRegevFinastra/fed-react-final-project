/*  {
        "recipeId": 1,
        "ingredientId": 1,
        "index": 1,
        "name": "Egg",
        "units": "units",
        "quantity": 4
    }
*/
class RecipeIngredient {
    constructor(nameOrObj, recipeId, ingredientId, index, units, quantity) {
        if (arguments.length === 1) {
            //  First and only argument is an object
            this.recipeId = nameOrObj.recipeId;
            this.ingredientId = nameOrObj.ingredientId;
            this.name = nameOrObj.name;
            this.index = nameOrObj.index;
            this.units = nameOrObj.units;
            this.quantity = nameOrObj.quantity;
        } else {
            this.recipeId = recipeId;
            this.ingredientId = ingredientId;
            this.name = nameOrObj;
            this.index = index;
            this.units = units;
            this.quantity = quantity;
        }
    }
    toString() {
        return ("{ \"recipeId\": " + this.recipeId +
            ", \"ingredientId\": " + this.ingredientId +
            ", \"index\": " + this.index +
            ", \"name\": \"" + this.name +
            "\", \"units\": " + this.units +
            "\", \"quantity\": " + this.quantity +
            " ] }");
    }
}