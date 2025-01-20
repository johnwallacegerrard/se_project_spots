const initialCards = [
  {
    name: "Val Thorens",
    link: "../images/thorens.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "../images/restaurant.jpg",
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
    name: "Mountain House",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__post-button");

const modalSaveButton = document.querySelector(".edit-modal__save-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClosebutton = newPostModal.querySelector(
  ".edit-modal__close-button"
);
const editProfileModal = document.querySelector("#edit-modal");
const editModalCloseButton = editProfileModal.querySelector(
  ".edit-modal__close-button"
);
const profileModalForm = document.querySelector(".edit-modal__form");
const newPostModalForm = newPostModal.querySelector(".edit-modal__form");
const inputLink = newPostModalForm.querySelector("#image-link");
const inputCaption = newPostModalForm.querySelector("#caption");
const inputName = editProfileModal.querySelector("#name");
const inputJob = editProfileModal.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("edit-modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("edit-modal_opened");
}

profileEditButton.addEventListener("click", (modal) => {
  openModal(editProfileModal);
  inputName.value = profileNameElement.textContent;
  inputJob.value = profileJobElement.textContent;
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
  const cardLikeElement = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const previewModal = document.querySelector(".preview-modal");
  const previewModalCloseButton = previewModal.querySelector(
    ".preview-modal__close-button"
  );

  cardImage.addEventListener("click", () => {
    console.log("it works");
    previewModal.classList.add("preview-modal_opened");
    const previewModalImage = previewModal.querySelector(
      ".preview-modal__image"
    );

    previewModalImage.src = cardImage.src;

    console.log(cardImage);
  });

  previewModalCloseButton.addEventListener("click", () => {
    previewModal.classList.remove("preview-modal_opened");
  });

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

newPostModalForm.addEventListener("submit", handleNewPostFormSubmit);
