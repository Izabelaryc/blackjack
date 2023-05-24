const labels = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const colors2 = ["hearts", "spades", "diamonds", "clubs"];

const cards2 = colors2
  .map((color) => {
    return labels.map((label) => {
      let value = label;
      if (label === "Ace") {
        value = 11;
      } else if (typeof label === "string") {
        value = 10;
      }

      return {
        color: color,
        label: label,
        value: value,
      };
    });
  })
  .flat();

let player = {
  name: "Izabela",
  chips: 300,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

function getCard() {
  const randomIndex = Math.floor(Math.random() * cards2.length);
  const card = cards2.splice(randomIndex, 1)[0];
  return card;
}

function startGame() {
  isAlive = true;
  let firstCard = getCard();
  let secondCard = getCard();
  cards = [firstCard, secondCard];
  sum = firstCard.value + secondCard.value;
  renderGame();
}

function renderGame() {
  cardsEl.innerHTML = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    cardsEl.innerHTML += `${card.label} <img src="./images/${card.color}.png" height="25">`;
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "Game over!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getCard();
    sum += card.value;
    cards.push(card);
    renderGame();
  }
}
