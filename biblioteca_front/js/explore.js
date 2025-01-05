import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const dashboard = document.querySelector('.dashboard');

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

    const add_now=document.getElementById('add_now');
    const add_will=document.getElementById('add_will');
    const add_finished=document.getElementById('add_finished');
    const msg_div=document.getElementById('msg_div');

    let url= "http://localhost:8080/api/books";
    const token = localStorage.getItem('authToken'); 
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

    search_button.addEventListener('click', () => {
        const searchInput = input_search.value.trim();
        if (searchInput !== "") {
            url = `http://localhost:8080/api/books?pattern=${searchInput}`;
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
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
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
                    fetch(`http://localhost:8080/api/books/${bookId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
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

                            add_now.addEventListener('click', () => {
                                fetch(`http://localhost:8080/api/user_books/add/${bookId}?status=1&userId=${userId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(() => {
                                    setTimeout(() => {
                                        msg_div.style.display = 'flex'; 
                                        setTimeout(() => {
                                            msg_div.style.display = 'none'; 
                                        }, 3000); 
                                    }, 3000); 
                                })
                                .catch((error) => {
                                    console.error('Hata oluştu:', error);
                                });
                            });
                        
                            add_will.addEventListener('click', () => {
                                fetch(`http://localhost:8080/api/user_books/add/${bookId}?status=2&userId=${userId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(() => {
                                    setTimeout(() => {
                                        msg_div.style.display = 'flex'; 
                                        setTimeout(() => {
                                            msg_div.style.display = 'none'; 
                                        }, 3000); 
                                    }, 3000); 
                                })
                                .catch((error) => {
                                    console.error('Hata oluştu:', error);
                                });
                            });
                        
                            add_finished.addEventListener('click', () => {
                                fetch(`http://localhost:8080/api/user_books/add/${bookId}?status=3&userId=${userId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(() => {
                                    setTimeout(() => {
                                        msg_div.style.display = 'flex'; 
                                        setTimeout(() => {
                                            msg_div.style.display = 'none'; 
                                        }, 3000); 
                                    }, 3000); 
                                })
                                .catch((error) => {
                                    console.error('Hata oluştu:', error);
                                });
                            });

                        })
                        .catch(error => console.error('Error fetching book details:', error));
                
                });

                dashboard.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
    }

    function checkIfFavorite(bookId, userId, fav_button) {
        fetch(`http://localhost:8080/api/favorite/${bookId}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
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
        .catch(error => {
            console.error('Error:', error);
        });
    }
    

    function addToFavorites(bookId, userId, fav_button) {
        fetch(`http://localhost:8080/api/favorite/add/user/${userId}/book/${bookId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            fav_button.setAttribute('src', '/biblioteca_front/images/fav_hover.png'); 
        })
        .catch(error => console.error('Error adding to favorites:', error));
    }

    function removeFromFavorites(bookId, userId, fav_button) {
        fetch(`http://localhost:8080/api/favorite/remove/user/${userId}/book/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
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