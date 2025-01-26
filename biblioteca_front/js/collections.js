import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const collectionsItem = document.getElementById('collections');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const coll_div = document.getElementById('coll_div');
    const new_btn = document.getElementById('new_btn');
    const create_popup = document.getElementById('create_popup');
    const close_popup = document.getElementById('close_popup');
    const cancel_btn = document.getElementById('cancel_btn');
    const save_btn = document.getElementById('save_btn');
    const popup_title = document.getElementById('popup_title');
    const popup_description = document.getElementById('popup_description');
    const message_popup= document.getElementById('message_popup');
    
    const token = localStorage.getItem('authToken'); 
    const local_userId = localStorage.getItem('userId');

    if (!local_userId || !token) {
        console.error('User or token not found');
        return;
    }

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

    new_btn.addEventListener('click', () => {
        create_popup.style.display = 'flex';
    });

    close_popup.addEventListener('click', () => {
        create_popup.style.display = 'none';
    });

    cancel_btn.addEventListener('click', () => {
        create_popup.style.display = 'none';
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
        fetch('http://localhost:8080/api/collections', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                collection_name: popup_title.value,
                description: popup_description.value,
                cover: edit_img.src.split(",")[1],
                userId:local_userId
            })
        })
        .then(response => {
            if (response.ok) {
                message_popup.style.display = 'flex';
                setTimeout(() => {
                    location.reload(); 
                }, 3000);
            }
        });
    });

    fetch(`http://localhost:8080/api/collections/user_collection/${local_userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
        .then(data => {
            data.forEach(collection => {
                const collectionItem = document.createElement('div');
                collectionItem.classList.add('collections_item');

                const cover = document.createElement('img');
                cover.classList.add('cover');
                if (collection.cover) {
                    cover.src = `data:image/jpeg;base64,${collection.cover}`;
                } else {
                    cover.src = '/biblioteca_front/images/image_not_found.png';
                }
                collectionItem.appendChild(cover);
                collectionItem.dataset.collectionId = collection.collectionId;

                fetch(`http://localhost:8080/api/collection_books/count/${collection.collectionId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                    .then(count => {
                        const bookCount = document.createElement('p');
                        bookCount.classList.add('item_num');
                        bookCount.textContent = `${count}`;
                        collectionItem.appendChild(bookCount);
                    });

                const collectionTitle = document.createElement('p');
                collectionTitle.classList.add('item_title');
                collectionTitle.textContent = collection.collection_name;
                collectionItem.appendChild(collectionTitle);

                collectionItem.addEventListener('click', () => {
                    const collectionId = collection.collectionId;
                    localStorage.setItem('collectionId', collectionId);
                    window.location.href = 'collection_detail.html';
                });

                coll_div.appendChild(collectionItem);
            });
        });
});