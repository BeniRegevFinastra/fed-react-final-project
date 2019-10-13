/*  {
        "recipeId": 1,
        "stepNumber": 1,
        "description": "Wash the tametos and cut them to small cubes"
    }
 */
class RecipePreperationStep {
    constructor(descriptionOrObj, recipeId, stepNum) {
        if (arguments.length === 1) {
            //  First and only argument is an object
            this.recipeId = descriptionOrObj.recipeId;
            this.stepNumber = descriptionOrObj.stepNumber;
            this.description = descriptionOrObj.description;
        } else {
            this.recipeId = recipeId;
            this.stepNumber = stepNumber;
            this.description = descriptionOrObj;
        }
    }
    
    toString() {
        return ("{ \"recipeId\": " + this.recipeId +
            ", \"stepNumber\": " + this.stepNumber +
            ", \"description\": \"" + this.description + 
            "\" }");
    }
}