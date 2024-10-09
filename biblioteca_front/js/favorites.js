document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const fav_button = document.querySelectorAll('.fav_button');
    const favorites_list= document.getElementById('favorites_list');

    fetch('http://localhost:8080/api/favorite/books/1200')
    .then(response => response.json())
    .then(favorites => {
       favorites.forEach(favorite => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('favorites_item');

        const bookImage = document.createElement('img');
        bookImage.classList.add('book_image');
        if (favorite.image) {
            bookImage.src = `data:image/jpeg;base64,${favorite.image}`;
        } else {
            bookImage.src = '/biblioteca_front/images/image_not_found.png'; 
        }              
        bookItem.appendChild(bookImage);

        const favImage = document.createElement('img');
        favImage.classList.add('fav_button');
        favImage.src = '/biblioteca_front/images/fav_hover.png';
        bo