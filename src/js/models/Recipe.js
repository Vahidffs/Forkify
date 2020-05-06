import axios from 'axios'
export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`); 
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch(err){
            console.log(err);
            alert('Something Went Wrong!');
        }
    }
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods *15;
        return this.time;
    }
    calcServings(){
      return this.servings = 4;
    }
    parseIngredients(){
        //console.log(this.ingredients);
        const unitsLong = ['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitsShort,'kg','g'];
        const newIngredients = this.ingredients.map(element => {
            let ingredient = element.toLowerCase();
            unitsLong.forEach((el,i)=>{
                ingredient = ingredient.replace(el,unitsShort[i]);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            let objIng;
            if (unitIndex > -1){
                const arrCount = arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length ===1){
                    count = eval(arrIng[0].replace('-','+'));
                } else {
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    count,
                    unit:arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }
            } else if(parseInt(arrIng[0])){
                objIng = {
                    count: parseInt(arrIng[0]),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1){
                objIng = {
                    count: 1,
                    unit:'',
                    ingredient
                }
            }
          //  console.log(objIng);
            return objIng;
        });
        //console.log(newIngredients);
       this.ingredients = newIngredients;
    }
}