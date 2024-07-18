document.addEventListener('DOMContentLoaded', async () => {
    const cardImages = await fetchImages();
    const cards = createCardDeck(cardImages);
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;

    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');

    restartButton.addEventListener('click', startGame);

    function startGame() {
        matches = 0;
        shuffle(cards);
        gameBoard.innerHTML = '';
        createCards(cards);
    }

    async function fetchImages() {
        try {
            const response = await fetch('images.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }

    function createCardDeck(images) {
        const deck = images.concat(images); // Crear pares de imágenes
        return deck.map(image => ({ image, matched: false }));
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCards(cardArray) {
        cardArray.forEach((cardData, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;

            const img = document.createElement('img');
            img.src = cardData.image;
            card.appendChild(img);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const firstCardIndex = firstCard.dataset.index;
        const secondCardIndex = secondCard.dataset.index;

        const isMatch = cards[firstCardIndex].image === cards[secondCardIndex].image;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        cards[firstCard.dataset.index].matched = true;
        cards[secondCard.dataset.index].matched = true;

        resetBoard();
        matches++;

        if (matches === cards.length / 2) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    startGame();
});
