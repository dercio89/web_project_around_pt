const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardCloseButton = document.querySelector(
  "#new-card-popup .popup__close",
);

const newCardForm = document.querySelector("#new-card-form");
const inputCardName = newCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = newCardForm.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector("#image-popup");
const inputTypeName = document.querySelector(".popup__input_type_name");
const inputTypeDescription = document.querySelector(
  ".popup__input_type_description",
);
const editProfileCloseButton = editPopup.querySelector(".popup__close");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

editButton.addEventListener("click", () => {
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  openModal(editPopup);
});

addButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardPopup);
});

editProfileCloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  renderCard(name, link, cardsList);

  newCardForm.reset();
  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

const editProfileForm = document.querySelector("#edit-profile-form");
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;
  closeModal(editPopup);
});

imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    closeModal(popup);
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closeModal(popup);
    });
  }
});
