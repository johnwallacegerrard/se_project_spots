import { enableValidation, settings } from "../scripts/validation.js";
import "./style.css";
import Api from "../utils/Api.js";
import { ConcatenationScope } from "webpack";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3295f8d6-4354-4aef-97af-4d3c0e114b45",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    profileNameElement.textContent = userData.name;
    profileJobElement.textContent = userData.about;
    profileAvatarElement.src = userData.avatar;

    cards.forEach((item) => {
      const card = getCardElement(item);
      cardsList.append(card);
    });
  })
  .catch(console.error);

const profileEditButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__post-button");

const newPostModal = document.querySelector("#new-post-modal");
const newPostClosebutton = newPostModal.querySelector(".modal__close-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileSaveButton = editProfileModal.querySelector(".modal__save-btn");
const editModalCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileModalForm = document.forms["edit-profile"];
const newPostModalForm = document.forms["new-post"];
const inputLink = newPostModalForm.querySelector("#image-link-input");
const inputCaption = newPostModalForm.querySelector("#caption-input");
const inputName = editProfileModal.querySelector("#name-input");
const inputJob = editProfileModal.querySelector("#description-input");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileAvatarElement = document.querySelector(".profile__user-pic");
const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const cardSubmitButton = newPostModal.querySelector(".modal__save-btn");

const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalTitle = previewModal.querySelector(".modal__title-preview");

const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);

const editProfileAvatarButton = document.querySelector(
  ".profile__edit-avatar-btn"
);
const editProfileAvatarModal = document.querySelector("#edit-profile-avatar");
const deleteCardModal = document.querySelector("#card-delete-verif");
const verifyDeleteButton = deleteCardModal.querySelector(".modal__delete-btn");
const cancelDeleteButton = deleteCardModal.querySelector(
  ".modal__delete-btn_cancel"
);
const deleteModalCloseButton = deleteCardModal.querySelector(
  ".modal__close-button"
);

const modals = document.querySelectorAll(".modal");

let selectedCard;
let selectedCardId;

modals.forEach((modal) => {
  modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

profileEditButton.addEventListener("click", (modal) => {
  openModal(editProfileModal);

  inputName.value = profileNameElement.textContent;
  inputJob.value = profileJobElement.textContent;
  resetValidation(profileModalForm, [inputJob, inputName]);
});

newPostButton.addEventListener("click", (modal) => {
  openModal(newPostModal);
});

editProfileAvatarButton.addEventListener("click", (modal) => {
  openModal(editProfileAvatarModal);
});

newPostClosebutton.addEventListener("click", (modal) => {
  closeModal(newPostModal);
});

editModalCloseButton.addEventListener("click", (modal) => {
  closeModal(editProfileModal);
});

deleteModalCloseButton.addEventListener("click", (modal) => {
  closeModal(deleteCardModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({ name: inputName.value, about: inputJob.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  api
    .addCard({ name: inputCaption.value, link: inputLink.value })
    .then((data) => {
      const card = getCardElement(data);
      cardsList.prepend(card);
      newPostModalForm.reset();
      // disableButton(cardSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  console.log(data._id);
  openModal(deleteCardModal);
}

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardContent = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardContent.textContent = data.name;

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = cardImage.src;
    previewModalImage.alt = cardContent.textContent;
    previewModalTitle.textContent = cardContent.textContent;
  });

  const cardLikeElement = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardLikeElement.addEventListener("click", () => {
    cardLikeElement.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data)
  );

  return cardElement;
}

function handleDeleteCardSubmit() {
  api.deleteCard(selectedCardId).then(() => {});
}

verifyDeleteButton.addEventListener("submit", handleDeleteCardSubmit);

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

newPostModalForm.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(settings);
