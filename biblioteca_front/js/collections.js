document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const collectionsItem = document.getElementById('collections');
    const coll_div = document.getElementById('coll_div');

    function redirectTo(url) {
        window.location.href  = url;
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

            const collectionDescription = document.createElement('div');
            collectionDescription.classList.add('description');
            collectionDescription.textContent = collection.description;
            collectionItem.appendChild(collectionDescription);

            collectionItem.addEventListener('click', () => {    
         