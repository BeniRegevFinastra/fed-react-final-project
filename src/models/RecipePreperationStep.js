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
            this.stepNum = descriptionOrObj.stepNum;
            this.description = descriptionOrObj.description;
        } else {
            this.recipeId = recipeId;
            this.stepNum = stepNum;
            this.description = descriptionOrObj;
        }
    }
}