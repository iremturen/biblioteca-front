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
const search = document.getElementById('search');
const stars = document.querySelectorAll('.star');
const popup = document.getElementById('popup');
const close_popup = document.getElementById('close_popup');
const send_button = document.getElementById('send_button');
const thanks_msg = document.getElementById('thanks_msg');
let selectedRating = 0;
let bookId = 0;

const token = localStorage.getItem('authToken'); 
const userId = localStorage.getItem('userId');
if (!userId || !token) {
    console.error('User or token not found');
    return;
}

let url = `http://localhost:8080/api/user_books/${userId}?status=3`; 


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

settingsItem.addEventListener('click', () => {
    redirectTo('settings.html');
});

collectionsItem.addEventListener('click', () => {
    redirectTo('collections.html');
});

close_popup.addEventListener('click', () => {
    popup.style.display = 'none';
});

search.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchFunc();
    }
});

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating = stars.length - index; 
        stars.forEach(s => s.classList.remove('selected')); 
        for (let i = stars.length - 1; i >= stars.length - selectedRating; i--) {
            stars[i].classList.add('selected'); 
        }
    });
});


send_button.addEventListener('click', () => {
    if (selectedRating === 0) {
        thanks_msg.style.display = 'flex';
        thanks_msg.style.marginLeft = '130px';
        thanks_msg.textContent = 'Please select a rating before submitting.';
        return;
    }

        const ratingMessage = {
            actionType: "ADD",
            userId: userId,
            bookId: bookId,
            rating: selectedRating,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

    fetch(`http://localhost:8080/ratings/send`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingMessage) 
    })
    .then(response => {
        if (response.ok) {
            thanks_msg.style.display = 'flex';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 2000);         } 
        else {
            thanks_msg.textContent = 'Failed to save rating.';
        }
        });
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
        .then(data => {
            data.forEach(bookItem => {
                const book_item = document.createElement('div');
                book_item.classList.add('book_item');
                books.appendChild(book_item);

                const remove = document.createElement('img');
                remove.classList.add('remove_book');
                remove.src = "/biblioteca_front/images/close.png";
                book_item.appendChild(remove);

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

                const comment= document.createElement('div');
                comment.classList.add('comment');
                comment.textContent = 'Share your thoughts !';
                book_item.appendChild(comment);

                comment.addEventListener('click', () => {
                    popup.style.display = 'flex';
                    bookId = bookItem.bookId;
                });

                remove.addEventListener('click', () => {
                    fetch(`http://localhost:8080/api/user_books/remove/${bookItem.bookId}?userId=${userId}&type=3`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'            
                        },
                    })
                    .then(response => {
                        if (response.ok) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        } else {
                            console.error('Failed to remove book.');
                        }
                    });
                });
            });
        });
}

getBooks();

function searchFunc() {
    const input = search.value.trim();
    if (input === "") {
        url = `http://localhost:8080/api/user_books/${userId}?status=3`;
    } else {
        url = `http://localhost:8080/api/user_books/${userId}?status=3&pattern=${input}`;
    }
    getBooks();
}
});