function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateCards(event, cards, numCards) {
  console.log(event.target);
  points = 0;
  pointsEl.textContent = `Points: ${points}`;
  const newCards = cards.slice(0, numCards);
  const cardsToPlay = [...newCards, ...newCards];
  shuffleArray(cardsToPlay);
  cardsToPlay.forEach((card) => {
    const img = new Image();
    img.src = card.img;
  });

  board.innerHTML = `
      ${cardsToPlay
        .map((card) => {
          return `
          <div class="card ${event.target.classList}">
            <div class="front"></div>
            <div class="back"><img src="${card.img}"/></div>
          </div>
          `;
        })
        .join("")}
      `;
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function checkMatch(cards) {
  const flippedCardsEl = document.querySelectorAll(".flipped");
  isChecking = true;
  if (cards[0] === cards[1]) {
    points++;
    pointsEl.textContent = `Points: ${points}`;
    setTimeout(() => {
      flippedCardsEl.forEach((flippedCard) => {
        flippedCard.remove();
      });
      isChecking = false;
    }, 2000);

    flippedCards.splice(0, 2);
  } else {
    setTimeout(() => {
      flippedCards.splice(0, 2);
      flippedCardsEl.forEach((flippedCard) =>
        flippedCard.classList.remove("flipped")
      );
      isChecking = false;
    }, 2000);
  }
}

function flipCard(event) {
  const frontCard = event.target;
  const backCard = frontCard.nextElementSibling;
  console.dir();
  if (isChecking) {
    return;
  }
  if (flippedCards.length < 2 && !frontCard.classList.contains("flipped")) {
    frontCard.parentNode.classList.add("flipped");
    flippedCards.push(backCard.children[0].src);
  }
  if (flippedCards.length === 2) {
    checkMatch(flippedCards);
  }
}

const cards = [
  { img: "../img/kaktus.png" },
  { img: "../img/kaktus-kot.png" },
  { img: "../img/kaktus-drzewo.png" },
  { img: "../img/komputer.png" },
  { img: "../img/kosmita-siedzi.png" },
  { img: "../img/kosmita.png" },
  { img: "../img/kaktus-zwierze.png" },
  { img: "../img/kaktus-samochod.png" },
  { img: "../img/roslina.png" },
  { img: "../img/drzewo.png" },
];
const flippedCards = [];
let points = 0;
let moves = 0;
let time = 0;
const pointsEl = document.querySelector("p");
const cardsEl = document.querySelectorAll(".card");
const board = document.querySelector(".memory-board");
let isChecking = false;
const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");

easyBtn.addEventListener("click", (event) => {
  generateCards(event, cards, 4);
});

mediumBtn.addEventListener("click", (event) => {
  generateCards(event, cards, 8);
});

hardBtn.addEventListener("click", (event) => {
  generateCards(event, cards, 10);
});
// shuffleArray(cardsToPlay);

// generateCards(cards, 4);
