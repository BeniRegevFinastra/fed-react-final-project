/*  {
        "id": 1,
        "name": "Shakshuka #1",
        "desc": "Eggs dish with tomato",
        "img": "https://downshiftology.com/wp-content/uploads/2015/11/shakshuka-12.jpg",
        "duration": 15,
        "type": "Eggs",
        "userId": 1
    }
*/
class RecipeHeader {
    constructor(nameOrObj, id, desc, img, duration, type) {
        if (arguments === 1) {
            this.id = nameOrObj.id;
            this.name = nameOrObj.name;
            this.desc = nameOrObj.desc;
            this.img = nameOrObj.img;
            this.duration = nameOrObj.duration;
            this.type = nameOrObj.type;
        } else {
            this.id = id;
            this.name = nameOrObj;
            this.desc = desc;
            this.img = img;
            this.duration = duration;
            this.type = type;
        }
    }
    toString() {
        return("{ T.B.D. }");
    }

}