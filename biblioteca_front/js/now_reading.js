document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const collectionsItem = document.getElementById('collections');

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

    collectionsItem.addEventListener('click', () => {
        redirectTo('collections.html');
    });

});
