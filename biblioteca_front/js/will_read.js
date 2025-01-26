import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
AuthManager.checkToken();
const homepageItem = document.getElementById('homepage');
const exploreItem = document.getElementById('explore');
const accountItem = document.getElementById('account');
const collectionsItem = document.getElementById('collections');
const favoritesItem = document.getElementById('favorites');
const settingsItem = document.getElementById('settings');
const books = document.getElementById('books');

const token = localStorage.getItem('authToken'); 
const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

let url = `http://localhost:8080/api/user_books/${userId}?status=2`; 

function redirectTo(url) {
    window.location.href = url;
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

settingsItem.addEventListener('click', () => {
    redirectTo('settings.html');
});

collectionsItem.addEventListener('click', () => {
    redirectTo('collections.html');
});

search.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchFunc();
    }
});

function getBooks() {
    books.innerHTML = '';
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(faq => {
            faq.forEach(bookItem => {

                const book_item = document.createElement('div');
                book_item.classList.add('book_item');
                books.appendChild(book_item);

                const close = document.createElement('img');
                close.classList.add('remove_book');
                close.src = "/biblioteca_front/images/close.png";
                book_item.appendChild(close);
                
                const book_image = document.createElement('img');
                book_image.classList.add('book_image');
                book_image.src = `data:image/jpeg;base64,${bookItem.book.image}`;
                book_item.appendChild(book_image);

                const book_title = document.createElement('p');
                book_title.classList.add('book_title');
                book_title.textContent = bookItem.book.book_name;
                book_item.appendChild(book_title);

                const funcs = document.createElement('div');
                funcs.classList.add('funcs');
                book_item.appendChild(funcs);

                const start = document.createElement('img');
                start.classList.add('start_icon');
                start.src = '/biblioteca_front/images/start_book_list.png';
                start.title = "Start Reading";
                funcs.appendChild(start);

                const text_start = document.createElement('p');
                text_start.classList.add('start_text');
                text_start.textContent = 'Start Reading';
                funcs.appendChild(text_start);
  
            });
        });

}
getBooks();

function searchFunc() {
    const input = search.value.trim();
    if (input === "") {
        url = `http://localhost:8080/api/user_books/${userId}?status=2`;
    } else {
        url = `http://localhost:8080/api/user_books/${userId}?status=2&pattern=${input}`;
    }
    getBooks();
}
});