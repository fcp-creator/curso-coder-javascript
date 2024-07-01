document.addEventListener('DOMContentLoaded', () => {
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;

    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');

    restartButton.addEventListener('click', startGame);

    function startGame() {
        matches = 0;
        cards = shuffle(cardValues.concat());
        gameBoard.innerHTML = '';
        createCards();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCards() {
        cards.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.value;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.value === secondCard.dataset.value;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
        matches++;

        if (matches === cardValues.length / 2) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    startGame();
});