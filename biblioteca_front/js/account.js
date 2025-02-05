import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const collectionsItem = document.getElementById('collections');
    const settingsItem = document.getElementById('settings');
    const updateButton = document.getElementById('save_button');
    const profile_image = document.getElementById('profile_image');
    const savedColor = localStorage.getItem('profileBackgroundColor');
    const logo_text = document.querySelector('.logo_text');
    const menu = document.querySelector('.menu');
    const dashboard = document.querySelector('.dashboard');
    const cover_photo_input = document.getElementById('cover_photo_input');
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

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
        profile_image.style.border = `5px solid ${savedColor}`;
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

    settingsItem.addEventListener('click', () => {
        redirectTo('settings.html');
    });

    fetch(`http://localhost:8080/api/users/${userId}`, { 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').value = data.username;
            document.getElementById('name').value = data.name;
            document.getElementById('surname').value = data.surname;
            document.getElementById('email').value = data.email;
            document.getElementById('tel_no').value = data.tel_no;
            document.getElementById('birth_date').value = data.birth_date;
            document.getElementById('city').value = data.city;
            document.getElementById('country').value = data.country;
            document.getElementById('profile_image').src = `data:image/jpeg;base64,${data.profile_image}`;

        })
        .catch(error => console.error('Error:', error));


    updateButton.addEventListener('click', async() => {
        const base64Image = profile_image.src.split(",")[1];
        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const warning = document.getElementById('warning');
        const telNo = document.getElementById('tel_no').value;
        const phoneRegex = /^\+?\d{10,15}$/; 

        if (!username || !name || !surname || !email) {
            warning.style.display = 'block'; 
            return; 
        } else {
            warning.style.display = 'none'; 
        }

        if (!isValidPhoneNumber(telNo)) {
            warning.style.display = 'block';
            warning.innerHTML = 'Please enter a valid phone number with a length between 4 and 15 digits.';
            return;
        } 

        if (!phoneRegex.test(telNo)) {
            warning.style.display = 'block';
            warning.innerHTML = 'Please enter a valid phone number with country code.';
            return;
        } else {
            warning.style.display = 'none'; 
        }

        if(birth_date.value > new Date().toISOString().split('T')[0]) {
            warning.style.display = 'block';
            warning.innerHTML = 'Enter a valid date.';
            return;
        }else{
            warning.style.display = 'none';
        }
        
        const updatedUser = {
            username,
            name,
            surname,
            email,
            tel_no: document.getElementById('tel_no').value,
            birth_date: document.getElementById('birth_date').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
            profile_image: base64Image
        };

        try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
           
                if (response.ok) {
                    popup.style.display = 'flex';
                setTimeout(() => {
                    location.reload(); 
                }, 3000);
                    return response.json();
                } else {
                    const errorText = await response.text(); 
                     if (errorText.includes('already in use')) {
                        warning.style.display = "flex";
                        warning.innerHTML = "This email, username or phone number is already in use.";
                    } 
                    throw new Error('Failed to update user');
                }
            
            
        }catch (error) {
                console.error("Error:", error);
                error_msg.style.display="flex";
                error_msg.innerHTML = "An error has occurred. Please try again later.";
            }
    });

    cover_photo_input.addEventListener('change', () => {
        const file = cover_photo_input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profile_image.src = e.target.result; 
            };
            reader.readAsDataURL(file); 
        }
    });

    function isValidPhoneNumber(phoneNumber) {
        const phoneLength = phoneNumber.replace(/\D/g, '').length; 
        return phoneLength >= 4 && phoneLength <= 15; 
    }

});
