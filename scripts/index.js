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
const modalCloseButton = document.querySelector(".modal__close-button");
const modalSaveButton = document.querySelector(".modal__save-btn");
const editProfileModal = document.querySelector("#edit-modal");
const profileModalForm = document.querySelector(".modal__form");
const inputName = editProfileModal.querySelector("#name");
const inputJob = editProfileModal.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

function closeProfileModal() {
  editProfileModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_opened");
  inputName.value = profileNameElement.textContent;
  inputJob.value = profileJobElement.textContent;
});
modalCloseButton.addEventListener("click", function () {
  closeProfileModal();
});

function handleProfileFormSubmit() {
  profileNameElement.textContent = inputName.value;
  profileJobElement.textContent = inputJob.value;
  closeProfileModal();
}

profileModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleProfileFormSubmit();
});

const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards__list");

function getCard(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardContent = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardContent.textContent = data.name;

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const card = getCard(initialCards[i]);
  cardsList.append(card);
}
