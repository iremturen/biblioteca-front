import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const collectionsItem = document.getElementById('collections');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const fav_button = document.querySelectorAll('.fav_button');
    const favorites_list= document.getElementById('favorites_list');
    const logo_text = document.querySelector('.logo_text');
    const menu = document.querySelector('.menu');
    const dashboard = document.querySelector('.dashboard');
    const token = localStorage.getItem('authToken'); 
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        darkMode();
    }

    function darkMode() {
        menu.style.backgroundColor = '#373737';
        dashboard.style.backgroundColor = '#373737';
        logo_text.style.color = '#f3f3f3';
    }

    fetch(`http://localhost:8080/api/favorite/books/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
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
        bookItem.appendChild(favImage);

        const favorites_text= document.createElement('div');
        favorites_text.classList.add('favorites_text');
        const book_title = document.createElement('p');
        book_title.textContent = favorite.book_name;
        book_title.classList.add('book_title');
        const book_author = document.createElement('p');
        book_author.classList.add('book_author');
        book_author.textContent = favorite.author;
        favorites_text.appendChild(book_author);
        favorites_text.appendChild(book_title);
        
        bookItem.appendChild(favorites_text);

        favorites_list.appendChild(bookItem);

        const book_id = favorite.bookId;
        favImage.addEventListener('click', () => {
            if (favImage.getAttribute('src') === '/biblioteca_front/images/fav_hover.png') {
                fetch(`http://localhost:8080/api/favorite/remove/user/${userId}/book/${book_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                favImage.setAttribute('src', '/biblioteca_front/images/fav_book.png');
            } else {
                fetch(`http://localhost:8080/api/favorite/add/user/${userId}/book/${book_id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                favImage.setAttribute('src', '/biblioteca_front/images/fav_hover.png');
            }
        });

       });
    });


    function redirectTo(url) {
        const transitionOverlay = document.querySelector(".transition-overlay");
        transitionOverlay.classList.add("active");
    
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }

    homepageItem.addEventListener('click', () => {
        redirectTo('homepage.html'); 
    });

    exploreItem.addEventListener('click', () => {
        redirectTo('explore.html'); 
    });

    accountItem.addEventListener('click', () => { 
        redirectTo('account.html'); 
    });

    favoritesItem.addEventListener('click', () => {
        redirectTo('favorites.html'); 
    });

    collectionsItem.addEventListener('click', () => {
        redirectTo('collections.html'); 
    });

    settingsItem.addEventListener('click', () => {
        redirectTo('settings.html'); 
    });

});