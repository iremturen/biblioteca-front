document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const collectionsItem = document.getElementById('collections');
    const new_releases = document.getElementById('new_releases');
    const now_item = document.getElementById('now_item');

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

    now_item.addEventListener('click', () => {  
        redirectTo('now_reading.html');
    });

    fetch('http://localhost:8080/api/user_books/now_reading/count/1200')
    .then(response => response.text())
    .then(count => {
        const countElement = document.getElementById('dashboard_item_number_now');
        countElement.textContent = count;
    })

    fetch('http://localhost:8080/api/user_books/will_read/count/1200')
    .then(response => response.text())
    .then(count => {
        const countElement = document.getElementById('dashboard_item_number_will');
        countElement.textContent = count;
    })

    fetch('http://localhost:8080/api/user_books/finished/count/1200')
    .then(response => response.text())
    .then(count => {
        const countElement = document.getElementById('dashboard_item_number_finised');
        countElement.textContent = count;
    })
    

    fetch('http://localhost:8080/api/books/new_releases')
        .then(response => response.json())
        .then(books => {
            books.forEach(book => {
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

                new_releases.appendChild(bookItem);
            });
        })
});
