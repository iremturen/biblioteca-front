document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const settingsItem = document.getElementById('settings');
    const updateButton = document.getElementById('save_button');
    const name_title = document.getElementById('name_title');
    const email_title = document.getElementById('email_title');
    const profile_picture = document.getElementById('profile_picture');
    const savedColor = localStorage.getItem('profileBackgroundColor');
    const logo_text = document.querySelector('.logo_text');
    const menu = document.querySelector('.menu');
    const dashboard = document.querySelector('.dashboard');

    let user_name = "";

    if (localStorage.getItem('darkMode') === 'enabled') {
        darkMode();
    }

    function darkMode() {
        menu.style.backgroundColor = '#373737';
        dashboard.style.backgroundColor = '#373737';
        logo_text.style.color = '#f3f3f3';
    }

    function redirectTo(url) {
        window.location.href = url;
    }

    if (savedColor) {
        profile_picture.style.backgroundColor = savedColor;
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


    fetch('http://localhost:8080/api/users/1200')
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').value = data.username;
            document.getElementById('name').value = data.name;
            user_name = data.name + " " + data.surname;
            name_title.innerHTML = user_name;
            document.getElementById('surname').value = data.surname;
            document.getElementById('email').value = data.email;
            email_title.innerHTML = data.email;
            document.getElementById('tel_no').value = data.tel_no;
            document.getElementById('birth_date').value = data.birth_date;
            document.getElementById('city').value = data.city;
            document.getElementById('country').value = data.country;

        })
        .catch(error => console.error('Error:', error));


    updateButton.addEventListener('click', () => {
        const userId = 1200;
        const updatedUser = {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            tel_no: document.getElementById('tel_no').value,
            birth_date: document.getElementById('birth_date').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value
        };

        fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .then(data => {
           console.log('User updated successfully:', data);
            })
            .catch(error => console.error('Error:', error));
    });


});
