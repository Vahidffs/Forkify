import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
    }
export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
};
export const renderResults = recipes => {
    recipes.forEach(element => {
        const markup = `
        <li>
            <a class="results__link" href="#${element.recipe_id}">
                <figure class="results__fig">
                    <img src="${element.image_url}" alt="${element.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${element.title}</h4>
                    <p class="results__author">${element.publisher}</p>
                </div>
            </a>
        </li>`;
        elements.searchResultList.insertAdjacentHTML('beforeend',markup);
    });
}