import { enableValidation, settings } from "../scripts/validation.js";
import "./style.css";
const initialCards = [
  {
    name: "Adorable puppy",
    link: "https://www.petlandflorida.com/wp-content/uploads/2022/04/shutterstock_1290320698-1-scaled.jpg",
  },
  {
    name: "Art of Bonsai",
    link: "https://centredejardinbrossard.com/wp-content/uploads/2021/10/bonsai.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

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
const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const cardSubmitButton = newPostModal.querySelector(".modal__save-btn");

const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalTitle = previewModal.querySelector(".modal__title-preview");

const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);

const modals = document.querySelectorAll(".modal");

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

newPostClosebutton.addEventListener("click", (modal) => {
  closeModal(newPostModal);
});

editModalCloseButton.addEventListener("click", (modal) => {
  closeModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputName.value;
  profileJobElement.textContent = inputJob.value;
  closeModal(editProfileModal);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: inputCaption.value, link: inputLink.value };
  const card = getCardElement(inputValues);
  cardsList.prepend(card);
  newPostModalForm.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(newPostModal);
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

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

initialCards.forEach((item) => {
  const card = getCardElement(item);
  cardsList.append(card);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

newPostModalForm.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(settings);
