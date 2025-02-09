import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const collectionsItem = document.getElementById('collections');
    const now_item = document.getElementById('now_item');
    const will_item = document.getElementById('will_item');
    const finished_item = document.getElementById('finished_item');
    const logo_text = document.querySelector('.logo_text');
    const menu = document.querySelector('.menu');
    const dashboard = document.querySelector('.dashboard');
    const prevArrow = document.getElementById('prev_arrow');
    const rightArrow = document.getElementById('right_arrow');
    const books_container = document.getElementById('books_container');
    const rec_button = document.getElementById('rec_button');
    const token = localStorage.getItem('authToken'); 
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

    function redirectTo(url) {
        const transitionOverlay = document.querySelector(".transition-overlay");
        transitionOverlay.classList.add("active");
    
        setTimeout(() => {
            window.location.href = url;
        }, 500);    
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        darkMode();
    }

    function darkMode() {
        menu.style.backgroundColor = '#373737';
        dashboard.style.backgroundColor = '#373737';
        logo_text.style.color = '#f3f3f3';
    }

    rec_button.addEventListener('click', () => {
        redirectTo('recommendation.html');
    });

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

    now_item.addEventListener('click', () => {
        redirectTo('now_reading.html');
    });

    will_item.addEventListener('click', () => {
        redirectTo('will_read.html');
    });

    finished_item.addEventListener('click', () => {
        redirectTo('finished_books.html');
    });

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('authToken'); 
        window.location.href = 'login.html';
    });

    function bookCountsByStatus(userId, status, element) {
        if (!token) {
            return;
        }

        fetch(`http://localhost:8080/api/user_books/count/${userId}?status=${status}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(count => {
                const countElement = document.getElementById(element);
                if (countElement) {
                    countElement.textContent = count;
                }
            })
            .catch(error => console.error('Error fetching book count:', error));
    }

    bookCountsByStatus(userId, 'NOW_READING', 'dashboard_item_number_now');
    bookCountsByStatus(userId, 'WILL_READ', 'dashboard_item_number_will');
    bookCountsByStatus(userId, 'FINISHED', 'dashboard_item_number_finised');

    let currentIndex = 0;
    const booksPerPage = 5;
    let books = [];

    function fetchBooks() {
        if (!token) {
            return;
        }

        fetch('http://localhost:8080/api/books/new_releases', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            books = data;
            displayBooks(currentIndex);
        })
        .catch(error => console.error('Error fetching new releases:', error));
    }
    fetchBooks();

    function displayBooks(index) {
        books_container.innerHTML = '';
        const visibleBooks = books.slice(index, index + booksPerPage);
        visibleBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book_item');

            const bookImage = document.createElement('img');
            bookImage.classList.add('book_image');
            if (book.image) {
                bookImage.src = `data:image/jpeg;base64,${book.image}`;
            } else {
                bookImage.src = '/biblioteca_front/images/image_not_found.png';
            }
            bookItem.appendChild(bookImage);

            bookItem.dataset.bookId = book.bookId;

            const bookTitle = document.createElement('p');
            bookTitle.classList.add('book_title');
            bookTitle.textContent = book.book_name;
            bookItem.appendChild(bookTitle);

            const bookAuthor = document.createElement('p');
            bookAuthor.classList.add('book_author');
            bookAuthor.textContent = book.author;
            bookItem.appendChild(bookAuthor);

            books_container.appendChild(bookItem);
        });
    }

    rightArrow.addEventListener('click', () => {
        if (currentIndex + booksPerPage < books.length) {
            currentIndex += booksPerPage;
            displayBooks(currentIndex);
        }
    });

    prevArrow.addEventListener('click', () => {
        if (currentIndex - booksPerPage >= 0) {
            currentIndex -= booksPerPage;
            displayBooks(currentIndex);
        }
    });
});