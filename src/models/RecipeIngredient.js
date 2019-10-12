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
        if (arguments === 1) {
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
        return("{ T.B.D. }");
    }
}