// Global app controller
import Search from './models/Search'
import * as SearchView from './views/searchView'
import * as RecipeView from './views/recipeView'
import * as ListView from './views/listView'
import * as LikesView from './views/likesView'
import List from './models/List'
import Likes from './models/Likes'
import {elements, renderLoader,clearLoader} from './views/base'
import Recipe from './models/Recipe';
import likes from './models/Likes'
const state ={};
const controlSearch = () => {
    const query = SearchView.getInput();
    if(query){
        state.search = new Search(query);
        SearchView.clearInput();
        SearchView.clearResults();
        renderLoader(elements.searchResults);
        state.search.getResults().then(result =>{
            console.log(result);
            state.search.result = result;
            SearchView.renderResults(result);
            clearLoader();
                });
       
    }
}
elements.searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    controlSearch();
});
elements.searchResPage.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        SearchView.clearResults();
        SearchView.renderResults(state.search.result,goToPage);
    }
});
const controlRecipe =() =>{
    const id = window.location.hash.replace('#','');
    if (id){
        state.recipe = new Recipe(id);
        renderLoader(elements.recipe);
        state.recipe.getRecipe().then(() =>{
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            RecipeView.clearRecipe();
            clearLoader();
            RecipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
        })
        
    }
}
['hashchange','load'].forEach(e => window.addEventListener(e,controlRecipe));


const controlList = () => {
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el =>{
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        ListView.renderItem(item);
    });
}
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currenID = state.recipe.id;
    if (!state.likes.isLiked()){
        const newLike = state.likes.addLike(currenID,state.recipe.title,state.recipe.author,state.recipe.img);
        LikesView.togglelikeBtn(true);
    }else {
        state.likes.deleteLike(currenID);
        console.log(state.likes);
        LikesView.togglelikeBtn(true);
        LikesView.renderLike(newLike);
    }
    LikesView.togglelikeBtn(state.likes.getNumLikes());
}






elements.shopping.addEventListener('click', e => {
    const id  = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        ListView.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value,10);
        state.list.updaeCount(id,val);
    }
})
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1 )
        state.recipe.updateServings('dec');
        RecipeView.updateServingsIngredients(state.recipe);
    }
    if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        RecipeView.updateServingsIngredients(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});


window.addEventListener('load',()=>{
    state.likes = new Likes();
    state.likes.readData();
    LikesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => LikesView.renderLike(like));
});