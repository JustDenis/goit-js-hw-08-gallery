import images from './gallery-items.js';

// ArrowRight
// ArrowLeft

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modalBody: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  modalBtn: document.querySelector('button[data-action="close-modal"]'),
  modalOverlay: document.querySelector('.lightbox__content'),
};

function addGalleryItems(items) {
  let indexCounter = 0;
  items.forEach(item => {
    const galleryList = document.createElement('li');
    const galleryLink = document.createElement('a');
    const galleryImg = document.createElement('img');
    galleryList.classList.add('gallery__item');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', item.original);
    galleryLink.setAttribute('data-index', indexCounter += 1);
    galleryImg.classList.add('gallery__image');
    galleryImg.setAttribute('src', item.preview);
    galleryImg.setAttribute('data-source', item.original);
    galleryImg.setAttribute('alt', item.description);
    galleryLink.append(galleryImg);
    galleryList.append(galleryLink);
    refs.gallery.append(galleryList);
  });
}
addGalleryItems(images);

refs.gallery.addEventListener('click', event => {
  event.preventDefault();
  openModal(event);
  addImageModal(event);
});

refs.modalBody.addEventListener('click', closeModal);


function openModal(event) {
  window.addEventListener('keydown', onPressEsc);
  if (event.target != refs.gallery) {
    refs.modalBody.classList.add('is-open');
  }
}

function addImageModal(event) {
  const bigImgRef = event.target.getAttribute('data-source');
  const alt = event.target.getAttribute('alt');
  refs.modalImg.setAttribute('src', bigImgRef);
  refs.modalImg.setAttribute('alt', alt);
}

function closeModal(event) {
  if (event.target.nodeName === 'BUTTON') {
    refs.modalBody.classList.remove('is-open');
    refs.modalImg.removeAttribute('src');
    refs.modalImg.removeAttribute('alt');
  }
  if (event.target === refs.modalOverlay) {
    refs.modalBody.classList.remove('is-open');
    refs.modalImg.removeAttribute('src');
    refs.modalImg.removeAttribute('alt');
  }
}

function closeModalByEsc() {
  window.removeEventListener('keydown', onPressEsc);
  refs.modalBody.classList.remove('is-open');
  refs.modalImg.removeAttribute('src');
  refs.modalImg.removeAttribute('alt');
}

function onPressEsc(event) {
  if(event.code === 'Escape'){
    closeModalByEsc();
  }
}
