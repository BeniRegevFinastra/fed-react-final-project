/*
    RecipeHeader = Object
    recipeIndredients[] = Array of object type {RecipeIndredient} class
    recipePreperationSteps[] = Array of objects type {RecipePreperationStep} class
 */
class Recipe {
    constructor(recipeHeaderOrObj, recipeIndredients, recipePreperationSteps) {
        if (argument === 1 ) {
            this.recipeHeader = recipeHeaderOrObj.recipeHeader; 
            this.recipeIndredients = recipeHeaderOrObj.recipeIndredients;
            this.recipePreperationSteps = recipeHeaderOrObj.recipePreperationSteps;
        } else {
            this.recipeHeader = recipeHeaderOrObj;
            this.recipeIndredients = recipeIndredients;
            this.recipePreperationSteps = recipePreperationSteps;
        }
    }
    toString() {
        return("{ T.B.D. }");
    }
}