let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;
let timerInterval = null;
let secondsElapsed = 0;

// Redirect to home on page reload
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    window.location.href = "index.html";
}

/* =========================
   INITIALIZE GAME
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const level = getCurrentLevel();
    const config = getLevelConfig(level);

    document.getElementById("level-text").innerText = config.name;
    setupGrid(config.columns);

    const selectedWeapons = WEAPONS.slice(0, config.pairs);
    const cards = createCardSet(selectedWeapons);

    renderCards(cards);
    startTimer();

    document.getElementById("restart-btn").addEventListener("click", () => {
        restartGame(level);
    });
});

/* =========================
   GRID SETUP
========================= */

function setupGrid(columns) {
    const grid = document.getElementById("game-grid");
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

/* =========================
   RENDER CARDS
========================= */

function renderCards(cards) {
    const grid = document.getElementById("game-grid");
    grid.innerHTML = "";

    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id;

        cardElement.innerHTML = `
            <div class="card-face card-back">⚔️</div>
            <div class="card-face card-front">
                <img src="${card.image}" alt="${card.name}">
            </div>
        `;

        cardElement.addEventListener("click", () => handleCardClick(cardElement));
        grid.appendChild(cardElement);
    });
}

/* =========================
   CARD CLICK LOGIC
========================= */

function handleCardClick(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    incrementMoves();
    checkForMatch();
}

/* =========================
   MATCH CHECK
========================= */

function checkForMatch() {
    const isMatch =
        firstCard.dataset.id === secondCard.dataset.id;

    isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    resetTurn();

    if (matchedPairs === getLevelConfig(getCurrentLevel()).pairs) {
    setTimeout(() => {
        endLevel();
    }, 500); // 1 second delay
}
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetTurn();
    }, 900);
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

/* =========================
   MOVES & TIMER
========================= */

function incrementMoves() {
    moves++;
    document.getElementById("moves").innerText = moves;
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").innerText = formatTime(secondsElapsed);
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/* =========================
   LEVEL COMPLETE
========================= */

function endLevel() {
    clearInterval(timerInterval);

    document.getElementById("final-time").innerText =
        formatTime(secondsElapsed);
    document.getElementById("final-moves").innerText = moves;

    document.getElementById("popup").classList.remove("hidden");
}

/* =========================
   RESTART / NEXT LEVEL
========================= */

function restartGame(level) {
    window.location.href = `game.html?level=${level}`;
}

document.getElementById("next-level-btn")?.addEventListener("click", () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = currentLevel + 1;

    if (LEVELS[nextLevel]) {
        window.location.href = `game.html?level=${nextLevel}`;
    } else {
        window.location.href = "index.html";
    }
});
