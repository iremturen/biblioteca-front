document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const fav_button = document.querySelectorAll('.fav_button');

    
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

    fav_button.forEach((fav_button) => {
        fav_button.addEventListener('click', () => {
            if (fav_button.getAttribute('src') === '/images/fav_hover.png') {
                fav_button.setAttribute('src', '/images/fav_book.png');
            } else {
                fav_button.setAttribute('src', '/images/fav_hover.png');
            }
        });
    });

});
