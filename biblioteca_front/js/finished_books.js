const homepageItem = document.getElementById('homepage');
const exploreItem = document.getElementById('explore');
const accountItem = document.getElementById('account');
const favoritesItem = document.getElementById('favorites');
const settingsItem = document.getElementById('settings');
const books = document.getElementById('books');
const search = document.getElementById('search');
let url = "http://localhost:8080/api/user_books/finished/1200";


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

search.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchFunc();
    }
});

function getBooks() {
    books.innerHTML = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(bookItem => {
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

                const date = document.createElement('p');
                date.classList.add('finished_date');
                date.textContent = bookItem.updated_at;
                book_item.appendChild(date);

            });
        });
}

getBooks();

function searchFunc() {
    const input = search.value.trim();
    if (input === "") {
        url = `http://localhost:8080/api/user_books/finished/1200`;
    } else {
        url = `http://localhost:8080/api/user_books/search/1200?type=3&pattern=${input}`;
    }
    getBooks();
}