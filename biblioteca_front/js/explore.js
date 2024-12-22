document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.querySelector('.favorites');
    const dashboard = document.querySelector('.dashboard');
    const book_container = document.getElementById('book_container');

    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');

    const popupDescription = document.getElementById('popupDescription');
    const popupAuthor = document.getElementById('popupAuthor');
    const popupBookPage = document.getElementById('popupBookPage');
    const popupPHouse = document.getElementById('popupPHouse');
    const popupPYear = document.getElementById('popupPYear');
    const popupLang = document.getElementById('popupLang');
    const input_search=document.getElementById('input_search');
    const search_button=document.getElementById('search_button');
    let url= "http://localhost:8080/api/books";
    let userId = 1200;

    search_button.addEventListener('click', () => {
        const searchInput = input_search.value.trim();
        if (searchInput !== "") {
            url = `http://localhost:8080/api/books/search?pattern=${searchInput}`;
        }else {
            url = "http://localhost:8080/api/books"; 
        }
        getBooks(); 
    });

    input_search.addEventListener('keyup',(event) => {
        if (event.key === 'Enter') {
            search_button.click();
        }
    });

    function getBooks() {
     fetch(url)
        .then(response => response.json())
        .then(books => {
            dashboard.innerHTML = '';
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

                bookItem.addEventListener('click', () => {
                    const bookId = bookItem.dataset.bookId;
                    fetch(`http://localhost:8080/api/books/${bookId}`)
                        .then(response => response.json())
                        .then(bookDetails => {
                            if (book.image) {
                                popupImage.src = `data:image/jpeg;base64,${bookDetails.image}`;
                            } else {
                                popupImage.src = '/biblioteca_front/images/image_not_found.png'; 
                            } 
                            popupDescription.textContent = bookDetails.description;  
                            popupTitle.textContent = bookDetails.book_name;
                            popupAuthor.textContent = bookDetails.author;
                            popupBookPage.textContent = bookDetails.book_page;
                            popupPHouse.textContent = bookDetails.publishing_house;
                            popupPYear.textContent = bookDetails.publishing_year;
                            popupLang.textContent = bookDetails.language;
                            popup.style.display = 'flex';
                            const fav_button = document.getElementById('fav_button');
                            checkIfFavorite(bookId, userId, fav_button);

                        })
                        .catch(error => console.error('Error fetching book details:', error));
                
                });

                dashboard.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
    }

    function checkIfFavorite(bookId, userId, fav_button) {
        fetch(`http://localhost:8080/api/favorite/${bookId}?userId=${userId}`)
            .then(response => response.json())
            .then(favorite => {
                if (favorite) {
                    fav_button.src = '/biblioteca_front/images/fav_hover.png';
                } else {
                    fav_button.src = '/biblioteca_front/images/fav_book.png';
                }

                fav_button.onclick = () => {
                    if (fav_button.getAttribute('src').includes('fav_hover.png')) {
                        removeFromFavorites(bookId, userId, fav_button);
                    } else {
                        addToFavorites(bookId, userId, fav_button);
                    }
                };
                
            })

    }

    function addToFavorites(bookId, userId, fav_button) {
        fetch(`http://localhost:8080/api/favorite/add/user/${userId}/book/${bookId}`, {
            method: 'POST'
        })
        .then(() => {
            fav_button.setAttribute('src', '/biblioteca_front/images/fav_hover.png'); 
        })
        .catch(error => console.error('Error adding to favorites:', error));
    }

    function removeFromFavorites(bookId, userId, fav_button) {
        fetch(`http://localhost:8080/api/favorite/remove/user/${userId}/book/${bookId}`, {
            method: 'POST'
        })
        .then(() => {
            fav_button.setAttribute('src', '/biblioteca_front/images/fav_book.png'); 
        })
        .catch(error => console.error('Error removing from favorites:', error));
    }

    getBooks();

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