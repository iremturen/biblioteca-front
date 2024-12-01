const homepageItem = document.getElementById('homepage');
const exploreItem = document.getElementById('explore');
const accountItem = document.getElementById('account');
const favoritesItem = document.getElementById('favorites');
const settingsItem = document.getElementById('settings');
const books = document.getElementById('books');
let url = `http://localhost:8080/api/user_books/1200?status=WILL_READ`; 

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
        .then(faq => {
            faq.forEach(bookItem => {

                const book_item = document.createElement('div');
                book_item.classList.add('book_item');
                books.appendChild(book_item);

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

                const remove = document.createElement('img');
                remove.classList.add('delete_item');
                remove.src = '/biblioteca_front/images/remove_book_list.png';
                remove.title = "Remove from list";
                funcs.appendChild(remove);

              


            
                
            });
        });

}
getBooks();

function searchFunc() {
    const input = search.value.trim();
    if (input === "") {
        url = `http://localhost:8080/api/user_books/will_read/1200`;
    } else {
        url = `http://localhost:8080/api/user_books/search/1200?type=2&pattern=${input}`;
    }
    getBooks();
}
