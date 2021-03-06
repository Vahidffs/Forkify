import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
    }
export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
    elements.searchResPage.innerHTML ="";
};
export const highlightSelected = id => {
    document.querySelector(`.results__link[href="${id}"]`).classList.add('result__link--active');
}
export const limitRecipeTitle = (title,limit = 17) => {
    const tempArray = [];
    if(title.length > limit){
        title.split(' ').reduce((acc,curr) =>{
            if(acc + curr.length <= limit){
                tempArray.push(curr);
            }
            return acc + curr.length;
        },0);
    }
    return `${tempArray.join(' ')}...`;
}
const createButton = (page,type) => {
        return  `
                <button class="btn-inline results__btn--${type}" data-goto="${type === 'next'? page +1: page -1}">
                    <span>Page ${type ==='prev' ? page -1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type == 'next'?'right' : 'left'}"></use>
                    </svg>
                </button>` };

const renderButtons = (page,numResults,resPerPage) =>{
    const pages = Math.ceil(numResults/resPerPage);
    let button;
    if(page ==1 && pages >1){
        button = createButton(page,'next');
    } else if (page < pages){
        button = `${createButton(page,'prev')}
        ${createButton(page,'next')}
        `;
    } else if (pages == pages && pages >1){
        button = createButton(page,'prev');
    }
    elements.searchResPage.insertAdjacentHTML('afterbegin',button);
}
export const renderResults = (recipes,page =1, resPerPage =10) => {
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start,end).forEach(element => {
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
    renderButtons(page,recipes.length,resPerPage);
}