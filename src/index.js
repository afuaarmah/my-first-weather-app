function showSearch(event) {
    event.preventDefault();
let searchElement = document.querySelector("#search-input-form");

let cityElement = document.querySelector("#search-city");
cityElement.innerHTML=searchElement.value
}


let searchInputElement= document.querySelector("#search-input");
searchInputElement.addEventListener("submit",showSearch);