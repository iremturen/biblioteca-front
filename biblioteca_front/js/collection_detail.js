import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const back_logo = document.getElementById('back_logo');
    const back_text = document.getElementById('back_text');
    const remove_popup = document.getElementById('remove_popup');
    const confirm_remove = document.getElementById('confirm_remove');
    const cancel_remove = document.getElementById('cancel_remove');
    const edit_collection = document.getElementById('edit_collection');
    const edit_popup = document.getElementById('edit_popup');
    const collection_img = document.getElementById('collection_img');
    const collection_title = document.getElementById('collection_title');
    const description = document.getElementById('description');
    const close_popup = document.getElementById('close_popup');
    const more = document.getElementById('more');
    const dropdown_content = document.getElementById('dropdown_content');
    const sort_dropdown = document.getElementById('sort_dropdown');
    const sort_text = document.getElementById('sort_text');
    const delete_coll = document.getElementById('delete_coll');
    const remove_collection_popup = document.getElementById('remove_collection_popup');
    const cancel_delete_coll = document.getElementById('cancel_delete');
    const books_div = document.getElementById('books');
    const empty_text = document.getElementById('empty_text');
    const search_logo = document.getElementById('search_logo');
    const search_input = document.getElementById('search_input');
    const edit_img = document.getElementById('edit_img');
    const popup_title = document.getElementById('popup_title');
    const popup_description = document.getElementById('popup_description');

    const share_close_popup = document.getElementById('share_close_popup');
    const share_popup = document.getElementById('share_popup');
    const share_collection = document.getElementById('share_coll');
    const shareFacebook = document.getElementById('share_facebook');
    const shareWhatsapp = document.getElementById('share_whatsapp');
    const shareX = document.getElementById('share_x');
    const shareInstagram = document.getElementById('share_instagram');
    const shareTelegram = document.getElementById('share_telegram');
    const link_input = document.getElementById('link_input');
    const copy_btn = document.getElementById('copy_btn');
    const copy_msg = document.getElementById('copy_msg');

    const save_btn = document.getElementById('save_btn');
    const cancel_btn = document.getElementById('cancel_btn');
    const add_book = document.getElementById('add_book');
    const add_popup = document.getElementById('add_popup');
    const add_close_popup = document.getElementById('add_close_popup');
    const popup_books = document.getElementById('popup_books');
    const add_books_btn = document.getElementById('add_books_btn');
    const add_search = document.getElementById('add_search');
    const cover_photo_input = document.getElementById('cover_photo_input');
    const confirm_delete = document.getElementById('confirm_delete');
    const confirm_remove_book = document.getElementById('confirm_remove_book');
    let selectedBooks = [];

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

    const collectionId = localStorage.getItem('collectionId');
    let url = `http://localhost:8080/api/collection_books/${collectionId}`;

    fetch(`http://localhost:8080/api/collections/${collectionId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(collection_info => {
            collection_img.setAttribute('src', `data:image/jpeg;base64,${collection_info.cover}`);
            collection_title.innerHTML = collection_info.collection_name;
            description.innerHTML = collection_info.description;

            edit_img.setAttribute('src', `data:image/jpeg;base64,${collection_info.cover}`);
            popup_title.value = collection_info.collection_name;
            popup_description.value = collection_info.description;
        });

    back_logo.addEventListener('click', () => {
        const transitionOverlay = document.querySelector(".transition-overlay");
        transitionOverlay.classList.add("active");

        setTimeout(() => {
            window.location.href = 'collections.html';
        }, 500);
    });

    back_text.addEventListener('click', () => {
        const transitionOverlay = document.querySelector(".transition-overlay");
        transitionOverlay.classList.add("active");

        setTimeout(() => {
            window.location.href = 'collections.html';
        }, 500);
    });

    confirm_remove.addEventListener('click', () => {
        remove_popup.style.display = 'none';
    });

    cancel_remove.addEventListener('click', () => {
        remove_popup.style.display = 'none';
    });

    edit_collection.addEventListener('click', () => {
        edit_popup.style.display = 'flex';
    });

    close_popup.addEventListener('click', () => {
        edit_popup.style.display = 'none';
    });

    cancel_btn.addEventListener('click', () => {
        edit_popup.style.display = 'none';
    });

    more.addEventListener('mouseover', () => {
        dropdown_content.style.display = 'flex';
    });

    more.addEventListener('mouseout', () => {
        dropdown_content.style.display = 'none';
    });

    dropdown_content.addEventListener('mouseover', () => {
        dropdown_content.style.display = 'flex';
    });

    dropdown_content.addEventListener('mouseout', () => {
        dropdown_content.style.display = 'none';
    });

    delete_coll.addEventListener('click', () => {
        remove_collection_popup.style.display = 'flex';
    });

    cancel_delete_coll.addEventListener('click', () => {
        remove_collection_popup.style.display = 'none';
    });

    add_book.addEventListener('click', () => {
        add_popup.style.display = 'flex';
        fetchBooks();
    });

    add_search.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            fetchBooks();
        }
    });

    const booksUrl = 'http://localhost:8080/api/books';

    function fetchBooks() {
        let url = booksUrl;

        if (add_search.value.trim() != "") {
            url = `http://localhost:8080/api/books?pattern=${add_search.value}`;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(books => {
                popup_books.innerHTML = "";
                books.forEach(book => {
                    const add_book_item = document.createElement('div');
                    add_book_item.classList.add('add_book_item');
                    popup_books.appendChild(add_book_item);

                    const book_item_img = document.createElement('img');
                    book_item_img.classList.add('book_item_img');
                    book_item_img.src = `data:image/jpeg;base64,${book.image}`;
                    add_book_item.appendChild(book_item_img);

                    const popup_book_info = document.createElement('div');
                    popup_book_info.classList.add('popup_book_info');
                    add_book_item.appendChild(popup_book_info);

                    const popup_book_title = document.createElement('p');
                    popup_book_title.classList.add('popup_book_title');
                    popup_book_title.textContent = book.book_name;
                    popup_book_info.appendChild(popup_book_title);

                    const popup_book_author = document.createElement('p');
                    popup_book_author.classList.add('popup_book_author');
                    popup_book_author.textContent = book.author;
                    popup_book_info.appendChild(popup_book_author);

                    const add_checkbox = document.createElement('input');
                    add_checkbox.setAttribute('type', 'checkbox');
                    add_checkbox.classList.add('add_checkbox');
                    add_checkbox.dataset.bookId = book.id;
                    add_checkbox.setAttribute('id', 'add_checkbox');
                    add_book_item.appendChild(add_checkbox);

                    add_checkbox.addEventListener('change', (event) => {
                        updateSelectedBooks(event, book.bookId);
                    });
                });
            });
    }

    function updateSelectedBooks(event, bookId) {
        if (event.target.checked) {
            selectedBooks.push(bookId);
        } else {
            selectedBooks = selectedBooks.filter(id => id !== bookId);
        }
    }

    add_books_btn.addEventListener('click', () => {
        fetch(`http://localhost:8080/api/collection_books/add/${collectionId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedBooks)
        })
            .then(response => {
                if (response.ok) {
                    location.reload();
                    return response.json();
                } else {
                    throw new Error('Failed to add books to collection');
                }
            })

    });

    add_close_popup.addEventListener('click', () => {
        add_popup.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target == remove_popup) {
            remove_popup.style.display = 'none';
        } else if (event.target == edit_popup) {
            edit_popup.style.display = 'none';
        } else if (event.target == remove_collection_popup) {
            remove_collection_popup.style.display = 'none';
        } else if (event.target == add_popup) {
            add_popup.style.display = 'none';
        }
    }

    search_logo.addEventListener('click', () => {
        const input = search_input.value.trim();
        if (input == "") {
            url = `http://localhost:8080/api/collection_books/${collectionId}`;
        } else {
            url = `http://localhost:8080/api/collection_books/${collectionId}?pattern=${input}`;
        }
        getBooks();
    });

    cover_photo_input.addEventListener('change', () => {
        const file = cover_photo_input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                edit_img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    save_btn.addEventListener('click', () => {
        const base64Image = edit_img.src.split(",")[1];
        const update = {
            collection_name: popup_title.value,
            description: popup_description.value,
            cover: base64Image
        };

        fetch(`http://localhost:8080/api/collections/update/${collectionId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        })

            .then(response => {
                if (response.ok) {
                    location.reload();
                    return response.json();
                } else {
                    throw new Error('Failed to update collection');
                }
            })

    });

    confirm_delete.addEventListener('click', () => {
        fetch(`http://localhost:8080/api/collections/${collectionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    message_popup.style.display = 'flex';
                    setTimeout(() => {
                        window.location.href = 'collections.html';
                    }, 3000);
                }
            });
    });

    search_input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            search_logo.click();
        }
    });

    const sort = document.querySelectorAll('#sort_dropdown a');
    sort.forEach(link => {
        link.addEventListener('click', (event) => {
            const sortParam = link.id.replace('sort_', '');
            url = `http://localhost:8080/api/collection_books/${collectionId}?sortBy=${sortParam}`;
            getBooks();
        });
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
                let counter = 1;

                if (books.length === 0) {
                    empty_text.style.display = 'flex';
                }

                books_div.innerHTML = '';
                books.forEach(book => {
                    const book_item = document.createElement('div');
                    book_item.classList.add('book_item');
                    book_item.setAttribute('id', 'book_item');

                    const book_number = document.createElement('p');
                    book_number.classList.add('item_text');
                    book_number.setAttribute('id', 'book_num');
                    book_number.textContent = counter++;
                    book_item.appendChild(book_number);

                    const book_image = document.createElement('img');
                    book_image.classList.add('item_img');
                    book_image.setAttribute('id', 'book_img');
                    if (book.image) {
                        book_image.src = `data:image/jpeg;base64,${book.image}`;
                    } else {
                        book_image.src = '/biblioteca_front/images/image_not_found.png';
                    }
                    book_item.appendChild(book_image);

                    const book_name = document.createElement('p');
                    book_name.classList.add('item_text');
                    book_name.setAttribute('id', 'book_name');
                    book_name.textContent = book.book_name;
                    book_item.appendChild(book_name);

                    const book_author = document.createElement('p');
                    book_author.classList.add('item_text');
                    book_author.setAttribute('id', 'book_author');
                    book_author.textContent = book.author;
                    book_item.appendChild(book_author);

                    const book_publishing = document.createElement('p');
                    book_publishing.classList.add('item_text');
                    book_publishing.setAttribute('id', 'book_publishing');
                    book_publishing.textContent = book.publishing_house;
                    book_item.appendChild(book_publishing);

                    const book_page = document.createElement('p');
                    book_page.classList.add('item_text');
                    book_page.setAttribute('id', 'book_page');
                    book_page.textContent = book.book_page;
                    book_item.appendChild(book_page);

                    const remove_book_img = document.createElement('img');
                    remove_book_img.setAttribute('id', 'remove_book');
                    remove_book_img.src = '/biblioteca_front/images/remove_book_list.png';
                    book_item.appendChild(remove_book_img);

                    books_div.appendChild(book_item);

                    remove_book_img.addEventListener('click', () => {
                        confirm_remove.dataset.bookId = book.bookId;
                        remove_popup.style.display = 'flex';
                    });



                });
            });
    }
    getBooks();

    confirm_remove.addEventListener('click', () => {
        const bookId = confirm_remove.dataset.bookId;
        fetch(`http://localhost:8080/api/collection_books/remove`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                collectionId: collectionId,
                bookId: bookId
            })
        })
            .then(response => {
                if (response.ok) {
                    location.reload();
                    return response.json();
                }
            });
    });

    sort_text.addEventListener('mouseover', () => {
        sort_dropdown.style.display = 'flex';
    });

    sort_text.addEventListener('mouseout', () => {
        sort_dropdown.style.display = 'none';
    });

    sort_dropdown.addEventListener('mouseover', () => {
        sort_dropdown.style.display = 'flex';
    });

    sort_dropdown.addEventListener('mouseout', () => {
        sort_dropdown.style.display = 'none';
    });

    share_collection.addEventListener('click', () => {
        const link = window.location.href;
        share_popup.style.display = 'flex';
        link_input.value = link;

        shareFacebook.addEventListener('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, "_blank");
        });

        shareWhatsapp.addEventListener('click', () => {
            window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, "_blank");
        });

        shareX.addEventListener('click', () => {
            window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(link)}`, "_blank");
        });

        shareInstagram.addEventListener('click', () => {
            window.open(`https://www.instagram.com/?url=${encodeURIComponent(link)}`, "_blank");
        });

        shareTelegram.addEventListener('click', () => {
            window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}`, "_blank");
        });

        copy_btn.addEventListener('click', () => {
            link_input.select();
            link_input.setSelectionRange(0, 99999);
            document.execCommand('copy');
            copy_msg.style.display = 'flex';
            setTimeout(() => {
                copy_msg.style.display = 'none';
            }, 3000);
        });

        share_close_popup.addEventListener('click', () => {
            share_popup.style.display = 'none';
        });

    });




});
