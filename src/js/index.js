// Global app controller
import Search from './models/Search'
import * as SearchView from './views/searchView'
import * as RecipeView from './views/recipeView'
import {elements, renderLoader,clearLoader} from './views/base'
import Recipe from './models/Recipe';
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
            RecipeView.renderRecipe(state.recipe);
        })
        
    }
}
['hashchange','load'].forEach(e => window.addEventListener(e,controlRecipe));