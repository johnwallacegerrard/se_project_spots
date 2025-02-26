import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import "./style.css";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

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
const newPostSaveButton = newPostModal.querySelector(".modal__save-btn");
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

const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalTitle = previewModal.querySelector(".modal__title-preview");

const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);

const editProfileAvatarButton = document.querySelector(
  ".profile__edit-avatar-btn"
);
const editProfileAvatarModal = document.querySelector("#edit-profile-avatar");

const editProfileAvatarForm =
  editProfileAvatarModal.querySelector(".modal__form");

const avatarSubmitButton =
  editProfileAvatarForm.querySelector(".modal__save-btn");

const avatarLinkInput = editProfileAvatarForm.querySelector(".modal__input");

const editAvatarCloseButton = editProfileAvatarModal.querySelector(
  ".modal__close-button"
);
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

editAvatarCloseButton.addEventListener("click", (modal) => {
  closeModal(editProfileAvatarModal);
});

deleteModalCloseButton.addEventListener("click", (modal) => {
  closeModal(deleteCardModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(profileSaveButton, true);
  api
    .editUserInfo({ name: inputName.value, about: inputJob.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(profileSaveButton, false);
    });
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(newPostSaveButton, true);
  api
    .addCard({ name: inputCaption.value, link: inputLink.value })
    .then((data) => {
      const card = getCardElement(data);
      cardsList.prepend(card);
      newPostModalForm.reset();
      // disableButton(cardSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(newPostSaveButton, false);
    });
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  console.log(data._id);
  openModal(deleteCardModal);
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault(avatarSubmitButton, true);
  setButtonText();
  api
    .editAvatar(avatarLinkInput.value)
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      closeModal(editProfileAvatarModal);
      editProfileAvatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(avatarSubmitButton, false);
    });
}

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

editProfileAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

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

  toggleLikeElement(cardLikeElement, data);

  cardLikeElement.addEventListener("click", (evt) => {
    handleCardLike(evt, data._id);
  });

  cardDeleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data)
  );

  return cardElement;
}

function toggleLikeElement(cardLikeElement, data) {
  if (data.isLiked) {
    cardLikeElement.classList.add("card__like-button_liked");
  }
}

function handleCardLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api
    .toggleLike(id, isLiked)
    .then((res) => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch(console.error);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault;
  setButtonText(verifyDeleteButton, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then((res) => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(verifyDeleteButton, false, "Delete", "Deleting...");
    });
}

verifyDeleteButton.addEventListener("click", handleDeleteCardSubmit);
cancelDeleteButton.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

newPostModalForm.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(settings);
