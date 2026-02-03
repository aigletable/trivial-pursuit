/**
 * TRIVIAL PURSUIT ÉDUCATIF - Logique du Jeu
 */

let gameState = {
    currentChapter: null,
    players: [],
    currentPlayerIndex: 0,
    currentQuestion: null,
    questionNumber: 0,
    boardCells: [],
    isRolling: false,
    gameStarted: false
};

const PLAYER_COLORS = ['#00f5ff', '#ff00ff', '#22c55e', '#f97316'];
const BOARD_SIZE = 24;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initStars();
    loadChapters();
    generatePlayerInputs();
    generateLegend();
});

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        const colors = ['#00f5ff', '#ff00ff', '#a855f7', '#22c55e', '#ffd700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = '0 0 15px ' + color;
        particle.style.width = (4 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

function initStars() {
    const container = document.getElementById('stars');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        const size = (1 + Math.random() * 3) + 'px';
        star.style.width = size;
        star.style.height = size;
        container.appendChild(star);
    }
}

function loadChapters() {
    const chaptersContainer = document.getElementById('chapters-list');
    chaptersContainer.innerHTML = '';

    CHAPTERS.forEach(function (chapter) {
        const totalQuestions = Object.values(chapter.questions).flat().length;
        const card = document.createElement('div');
        card.className = 'chapter-card';
        card.onclick = function () { selectChapter(chapter); };
        card.innerHTML = '<span class="chapter-icon">' + chapter.icon + '</span>' +
            '<h3 class="chapter-title">' + chapter.title + '</h3>' +
            '<p class="chapter-subject">' + chapter.subject + '</p>' +
            '<p class="chapter-questions">' + totalQuestions + ' questions</p>';
        chaptersContainer.appendChild(card);
    });
}

function selectChapter(chapter) {
    gameState.currentChapter = chapter;
    document.getElementById('selected-chapter-info').textContent = `📖 ${chapter.title} - ${chapter.subject}`;
    showScreen('player-screen');
}

// ========================================
// PLAYER SETUP
// ========================================

let playerCount = 2;

function changePlayerCount(delta) {
    playerCount = Math.max(2, Math.min(4, playerCount + delta));
    document.getElementById('player-count').textContent = playerCount;
    generatePlayerInputs();
}

function generatePlayerInputs() {
    const container = document.getElementById('player-names');
    container.innerHTML = '';
    for (let i = 0; i < playerCount; i++) {
        const div = document.createElement('div');
        div.className = 'player-input-group';
        div.innerHTML = `
            <div class="player-color" style="background: ${PLAYER_COLORS[i]}"></div>
            <input type="text" class="player-input" id="player-name-${i}" placeholder="Joueur ${i + 1}" maxlength="20">
        `;
        container.appendChild(div);
    }
}

function generateLegend() {
    const container = document.getElementById('legend-items');
    container.innerHTML = '';
    DIFFICULTY_LEVELS.forEach(level => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<div class="legend-color" style="background: ${level.color}"></div><span>${level.name}</span>`;
        container.appendChild(item);
    });
}

// ========================================
// GAME START
// ========================================

function startGame() {
    gameState.players = [];
    for (let i = 0; i < playerCount; i++) {
        const nameInput = document.getElementById(`player-name-${i}`);
        const name = nameInput.value.trim() || `Joueur ${i + 1}`;
        gameState.players.push({
            name: name,
            color: PLAYER_COLORS[i],
            position: 0,
            wedges: { discovery: false, easy: false, medium: false, hard: false, expert: false, challenge: false },
            score: 0
        });
    }

    gameState.currentPlayerIndex = 0;
    gameState.questionNumber = 0;
    gameState.gameStarted = true;

    showScreen('game-screen');
    generateBoard();
    renderScoreboard();
    updateTurnIndicator();
    placePlayerTokens();
}

// ========================================
// BOARD GENERATION
// ========================================

function generateBoard() {
    const board = document.getElementById('game-board');
    board.querySelectorAll('.board-cell').forEach(cell => cell.remove());
    gameState.boardCells = [];

    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;
    const centerX = boardWidth / 2;
    const centerY = boardHeight / 2;
    const radius = Math.min(boardWidth, boardHeight) / 2 - 40;

    for (let i = 0; i < BOARD_SIZE; i++) {
        const angle = (i / BOARD_SIZE) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) - 25;
        const y = centerY + radius * Math.sin(angle) - 25;

        const difficultyIndex = i % DIFFICULTY_LEVELS.length;
        const difficulty = DIFFICULTY_LEVELS[difficultyIndex];

        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.index = i;
        cell.dataset.difficulty = difficulty.id;
        cell.style.left = x + 'px';
        cell.style.top = y + 'px';
        cell.style.background = difficulty.color;
        cell.style.boxShadow = `0 0 15px ${difficulty.color}40`;
        cell.textContent = i + 1;

        board.appendChild(cell);
        gameState.boardCells.push({ element: cell, difficulty: difficulty, x: x + 25, y: y + 25 });
    }
}

function placePlayerTokens() {
    const board = document.getElementById('game-board');
    board.querySelectorAll('.player-token').forEach(t => t.remove());

    gameState.players.forEach((player, index) => {
        const token = document.createElement('div');
        token.className = 'player-token';
        token.id = `token-${index}`;
        token.style.background = player.color;

        const cell = gameState.boardCells[player.position];
        const offset = (index - (gameState.players.length - 1) / 2) * 8;
        token.style.left = (cell.x - 15 + offset) + 'px';
        token.style.top = (cell.y - 15) + 'px';

        board.appendChild(token);
    });
}

function moveToken(playerIndex, newPosition) {
    const token = document.getElementById(`token-${playerIndex}`);
    const cell = gameState.boardCells[newPosition];
    const offset = (playerIndex - (gameState.players.length - 1) / 2) * 8;

    token.style.left = (cell.x - 15 + offset) + 'px';
    token.style.top = (cell.y - 15) + 'px';

    document.querySelectorAll('.board-cell').forEach(c => c.classList.remove('current'));
    cell.element.classList.add('current');
}

// ========================================
// DICE & MOVEMENT
// ========================================

function rollDice() {
    if (gameState.isRolling) return;
    gameState.isRolling = true;

    const dice = document.getElementById('dice');
    const diceValue = document.getElementById('dice-value');
    dice.classList.add('rolling');

    let rolls = 0;
    const rollInterval = setInterval(() => {
        diceValue.textContent = Math.floor(Math.random() * 6) + 1;
        rolls++;
        if (rolls >= 10) {
            clearInterval(rollInterval);
            const finalValue = Math.floor(Math.random() * 6) + 1;
            diceValue.textContent = finalValue;
            dice.classList.remove('rolling');
            setTimeout(() => moveCurrentPlayer(finalValue), 300);
        }
    }, 100);
}

function moveCurrentPlayer(steps) {
    const player = gameState.players[gameState.currentPlayerIndex];
    const newPosition = (player.position + steps) % BOARD_SIZE;
    player.position = newPosition;

    moveToken(gameState.currentPlayerIndex, newPosition);

    setTimeout(() => {
        const cell = gameState.boardCells[newPosition];
        showQuestion(cell.difficulty);
        gameState.isRolling = false;
    }, 500);
}

// ========================================
// QUESTIONS
// ========================================

function showQuestion(difficulty) {
    const chapter = gameState.currentChapter;
    const questions = chapter.questions[difficulty.id];

    if (!questions || questions.length === 0) {
        alert('Pas de questions pour ce niveau!');
        nextTurn();
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    gameState.questionNumber++;

    // Créer un tableau avec les réponses et marquer la correcte
    let answersToShuffle = [];
    for (let i = 0; i < question.answers.length; i++) {
        answersToShuffle.push({
            text: question.answers[i],
            isCorrect: (i === question.correct)
        });
    }

    // Fisher-Yates shuffle - mélange aléatoire
    let currentIndex = answersToShuffle.length;
    while (currentIndex > 0) {
        let randomIdx = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // Échanger les éléments
        let tempItem = answersToShuffle[currentIndex];
        answersToShuffle[currentIndex] = answersToShuffle[randomIdx];
        answersToShuffle[randomIdx] = tempItem;
    }

    // Trouver où est maintenant la bonne réponse
    let correctPosition = -1;
    for (let i = 0; i < answersToShuffle.length; i++) {
        if (answersToShuffle[i].isCorrect) {
            correctPosition = i;
            break;
        }
    }

    // Debug - afficher dans la console
    console.log('Réponses mélangées:', answersToShuffle.map(a => a.text));
    console.log('Position correcte:', correctPosition);

    gameState.currentQuestion = {
        question: question.question,
        courseReminder: question.courseReminder,
        difficulty: difficulty,
        shuffledAnswers: answersToShuffle.map(a => a.text),
        shuffledCorrect: correctPosition
    };

    document.getElementById('question-difficulty').textContent = difficulty.name;
    document.getElementById('question-difficulty').style.background = difficulty.color;
    document.getElementById('question-number').textContent = 'Question ' + gameState.questionNumber;
    document.getElementById('course-text').textContent = question.courseReminder;
    document.getElementById('question-text').textContent = question.question;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    for (let idx = 0; idx < gameState.currentQuestion.shuffledAnswers.length; idx++) {
        const answer = gameState.currentQuestion.shuffledAnswers[idx];
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = '<span class="answer-letter">' + letters[idx] + '</span><span>' + answer + '</span>';
        btn.setAttribute('data-index', idx);
        btn.addEventListener('click', function () {
            checkAnswer(parseInt(this.getAttribute('data-index')));
        });
        answersContainer.appendChild(btn);
    }

    document.getElementById('question-footer').innerHTML = '';
    document.getElementById('question-modal').classList.add('active');
}

function checkAnswer(selectedIndex) {
    const question = gameState.currentQuestion;
    const isCorrect = selectedIndex === question.shuffledCorrect;
    const player = gameState.players[gameState.currentPlayerIndex];

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.shuffledCorrect) btn.classList.add('correct');
        else if (index === selectedIndex && !isCorrect) btn.classList.add('wrong');
    });

    const footer = document.getElementById('question-footer');

    if (isCorrect) {
        player.score += question.difficulty.points;

        const difficultyIndex = DIFFICULTY_LEVELS.findIndex(d => d.id === question.difficulty.id);
        const wedgePositions = [];
        for (let i = difficultyIndex; i < BOARD_SIZE; i += DIFFICULTY_LEVELS.length) wedgePositions.push(i);

        if (wedgePositions.includes(player.position) && !player.wedges[question.difficulty.id]) {
            player.wedges[question.difficulty.id] = true;
            footer.innerHTML = `
                <div class="feedback correct">✅ Bonne réponse! +${question.difficulty.points} pts<br>🎯 Camembert ${question.difficulty.name} gagné!</div>
                <button class="btn btn-primary" onclick="continueAfterQuestion(true)">Rejouer 🎲</button>
            `;
        } else {
            footer.innerHTML = `
                <div class="feedback correct">✅ Bonne réponse! +${question.difficulty.points} points</div>
                <button class="btn btn-primary" onclick="continueAfterQuestion(true)">Rejouer 🎲</button>
            `;
        }

        if (Object.values(player.wedges).every(w => w)) {
            setTimeout(() => showVictory(player), 1000);
            return;
        }
    } else {
        footer.innerHTML = `
            <div class="feedback wrong">❌ Mauvaise réponse! C'était: ${question.shuffledAnswers[question.shuffledCorrect]}</div>
            <button class="btn btn-secondary" onclick="continueAfterQuestion(false)">Tour suivant →</button>
        `;
    }

    renderScoreboard();
}

function continueAfterQuestion(replay) {
    document.getElementById('question-modal').classList.remove('active');
    if (!replay) nextTurn();
}

function nextTurn() {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    updateTurnIndicator();
    renderScoreboard();
}

// ========================================
// UI UPDATES
// ========================================

function updateTurnIndicator() {
    const player = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('current-player-name').textContent = player.name;
    document.getElementById('current-player-name').style.color = player.color;
}

function renderScoreboard() {
    const container = document.getElementById('scores-container');
    container.innerHTML = '';

    gameState.players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'score-card' + (index === gameState.currentPlayerIndex ? ' active' : '');

        let wedgesHtml = '';
        DIFFICULTY_LEVELS.forEach(level => {
            const earned = player.wedges[level.id];
            wedgesHtml += `<div class="wedge ${earned ? 'earned' : ''}" style="background: ${level.color}; color: ${level.color}"></div>`;
        });

        card.innerHTML = `
            <div class="score-name"><span style="color: ${player.color}">●</span> ${player.name}</div>
            <div class="score-wedges">${wedgesHtml}</div>
        `;
        container.appendChild(card);
    });
}

// ========================================
// VICTORY
// ========================================

function showVictory(winner) {
    document.getElementById('question-modal').classList.remove('active');

    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    const colors = ['#00f5ff', '#ff00ff', '#22c55e', '#f97316', '#ffd700', '#a855f7'];

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 3 + 's';
        confettiContainer.appendChild(piece);
    }

    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('winner-name').style.color = winner.color;

    const finalScores = document.getElementById('final-scores');
    finalScores.innerHTML = '';

    [...gameState.players].sort((a, b) => b.score - a.score).forEach(player => {
        const card = document.createElement('div');
        card.className = 'final-score-card';
        card.innerHTML = `<div class="final-score-name" style="color: ${player.color}">${player.name}</div><div class="final-score-points">${player.score} pts</div>`;
        finalScores.appendChild(card);
    });

    document.getElementById('victory-modal').classList.add('active');
}

function restartGame() {
    document.getElementById('victory-modal').classList.remove('active');
    gameState.players.forEach(player => {
        player.position = 0;
        player.wedges = { discovery: false, easy: false, medium: false, hard: false, expert: false, challenge: false };
        player.score = 0;
    });
    gameState.currentPlayerIndex = 0;
    gameState.questionNumber = 0;
    placePlayerTokens();
    renderScoreboard();
    updateTurnIndicator();
    document.getElementById('dice-value').textContent = '?';
}

function newGame() {
    document.getElementById('victory-modal').classList.remove('active');
    gameState = { currentChapter: null, players: [], currentPlayerIndex: 0, currentQuestion: null, questionNumber: 0, boardCells: [], isRolling: false, gameStarted: false };
    playerCount = 2;
    document.getElementById('player-count').textContent = '2';
    generatePlayerInputs();
    showScreen('chapter-screen');
}

// ========================================
// SCREEN NAVIGATION
// ========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'game-screen' && gameState.gameStarted) {
        setTimeout(() => { generateBoard(); placePlayerTokens(); }, 100);
    }
}

window.addEventListener('resize', () => {
    if (gameState.gameStarted && document.getElementById('game-screen').classList.contains('active')) {
        generateBoard();
        placePlayerTokens();
    }
});
