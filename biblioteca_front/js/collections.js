document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const collectionsItem = document.getElementById('collections');
    const coll_div = document.getElementById('coll_div');
    const new_btn = document.getElementById('new_btn');
    const create_popup = document.getElementById('create_popup');
    const close_popup = document.getElementById('close_popup');

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

    window.onclick = function (event) {
        if (event.target == create_popup) {
            create_popup.style.display = 'none';
        } 
    }

    fetch('http://localhost:8080/api/collections/user_collection/1200')
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

                fetch(`http://localhost:8080/api/collection_books/count/${collection.collectionId}`)
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