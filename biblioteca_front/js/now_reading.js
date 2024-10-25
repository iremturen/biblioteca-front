document.addEventListener('DOMContentLoaded', () => {
    const homepageItem = document.getElementById('homepage');
    const exploreItem = document.getElementById('explore');
    const accountItem = document.getElementById('account');
    const favoritesItem = document.getElementById('favorites');
    const collectionsItem = document.getElementById('collections');
    const booksDiv = document.getElementById('books');
    const top = document.getElementById('top');

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

    fetch('http://localhost:8080/api/user_books/now_reading/1200')
    .then(response => response.json())
    .then(books => {
        books.forEach(book => {
        const book_item=document.createElement('div');
        book_item.classList.add('book_item');

        const book_image=document.createElement('img');
        book_image.classList.add('book_image');
        book_image.setAttribute('src',`data:image/jpeg;base64,${book.book.image}`);
        book_item.appendChild(book_image);

        const book_info=document.createElement('div');
        book_info.classList.add('book_info');
        book_item.appendChild(book_info);

        const book_title=document.createElement('p');
        book_title.classList.add('book_title');
        book_title.textContent=book.book.book_name;
        book_info.appendChild(book_title);

        const author_info = document.createElement('div');
        author_info.classList.add('info');
        const author_title = document.createElement('p');
        author_title.classList.add('info_title');
        author_title.textContent = 'Author:';
        const author_main = document.createElement('p');
        author_main.classList.add('info_main');
        author_main.textContent = book.book.author; 
        author_info.appendChild(author_title);
        author_info.appendChild(author_main);
        book_info.appendChild(author_info);

        const page_info = document.createElement('div');
        page_info.classList.add('info');
        const page_title = document.createElement('p');
        page_title.classList.add('info_title');
        page_title.textContent = 'Book Page:';
        const page_main = document.createElement('p');
        page_main.classList.add('info_main');
        page_main.textContent = book.book.book_page; 
        page_info.appendChild(page_title);
        page_info.appendChild(page_main);
        book_info.appendChild(page_info);

        const pHouse_info = document.createElement('div');
        pHouse_info.classList.add('info');
        const pHouse_title = document.createElement('p');
        pHouse_title.classList.add('info_title');
        pHouse_title.textContent = 'Publishing House:';
        const pHouse_main = document.createElement('p');
        pHouse_main.classList.add('info_main');
        pHouse_main.textContent = book.book.publishing_house; 
        pHouse_info.appendChild(pHouse_title);
        pHouse_info.appendChild(pHouse_main);
        book_info.appendChild(pHouse_info);

        const pYear_info = document.createElement('div');
        pYear_info.classList.add('info');
        const pYear_title = document.createElement('p');
        pYear_title.classList.add('info_title');
        pYear_title.textContent = 'Publishing Year:';
        const pYear_main = document.createElement('p');
        pYear_main.classList.add('info_main');
        pYear_main.textContent = book.book.publishing_year;
        pYear_info.appendChild(pYear_title);
        pYear_info.appendChild(pYear_main);
        book_info.appendChild(pYear_info);

        const language_info = document.createElement('div');
        language_info.classList.add('info');
        const language_title = document.createElement('p');
        language_title.classList.add('info_title');
        language_title.textContent = 'Language:';
        const language_main = document.createElement('p');
        language_main.classList.add('info_main');
        language_main.textContent = book.book.language; 
        language_info.appendChild(language_title);
        language_info.appendChild(language_main);
        book_info.appendChild(language_info);

        const progress_container = document.createElement('div');
        progress_container.classList.add('progress_container');
        book_info.appendChild(progress_container);

        const progress = document.createElement('progress');
        progress.classList.add('readingProgress');
        progress.setAttribute('value',book.progress);
        progress.setAttribute('max',book.book.book_page);
        progress.setAttribute('id','readingProgress');
        progress_container.appendChild(progress);

        const progress_per = document.createElement('p');
        progress_per.classList.add('progress_per');

        const progress_num = book.progress || 0; 
        const totalPages = book.book.book_page || 1; 
        
        let percent = (progress_num * 100) / totalPages;
        progress_per.textContent=percent.toFixed(1) + '%';
        progress_container.appendChild(progress_per);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        book_item.appendChild(buttons);

        const page=document.createElement('input');
        page.classList.add('page');
        page.setAttribute('type','number');
        page.setAttribute('min','0');
        page.setAttribute('max',book.book.book_page);
        page.value=book.progress;
        buttons.appendChild(page);

        page.addEventListener('input', () => {
            const maxValue = parseInt(page.getAttribute('max'));
            const inputValue = parseInt(page.value);
        
            if (inputValue > maxValue) {
                page.value = maxValue;
            }
        });

        const save=document.createElement('button');
        save.classList.add('button');
        save.setAttribute('id','save');
        save.textContent='Save';
        buttons.appendChild(save);

        save.addEventListener('click', () => {
            fetch(`http://localhost:8080/api/user_books/update/${book.bookId}?userId=${book.userId}&pageNum=${page.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage('Progress updated successfully!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    showErrorMessage('Failed to update progress.');
                }
            });
        });

        const finishBtnDiv = document.createElement('div');
        finishBtnDiv.classList.add('func_btn');
        buttons.appendChild(finishBtnDiv);
    
        const finishBtnImg = document.createElement('img');
        finishBtnImg.src = '/biblioteca_front/images/plus2.png';
        finishBtnImg.classList.add('btn_image');
        finishBtnDiv.appendChild(finishBtnImg);
    
        const finishBtnText = document.createElement('p');
        finishBtnText.classList.add('btn_text');
        finishBtnText.textContent = 'Finish Book';
        finishBtnDiv.appendChild(finishBtnText);
    
        const removeBtnDiv = document.createElement('div');
        removeBtnDiv.classList.add('func_btn');
        buttons.appendChild(removeBtnDiv);
    
        const removeBtnImg = document.createElement('img');
        removeBtnImg.src = '/biblioteca_front/images/remove.png';
        removeBtnImg.classList.add('btn_image');
        removeBtnDiv.appendChild(removeBtnImg);
    
        const removeBtnText = document.createElement('p');
        removeBtnText.classList.add('btn_text');
        removeBtnText.textContent = 'Remove Book';
        removeBtnDiv.appendChild(removeBtnText);


        booksDiv.appendChild(book_item);

        });
    });

    function showSuccessMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('success_message');
        top.appendChild(msgDiv);

        const msgImg = document.createElement('img');
        msgImg.classList.add('success_img');
        msgImg.src = '/biblioteca_front/images/success.png';
        msgDiv.appendChild(msgImg);

        const msgText = document.createElement('p');
        msgText.classList.add('success_message_text');
        msgText.textContent = message;
        msgDiv.appendChild(msgText);
    
        setTimeout(() => {
            msgDiv.remove();
        }, 2000);
    }
    
    function showErrorMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('error_message');
        top.appendChild(msgDiv);

        const msgImg = document.createElement('img');
        msgImg.classList.add('error_img');
        msgImg.src = '/biblioteca_front/images/error.png';
        msgDiv.appendChild(msgImg);

        const msgText = document.createElement('p');
        msgText.classList.add('error_message_text');
        msgText.textContent = message;
        msgDiv.appendChild(msgText);
    
        setTimeout(() => {
            msgDiv.remove();
        }, 2000);
    }
        
});