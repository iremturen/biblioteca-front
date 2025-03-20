import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
    const spinBtn = document.getElementById("spin_btn");
    const wheel = document.getElementById("wheel");
    const manuelInput = document.getElementById("manuel_input");
    const searchBtn = document.getElementById("search_btn");
    const manuelAdd = document.getElementById("manuel_add");
    const itemList = document.getElementById("item_list");
    const clearBtn = document.getElementById("clear");
    const sortBtn = document.getElementById("sort");
    const popup = document.getElementById("result-popup");
    const selectedBook = document.getElementById("selected-book");
    const searchPopup = document.getElementById("search-popup");
    const reloadBtn = document.getElementById("reload");
    const closeSearchPopup = document.getElementById("close-search-popup");
    const popupSearchBtn = document.getElementById("popup_search_btn");
    const popupAddBooksBtn = document.getElementById("popup_add_books_btn");
    const closeResultPopup = document.getElementById("close-result-popup");
    const spinAgainBtn = document.getElementById("spin-again");
    
    let items = [];

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
        console.error('User or token not found');
        return;
    }

    const search_input = document.getElementById("search_input");
    const search_btn = document.getElementById("search_btn");
    const popupBooks = document.getElementById("popup_books");

    let selectedBooks = [];

    search_btn.addEventListener("click", () => {
        fetchBooks();
    });

    search_input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            fetchBooks();
        }
    });

    function fetchBooks() {
        const searchQuery = search_input.value.trim();
        let url = `http://localhost:8080/api/books`;

        if (searchQuery) {
            url += `?pattern=${encodeURIComponent(searchQuery)}`;
        }

        console.log("Fetching from URL:", url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(books => {
                console.log("Received books:", books);
                popupBooks.innerHTML = "";

                books.forEach(book => {
                    const bookItem = document.createElement("div");
                    bookItem.classList.add("popup-book-item");

                    const bookImage = document.createElement('img');
                    bookImage.classList.add('book_image');
                    if (book.image) {
                        bookImage.src = `data:image/jpeg;base64,${book.image}`;
                    } else {
                        bookImage.src = '/biblioteca_front/images/image_not_found.png';
                    }
                    bookItem.appendChild(bookImage);

                    const bookName = document.createElement("div");
                    bookName.classList.add("book_name");
                    bookName.textContent = book.book_name;
                    bookItem.appendChild(bookName);

                    const checkbox = document.createElement("input");
                    checkbox.classList.add("checkbox");
                    checkbox.type = "checkbox";
                    checkbox.dataset.bookId = book.bookId;
                    bookItem.appendChild(checkbox);

                    popupBooks.appendChild(bookItem);

                    checkbox.addEventListener("change", (event) => {
                        if (event.target.checked) {
                            selectedBooks.push(book.bookId);
                        } else {
                            selectedBooks = selectedBooks.filter(id => id !== book.bookId);
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                popupBooks.innerHTML = "<p>Error loading books</p>";
            });
    }


    manuelAdd.addEventListener("click", () => {
        let book = manuelInput.value.trim();
        if (book !== "") {
            items.push(book);
            updateItemList();
            updateWheel();
            manuelInput.value = "";
        }
    });

    function updateWheel() {
        wheel.innerHTML = "";
        let numItems = items.length;

        if (numItems === 0) return;

        let angle = 360 / numItems;
        let colors = [
            "#FF1E1E",
            "#00D2FF",
            "#7B61FF",
            "#00FF94",
            "#FFB700",
            "#FF36AB",
            "#32F9F9",
            "#FFE744"
        ];

        items.forEach((book, index) => {
            let segment = document.createElement("div");
            segment.classList.add("segment");
            segment.style.setProperty("--i", index);
            segment.style.transform = `rotate(${angle * index}deg)`;
            segment.style.backgroundColor = colors[index % colors.length];

            let text = document.createElement("span");
            text.classList.add("segment-text");
            text.innerText = book;

            segment.appendChild(text);
            wheel.appendChild(segment);
        });

        updateSegments();
    }

    function updateSegments() {
        const segments = document.querySelectorAll('.segment');
        const totalSegments = segments.length;
        const angle = 360 / totalSegments;

        segments.forEach((segment, index) => {
            const currentAngle = angle * index;
            segment.style.transform = `rotate(${currentAngle}deg)`;

            const clipSize = Math.min(100, (600 / totalSegments));
            segment.style.clipPath = `polygon(0 0, ${clipSize}% 0, 100% 100%, 0 ${clipSize}%)`;
        });
    }

    function updateItemList() {
        itemList.value = items.join("\n");
    }

    clearBtn.addEventListener("click", () => {
        items = [];
        updateItemList();
        updateWheel();
    });

    sortBtn.addEventListener("click", () => {
        items.sort();
        updateItemList();
        updateWheel();
    });

    itemList.addEventListener("input", () => {
        items = itemList.value.split("\n").filter(item => item.trim() !== "");
        updateWheel();
    });

    spinBtn.addEventListener("click", () => {
        if (items.length === 0) {
            const errorMsg = document.createElement("div");
            errorMsg.classList.add("error-message");
            errorMsg.textContent = "Please add books to the wheel first!";
            document.body.appendChild(errorMsg);
            
            setTimeout(() => {
                errorMsg.classList.add("fade-out");
                setTimeout(() => {
                    document.body.removeChild(errorMsg);
                }, 300);
            }, 3000);
            
            return;
        }

        wheel.style.transition = "none";
        wheel.style.transform = `rotate(0deg)`;
        wheel.offsetHeight;

        let randomDegree = 3600 + Math.random() * 360;
        wheel.style.transition = "transform 4s ease-out";
        wheel.style.transform = `rotate(${randomDegree}deg)`;

        setTimeout(() => {
            let finalDegree = randomDegree % 360;
            let section = Math.floor(finalDegree / (360 / items.length));
            selectedBook.textContent = items[section];
            popup.style.display = "flex";

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: [
                    '#F04765',
                    '#FF89A0',
                    '#FF4D7E',
                    '#FFB6C1',
                    '#FF69B4',
                    '#FFC0CB'
                ]
            });

            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#F04765', '#FF89A0', '#FF4D7E']
                });
                confetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FFB6C1', '#FF69B4', '#FFC0CB']
                });
            }, 250);
        }, 4000);
    });

    reloadBtn.addEventListener("click", () => {
        location.reload();
    });

    searchBtn.addEventListener("click", () => {
        searchPopup.style.display = "flex";
    });

    closeSearchPopup.addEventListener("click", () => {
        searchPopup.style.display = "none";
    });

    popupSearchBtn.addEventListener("click", () => {
        fetchBooks();
    });

    closeResultPopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    spinAgainBtn.addEventListener("click", () => {
        popup.style.display = "none";
        fetchBooks();
    });

    popupAddBooksBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('.checkbox:checked');
        const bookItems = document.querySelectorAll('.popup-book-item');
        
        checkboxes.forEach(checkbox => {
            const bookItem = checkbox.closest('.popup-book-item');
            const bookName = bookItem.querySelector('.book_name').textContent;
            items.push(bookName);
        });
        
        updateItemList();
        updateWheel();
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        selectedBooks = [];
    });

});