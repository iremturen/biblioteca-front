document.addEventListener('DOMContentLoaded', () => {
    const back_logo = document.getElementById('back_logo');
    const back_text = document.getElementById('back_text');
    const remove_book = document.getElementById('remove_book');
    const remove_popup = document.getElementById('remove_popup');
    const confirm_remove = document.getElementById('confirm_remove');
    const cancel_remove = document.getElementById('cancel_remove');
    const edit_collection = document.getElementById('edit_collection');
    const edit_popup = document.getElementById('edit_popup');
    const collection_img = document.getElementById('collection_img');
    const collection_title = document.getElementById('collection_title');
    const description = document.getElementById('description');
    const close_popup = document.getElementById('close_popup');
    const more = document.getElementById('more');
    const dropdown_content = document.getElementById('dropdown_content');
    const delete_coll = document.getElementById('delete_coll');
    const remove_collection_popup = document.getElementById('remove_collection_popup');
    const cancel_delete_coll = document.getElementById('cancel_delete');

    const collectionId = localStorage.getItem('collectionId');
    fetch(`http://localhost:8080/api/collections/${collectionId}`)
    .then(response => response.json())
    .then(collection_info => {
        collection_img.setAttribute('src', `data:image/jpeg;base64,${collection_info.cover}`);
        collection_title.innerHTML = collection_info.collection_name;
        description.innerHTML = collection_info.description;
        });

    back_logo.addEventListener('click', () => {
        window.location.href = 'collections.html';
    });

    back_text.addEventListener('click', () => {
        window.location.href = 'collections.html';
    });

    remove_book.addEventListener('click', () => {
        remove_popup.style.display = 'flex'; 
    });

    confirm_remove.addEventListener('click', () => {
        remove_popup.style.display = 'none'; 
    });

    cancel_remove.addEventListener('click', () => {
        remove_popup.style.display = 'none';
    });

    edit_collection.addEventListener('click', () => {
        edit_popup.style.display = 'flex';
    });

    close_popup.addEventListener('click', () => {   
        edit_popup.style.display = 'none';
    });

    more.addEventListener('mouseover', () => {
        dropdown_content.style.display = 'flex';
    });

    more.addEventListener('mouseout', () => {
        dropdown_content.style.display = 'none';
    });

    dropdown_content.addEventListener('mouseover', () => {
        dropdown_content.style.display = 'flex';
    });

    dropdown_content.addEventListener('mouseout', () => {
        dropdown_content.style.display = 'none';
    });

    delete_coll.addEventListener('click', () => {
     remove_collection_popup.style.display = 'flex';
    });

    cancel_delete_coll.addEventListener('click', () => {
        remove_collection_popup.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == remove_popup) {
            remove_popup.style.display = 'none';
        } else if (event.target == edit_popup) {
            edit_popup.style.display = 'none';
        } else if (event.target == remove_collection_popup) {
            remove_collection_popup.style.display = 'none';
        }
    }

    

});

