// Global app controller
import Search from './models/Search'
import * as SearchView from './views/searchView'
import {elements} from './views/base'
const state ={};
const controlSearch = () => {
    const query = SearchView.getInput();
    if(query){
        state.search = new Search(query);
        SearchView.clearInput();
        SearchView.clearResults();
        state.search.getResults().then(result =>{
            console.log(result);
            SearchView.renderResults(result);
                });
       
    }
}
elements.searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    controlSearch();
});