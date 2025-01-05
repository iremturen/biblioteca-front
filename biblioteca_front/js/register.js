document.addEventListener('DOMContentLoaded', () => {
const username_input = document.getElementById('username_input');
const name_input = document.getElementById('name_input');
const surname_input = document.getElementById('surname_input');
const email_input = document.getElementById('email_input');
const tel_input = document.getElementById('tel_input');
const country_input = document.getElementById('country_input');
const city_input = document.getElementById('city_input');
const bday_input = document.getElementById('bday_input');
const password_input = document.getElementById('password_input');
const register_button = document.getElementById('register_button');
const sign_in = document.getElementById('sign_in');
const error_msg = document.getElementById('error_msg');

const iti = window.intlTelInput(tel_input, {
    separateDialCode: true, 
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
});

sign_in.addEventListener('click', () => {
    window.location.href = 'login.html';
});

register_button.addEventListener('click',  async () => {

    const username = username_input.value.trim();
    const name = name_input.value.trim();
    const surname = surname_input.value.trim();
    const email = email_input.value.trim();
    const telNo = iti.getNumber(); 
    const country = country_input.value.trim();
    const city = city_input.value.trim();
    const birthDate = bday_input.value.trim();
    const password = password_input.value.trim();

    const currentDate = new Date().toISOString().split('T')[0];
    bday_input.setAttribute('max', currentDate);
    bday_input.addEventListener('change', () => {
        const birthDate = bday_input.value;
        if (birthDate > currentDate) {
            error_msg.style.marginLeft = "-10px";
            error_msg.style.display = "flex";
            error_msg.innerHTML = "Enter a valid date.";
        } else {
            error_msg.style.display = "none";
        }
    });

    if (password.length < 8 || password.length > 12) {
        error_msg.style.marginLeft = "25px";
        error_msg.style.display = "flex";
        error_msg.innerHTML = "Password must be between 8 and 12 characters.";
        return;
    }

    if (!username || !name || !surname || !email || !telNo || !country || !city || !birthDate || !password) {
        error_msg.style.marginLeft = "100px";
        error_msg.style.display="flex";
        error_msg.innerHTML = "Please fill in all fields!";
        return;
    }

    if (!iti.isValidNumber()) {
        error_msg.style.marginLeft = "-10px";
        error_msg.style.display = "flex";
        error_msg.innerHTML = "Please enter a valid phone number with country code.";
        return;
    }

    try {
       
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: username,
                    name: name,
                    surname: surname,
                    email: email,
                    telNo: telNo,
                    country: country,
                    city: city,
                    birthDate: birthDate,
                    password: password }
            ),
        });

        if (response.ok) {
            error_msg.style.marginLeft = "100px";
            error_msg.style.display="flex";
            error_msg.innerHTML = "Registration is successful!";
            setTimeout(() => {
                window.location.href = 'login.html'; 
            }, 2000);
        } else {
            const errorText = await response.text();
            console.error("Registration failed: ", errorText);

            if (errorText.includes('Duplicate entry')) {
                error_msg.style.marginLeft = "-10px";
                error_msg.style.display = "flex";
                error_msg.innerHTML = "This email, username or phone number are already registered.";
            } else {
                error_msg.style.marginLeft = "80px";
                error_msg.style.display = "flex";
                error_msg.innerHTML = "Registration failed. Please try again.";
            }
        }
    } catch (error) {
        console.error("Error:", error);
        error_msg.style.display="flex";
        error_msg.innerHTML = "An error has occurred. Please try again later.";
    }
});
});