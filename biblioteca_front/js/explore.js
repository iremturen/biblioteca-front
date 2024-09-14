document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.querySelector('.favorites');
    const dashboard = document.querySelector('.dashboard');

    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');

    const popupAuthor = document.getElementById('popupAuthor');
    const popupBookPage = document.getElementById('popupBookPage');
    const popupPHouse = document.getElementById('popupPHouse');
    const popupPYear = document.getElementById('popupPYear');
    const popupLang = document.getElementById('popupLang');
    const fav_button = document.querySelectorAll('.fav_button');

    fetch('http://localhost:8080/api/books')
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
                    bookImage.src = '/images/image_not_found.png'; 
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

                bookItem.addEventListener('click', () => {
                    const bookId = bookItem.dataset.bookId;
                    fetch(`http://localhost:8080/api/books/${bookId}`)
                        .then(response => response.json())
                        .then(bookDetails => {
                            if (book.image) {
                                popupImage.src = `data:image/jpeg;base64,${bookDetails.image}`;
                            } else {
                                popupImage.src = '/images/image_not_found.png'; 
                            }   
                            popupTitle.textContent = bookDetails.book_name;
                            popupAuthor.textContent = bookDetails.author;
                            popupBookPage.textContent = bookDetails.book_page;
                            popupPHouse.textContent = bookDetails.publishing_house;
                            popupPYear.textContent = bookDetails.publishing_year;
                            popupLang.textContent = bookDetails.language;
                            popup.style.display = 'flex';

                            fav_button.forEach((fav_button) => {
                                fav_button.addEventListener('click', () => {
                                    if (fav_button.getAttribute('src') === '/images/fav_hover.png') {
                                        fav_button.setAttribute('src', '/images/fav_book.png');
                                    } else {
                                        fav_button.setAttribute('src', '/images/fav_hover.png');
                                    }
                                });
                            });
                        })
                        .catch(error => console.error('Error fetching book details:', error));
                
                });

                dashboard.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error fetching books:', error));

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

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (!event.target.closest('.popup-content') && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    });


});
