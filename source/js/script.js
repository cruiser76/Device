'use strict';

(function () {
const ESC_KEYCODE = 27;

const feedbackBtn = document.querySelector(`.header__feedback-item--btn`);
const modalForm = document.querySelector(`.modal`);
const closeBtn = document.querySelector(`.modal__close button`);
const footerAddresses = document.querySelectorAll(`.footer__address-item`);
const footerAddressBtn = document.querySelector(`.footer__address-btn`);
const footerNavigationBtn = document.querySelector(`.footer__navigation-btn`);
const navList = document.querySelector(`.footer__navigation-list`);
const body = document.querySelector(`body`);
const overlay = document.querySelector(`.overlay`);

const isStorageSupport = true;
let storage = {};

try {
  storage.userName = localStorage.getItem(`userName`);
  storage.tel = localStorage.getItem(`tel`);
  storage.question = localStorage.getItem(`question`);
} catch (error) {
  isStorageSupport;
}

const closeModal = () => {
  modalForm.classList.add('modal--hidden');
  document.removeEventListener('keydown', onEscKeyDown);
  overlay.removeEventListener('click', onOverlayclick);
  closeBtn.removeEventListener(`click`, onCloseBtnClick);
  body.classList.remove(`lock`);
  overlay.classList.remove(`shim`);
}

const onCloseBtnClick = (evt) => {
  closeModal();
  evt.preventDefault();
}

const onEscKeyDown = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
}

const onOverlayclick = (evt) => {
  if (evt.target !== overlay) {
    return;
  }
  closeModal();
}

if (feedbackBtn && modalForm) {
  const userName = modalForm.querySelector(`[name=modal-username]`);
  const tel = modalForm.querySelector(`[name=modal-phone]`);
  const question = modalForm.querySelector(`[name=modal-question]`);
  feedbackBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    modalForm.classList.remove(`modal--hidden`);
    body.classList.add(`lock`);
    overlay.classList.add(`shim`);
    document.addEventListener(`keydown`, onEscKeyDown);
    overlay.addEventListener(`click`, onOverlayclick);
    closeBtn.addEventListener(`click`, onCloseBtnClick);
    if (isStorageSupport) {
      userName.value = storage.userName;
      tel.value = storage.tel;
      question.value = storage.question;
    }
    userName.focus();

  });

  modalForm.addEventListener(`submit`, (evt) => {
    if (!userName.value || !tel.value) {
      evt.preventDefault();
      console.log(`Нужно заполнить все поля`);
    } else {
      if (isStorageSupport) {
        localStorage.setItem(`userName`, userName.value);
        localStorage.setItem(`tel`, tel.value);
        localStorage.setItem(`question`, question.value);
      }
    }
  });
}

if(footerAddresses) {
  footerAddressBtn.classList.remove(`footer__address-btn--nojs`);
  for (const el of footerAddresses) {
    el.classList.remove(`footer__address-item--nojs`);
  }

  footerAddressBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const imgBtn = footerAddressBtn.querySelectorAll(`.footer__address-img`);
    for (const img of imgBtn) {
      img.classList.toggle(`footer__address-img--hidden`);
    }
    for (const el of footerAddresses) {
      el.classList.toggle(`footer__address-item--hidden`);
    }
  });
}

if(navList) {
  footerNavigationBtn.classList.remove(`footer__navigation-btn--nojs`);
  navList.classList.remove(`footer__navigation-list--nojs`);

  footerNavigationBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const imgBtn = footerNavigationBtn.querySelectorAll(`.footer__navigation-img`);
    for (const img of imgBtn) {
      img.classList.toggle(`footer__navigation-img--hidden`);
    }
    navList.classList.toggle(`footer__navigation-list--hidden`);
  });
}


})();
