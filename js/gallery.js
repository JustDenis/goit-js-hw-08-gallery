
import images from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
}

function addGalleryItems (items) {
    items.forEach(item => {
        const galleryList = document.createElement('li');
        const galleryLink = document.createElement('a');
        const galleryImg = document.createElement('img');
        galleryList.classList.add('gallery__item');
        galleryLink.classList.add('gallery__link');
        galleryLink.setAttribute('href', item.original);
        galleryImg.classList.add('gallery__image');
        galleryImg.setAttribute('src', item.preview);
        galleryImg.setAttribute('data-source', item.original);
        galleryImg.setAttribute('alt', item.description);
        galleryList.append(galleryLink, galleryImg);
        refs.gallery.append(galleryList);
    });
}

addGalleryItems(images);