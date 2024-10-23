const homepageItem = document.getElementById('homepage');
const exploreItem = document.getElementById('explore');
const accountItem = document.getElementById('account');
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

slider_container.style.backgroundColor = 'rgb(255, 255, 255)';

//alert("1.popup ların design değişitir 2.account pic renk değiştirme 3.dark mode 4.change pass backend 5.feedback backend")

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

faq.addEventListener('click', () => {
    popup_faq.style.display = 'flex';
    fetch('http://localhost:8080/api/settings/faq')
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
    fetch('http://localhost:8080/api/settings/support')
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

    const message = document.createElement('input');
    message.classList.add('message_input');
    message.placeholder = 'Enter your feedback here...';
    itemElement.appendChild(message);

    const send_button = document.createElement('div');
    send_button.classList.add('send_btn');
    send_button.textContent = 'Send';
    itemElement.appendChild(send_button);

    popup_feed.appendChild(itemElement);
});


window.addEventListener('click', (event) => {
    if (popup_faq && !event.target.closest('#popup_faq') && popup_faq.style.display === 'flex') {
        popup_faq.style.display = 'none';
    }
    if (popup_cont && !event.target.closest('#popup_cont') && popup_cont.style.display === 'flex') {
        popup_cont.style.display = 'none';
    }
    if (popup_feed && !event.target.closest('#popup_feed') && popup_feed.style.display === 'flex') {
        popup_feed.style.display = 'none';
    }
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

pink.addEventListener('click', () => setColor('pink'));
green.addEventListener('click', () => setColor('green'));
blue.addEventListener('click', () => setColor('blue'));
yellow.addEventListener('click', () => setColor('yellow'));
orange.addEventListener('click', () => setColor('orange'));
purple.addEventListener('click', () => setColor('purple'));