import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modalBody: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  modalBtn: document.querySelector('button[data-action="close-modal"]'),
  modalOverlay: document.querySelector('.lightbox__content'),
  btnModalLeft: document.querySelector('button[data-control="left"]'),
  btnModalRight: document.querySelector('button[data-control="right"]'),
};
const bigImgRefs = images.map(ref => ref.original);
let imageUrl;

function addGalleryItems(items) {
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
    galleryLink.append(galleryImg);
    galleryList.append(galleryLink);
    refs.gallery.append(galleryList);
  });
}

function openModal(event) {
  window.addEventListener('keydown', onPressEsc);
  window.addEventListener('keydown', handleArrowTap);
  if (event.target.tagName === 'IMG') {
    refs.modalBody.classList.add('is-open');
  }
}

function addImageModal(event) {
  const bigImgRef = event.target.getAttribute('data-source');
  const alt = event.target.getAttribute('alt');
  imageUrl = bigImgRef;
  refs.modalImg.setAttribute('src', bigImgRef);
  refs.modalImg.setAttribute('alt', alt);
}

function closeModal(event) {
  window.removeEventListener('keydown', handleArrowTap);
  if (event.target.nodeName === 'BUTTON') clearAributes();
  if (event.target === refs.modalOverlay) clearAributes();
}

function closeModalByEsc() {
  window.removeEventListener('keydown', toggleImg);
  window.removeEventListener('keydown', onPressEsc);
  clearAributes();
}

function onPressEsc(event) {
  if (event.code === 'Escape') {
    closeModalByEsc();
  }
}

function clearAributes() {
  refs.modalBody.classList.remove('is-open');
  refs.modalImg.removeAttribute('src');
  refs.modalImg.removeAttribute('alt');
}

function getImageUrl(value) {
  const newUrl = bigImgRefs.reduce((acc, item, index) => {
    if (item === imageUrl) {
      if (value === 'right') {
        acc = bigImgRefs[index + 1];
      }
      if (value === 'left') {
        acc = bigImgRefs[index - 1];
      }
    }
    return acc;
  }, '');
  if (newUrl !== undefined) {
    imageUrl = newUrl;
  }
  return imageUrl;
}

function handleArrowTap(event) {
  if (event.code === 'ArrowRight') {
    getImageUrl('right');
    changeModalImg();
  }
  if (event.code === 'ArrowLeft') {
    getImageUrl('left');
    changeModalImg();
  }
}

function handleButtonClick(event) {
  const currentButton = event.currentTarget.dataset.control;
  if (currentButton === 'right') {
    getImageUrl('right');
    changeModalImg();
  }
  if (currentButton === 'left') {
    getImageUrl('left');
    changeModalImg();
  }
}

function changeModalImg() {
  refs.modalImg.src = '';
  refs.modalImg.src = imageUrl;
}

addGalleryItems(images);

refs.gallery.addEventListener('click', event => {
  event.preventDefault();
  openModal(event);
  addImageModal(event);
});

refs.modalBody.addEventListener('click', closeModal);

refs.btnModalLeft.addEventListener('click', handleButtonClick);

refs.btnModalRight.addEventListener('click', handleButtonClick);
