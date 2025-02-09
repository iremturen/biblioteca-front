import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
AuthManager.checkToken();
const homepageItem = document.getElementById('homepage');
const exploreItem = document.getElementById('explore');
const accountItem = document.getElementById('account');
const collectionsItem = document.getElementById('collections');
const favoritesItem = document.getElementById('favorites');
const settingsItem = document.getElementById('settings');
const slider = document.getElementById('slider');
const slider_container = document.getElementById('slider_container');
const popup_faq = document.getElementById('popup_faq');
const popup_cont = document.getElementById('popup_cont');
const popup_feed = document.getElementById('popup_feed');
const faq = document.getElementById('faq');
const line_info = document.getElementById('line_info');
const feedback_form = document.getElementById('feedback_form');
const faq_main = document.getElementById('faq_main');
const content_main = document.getElementById('content_main');
const feed_main = document.getElementById('feed_main');
const pink = document.getElementById('pink');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const orange = document.getElementById('orange');
const purple = document.getElementById('purple');
const old_password = document.getElementById('old_password');
const new_password = document.getElementById('new_password');
const confirm_password = document.getElementById('confirm_password');
const change_button = document.getElementById('change_button');
const error_msg= document.getElementById('error_msg');

const token = localStorage.getItem('authToken'); 

slider_container.style.backgroundColor = 'rgb(255, 255, 255)';

function redirectTo(url) {
    const transitionOverlay = document.querySelector(".transition-overlay");
    transitionOverlay.classList.add("active");

    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

function closePopup(popup) {
    popup.style.display = 'none';
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

faq.addEventListener('click', () => {
    popup_faq.style.display = 'flex';
    const infoType = 'FAQ'; 
    const url = `http://localhost:8080/api/settings?infoType=${infoType}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(faq => {
            faq.forEach(faqItem => {
                const faqItemElement = document.createElement('div');
                faqItemElement.classList.add('faq_item');

                const faqTitle = document.createElement('p');
                faqTitle.classList.add('title');
                faqTitle.textContent = faqItem.title;
                faqItemElement.appendChild(faqTitle);

                const faqContent = document.createElement('p');
                faqContent.classList.add('content');
                faqContent.textContent = faqItem.content;
                faqItemElement.appendChild(faqContent);

                faq_main.appendChild(faqItemElement);
            });
        });
});

line_info.addEventListener('click', () => {
    popup_cont.style.display = 'flex';
    const infoType = 'SUPPORT'; 
    const url = `http://localhost:8080/api/settings?infoType=${infoType}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(support => {
            support.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');

                const title = document.createElement('p');
                title.classList.add('title_info');
                title.textContent = item.title;
                itemElement.appendChild(title);

                const content = document.createElement('p');
                content.classList.add('content_info');
                content.textContent = item.content;
                itemElement.appendChild(content);

                content_main.appendChild(itemElement);
            });
        });
});


feedback_form.addEventListener('click', () => {
    popup_feed.style.display = 'flex';
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    const title_feed = document.createElement('p');
    title_feed.classList.add('title_feedback');
    title_feed.textContent = 'Send us your feedback :)';
    itemElement.appendChild(title_feed);

    const subject = document.createElement('input');
    subject.classList.add('subject_input');
    subject.placeholder = 'Subject';
    subject.setAttribute('type', 'text');
    subject.setAttribute('maxlength', '60');
    itemElement.appendChild(subject);

    const message = document.createElement('textarea');
    message.classList.add('message_input');
    message.placeholder = 'Enter your feedback here...'; 
    message.setAttribute('type', 'text');
    message.setAttribute('maxlength', '300');
    itemElement.appendChild(message);

    const warning = document.createElement('p');
    warning.classList.add('warning');
    warning.textContent = 'The maximum character limit is 300.';
    itemElement.appendChild(warning);

    message.addEventListener('input', () => {
        const length = message.value.length;
        if (length == 300) {
            warning.style.display = 'flex';
        } else {
            warning.style.display = 'none';
        } 
    });

    const send_button = document.createElement('div');
    send_button.classList.add('send_btn');
    send_button.textContent = 'Send';
    itemElement.appendChild(send_button);

    const success_msg = document.createElement('p');
    success_msg.classList.add('success_msg');
    success_msg.textContent = 'Feedback sent successfully!';
    itemElement.appendChild(success_msg);

    feed_main.appendChild(itemElement);

    send_button.addEventListener('click', () => {
        const feedback = {
            email:localStorage.getItem('email'),
            subject: subject.value,
            body: message.value
        };

        const url = 'http://localhost:8080/api/feedback/send';
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Response data: ", data); 
                if (data.message === 'Feedback sent successfully'){
                    success_msg.style.display = 'flex';
                    setTimeout(() => {
                        closePopup(popup_feed);
                    }, 5000);
                } else {
                    success_msg.style.display = 'flex';
                    success_msg.textContent = 'An error occurred. Please try again.';
                }
            });
    });
});


slider.addEventListener('click', () => {
    slider.classList.toggle('active');

    if (localStorage.getItem('darkMode') !== 'disabled') {
        localStorage.setItem('darkMode', 'disabled'); 
        slider_container.style.backgroundColor = 'rgb(255, 255, 255)';
    } else {
        localStorage.setItem('darkMode', 'enabled'); 
        slider_container.style.backgroundColor = 'rgb(194, 194, 194)';
    }
});

function setColor(color) {
    localStorage.setItem('profileBackgroundColor', color);
}

pink.addEventListener('click', () => setColor('#f04765'));
green.addEventListener('click', () => setColor('#58d68d'));
blue.addEventListener('click', () => setColor('#85c1e9'));
yellow.addEventListener('click', () => setColor('#f7dc6f'));
orange.addEventListener('click', () => setColor('#f39c12'));
purple.addEventListener('click', () => setColor('#a569bd'));

});

change_button.addEventListener('click', () => {
    const authToken = localStorage.getItem('authToken');
    const old_password_value = old_password.value;
    const new_password_value = new_password.value;
    const confirm_password_value = confirm_password.value;
    const url = 'http://localhost:8080/api/change_password';

    if (new_password_value !== confirm_password_value) {
        error_msg.style.display = 'flex';
        error_msg.textContent = 'Passwords do not match.';
        return;
    }

    if(old_password_value === '' || new_password_value === '' || confirm_password_value === '') {
        error_msg.style.display = 'flex';
        error_msg.textContent = 'Please fill in all fields.';
        return;
    }

    if(new_password_value.length < 8 || confirm_password_value.length < 8 || old_password_value.length < 8) {
        error_msg.style.display = 'flex';
        error_msg.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    const password = {
        currentPassword: old_password_value,
        newPassword: new_password_value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
    })  
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Password changed successfully') {
            error_msg.style.display = 'flex';
            error_msg.textContent = 'Password changed successfully.';
        } else {
            error_msg.style.display = 'flex';
            error_msg.textContent = 'An error occurred. Please try again.';
        }
    });
        

});