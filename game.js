/**
 * TRIVIAL PURSUIT ÉDUCATIF - Logique du Jeu
 * Avec chronomètre et statistiques joueurs
 */

let gameState = {
    currentChapter: null,
    players: [],
    currentPlayerIndex: 0,
    currentQuestion: null,
    questionNumber: 0,
    boardCells: [],
    isRolling: false,
    gameStarted: false,
    gameStartTime: null,
    questionStartTime: null,
    timerInterval: null,
    timeLimit: 30 // secondes par question
};

// Statistiques de la session
let sessionStats = {
    startTime: null,
    totalTime: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    playerStats: {} // stats par joueur
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
    document.getElementById('selected-chapter-info').textContent = '📖 ' + chapter.title + ' - ' + chapter.subject;
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
        const group = document.createElement('div');
        group.className = 'player-input-group';
        group.innerHTML = '<div class="player-color" style="background: ' + PLAYER_COLORS[i] + '; box-shadow: 0 0 20px ' + PLAYER_COLORS[i] + '"></div>' +
            '<input type="text" class="player-input" placeholder="Joueur ' + (i + 1) + '" maxlength="15" value="Joueur ' + (i + 1) + '">';
        container.appendChild(group);
    }
}

function startGame() {
    const inputs = document.querySelectorAll('.player-input');
    gameState.players = [];

    inputs.forEach(function (input, index) {
        const playerName = input.value.trim() || 'Joueur ' + (index + 1);
        gameState.players.push({
            name: playerName,
            color: PLAYER_COLORS[index],
            position: 0,
            wedges: { discovery: false, easy: false, medium: false, hard: false, expert: false, challenge: false },
            score: 0
        });

        // Initialiser les stats du joueur
        sessionStats.playerStats[playerName] = {
            questionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalResponseTime: 0,
            responses: [] // détail de chaque réponse
        };
    });

    // Démarrer la session
    sessionStats.startTime = Date.now();
    gameState.gameStartTime = Date.now();
    gameState.gameStarted = true;
    gameState.currentPlayerIndex = 0;

    showScreen('game-screen');
    generateBoard();
    placePlayerTokens();
    renderScoreboard();
    updateTurnIndicator();
}

// ========================================
// GAME BOARD
// ========================================

function generateBoard() {
    const board = document.getElementById('game-board');
    const existingCells = board.querySelectorAll('.board-cell');
    existingCells.forEach(function (cell) { cell.remove(); });

    gameState.boardCells = [];
    const boardRect = board.getBoundingClientRect();
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;

    for (let i = 0; i < BOARD_SIZE; i++) {
        const angle = (i / BOARD_SIZE) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const difficultyIndex = i % DIFFICULTY_LEVELS.length;
        const difficulty = DIFFICULTY_LEVELS[difficultyIndex];

        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.style.left = (x - 27.5) + 'px';
        cell.style.top = (y - 27.5) + 'px';
        cell.style.background = difficulty.color;
        cell.style.color = '#fff';
        cell.textContent = (i + 1);
        cell.setAttribute('data-position', i);

        gameState.boardCells.push({ element: cell, x: x, y: y, difficulty: difficulty });
        board.appendChild(cell);
    }
}

function placePlayerTokens() {
    const board = document.getElementById('game-board');
    const existingTokens = board.querySelectorAll('.player-token');
    existingTokens.forEach(function (token) { token.remove(); });

    gameState.players.forEach(function (player, index) {
        const token = document.createElement('div');
        token.className = 'player-token';
        token.id = 'token-' + index;
        token.style.background = player.color;
        board.appendChild(token);
    });

    updateTokenPositions();
}

function updateTokenPositions() {
    gameState.players.forEach(function (player, index) {
        const token = document.getElementById('token-' + index);
        if (!token) return;

        const cell = gameState.boardCells[player.position];
        if (cell) {
            const offsetAngle = (index / gameState.players.length) * Math.PI * 0.5;
            const offsetRadius = 15;
            token.style.left = (cell.x - 17.5 + Math.cos(offsetAngle) * offsetRadius) + 'px';
            token.style.top = (cell.y - 17.5 + Math.sin(offsetAngle) * offsetRadius) + 'px';
        }

        gameState.boardCells.forEach(function (c, i) {
            c.element.classList.toggle('current', i === player.position && index === gameState.currentPlayerIndex);
        });
    });
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
    const maxRolls = 10;
    const rollInterval = setInterval(function () {
        diceValue.textContent = Math.floor(Math.random() * 6) + 1;
        rolls++;

        if (rolls >= maxRolls) {
            clearInterval(rollInterval);
            const finalValue = Math.floor(Math.random() * 6) + 1;
            diceValue.textContent = finalValue;
            dice.classList.remove('rolling');

            setTimeout(function () { movePlayer(finalValue); }, 300);
        }
    }, 100);
}

function movePlayer(steps) {
    const player = gameState.players[gameState.currentPlayerIndex];
    let currentStep = 0;

    const moveInterval = setInterval(function () {
        currentStep++;
        player.position = (player.position + 1) % BOARD_SIZE;
        updateTokenPositions();

        if (currentStep >= steps) {
            clearInterval(moveInterval);
            gameState.isRolling = false;

            const currentCell = gameState.boardCells[player.position];
            setTimeout(function () { showQuestion(currentCell.difficulty); }, 500);
        }
    }, 300);
}

// ========================================
// QUESTIONS & TIMER
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

    // Fisher-Yates shuffle
    let currentIndex = answersToShuffle.length;
    while (currentIndex > 0) {
        let randomIdx = Math.floor(Math.random() * currentIndex);
        currentIndex--;
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

    gameState.currentQuestion = {
        question: question.question,
        courseReminder: question.courseReminder,
        difficulty: difficulty,
        shuffledAnswers: answersToShuffle.map(function (a) { return a.text; }),
        shuffledCorrect: correctPosition
    };

    // Démarrer le chronomètre
    gameState.questionStartTime = Date.now();
    startTimer();

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

function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;

    let timeLeft = gameState.timeLimit;
    updateTimerDisplay(timeLeft);

    if (gameState.timerInterval) clearInterval(gameState.timerInterval);

    gameState.timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            timeExpired();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;

    timerDisplay.textContent = seconds + 's';

    // Changer la couleur selon le temps restant
    if (seconds <= 5) {
        timerDisplay.classList.add('timer-critical');
        timerDisplay.classList.remove('timer-warning');
    } else if (seconds <= 10) {
        timerDisplay.classList.add('timer-warning');
        timerDisplay.classList.remove('timer-critical');
    } else {
        timerDisplay.classList.remove('timer-warning', 'timer-critical');
    }
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function timeExpired() {
    // Temps écoulé = mauvaise réponse
    const question = gameState.currentQuestion;
    const player = gameState.players[gameState.currentPlayerIndex];
    const responseTime = gameState.timeLimit;

    // Enregistrer les stats
    logPlayerResponse(player.name, false, responseTime, question);

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(function (btn, index) {
        btn.disabled = true;
        if (index === question.shuffledCorrect) btn.classList.add('correct');
    });

    const footer = document.getElementById('question-footer');
    footer.innerHTML = '<div class="feedback wrong">⏱️ Temps écoulé! La réponse était: ' + question.shuffledAnswers[question.shuffledCorrect] + '</div>' +
        '<button class="btn btn-secondary" onclick="continueAfterQuestion(false)">Tour suivant →</button>';

    renderScoreboard();
}

function checkAnswer(selectedIndex) {
    stopTimer();

    const responseTime = (Date.now() - gameState.questionStartTime) / 1000;
    const question = gameState.currentQuestion;
    const isCorrect = selectedIndex === question.shuffledCorrect;
    const player = gameState.players[gameState.currentPlayerIndex];

    // Enregistrer les statistiques
    logPlayerResponse(player.name, isCorrect, responseTime, question);

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(function (btn, index) {
        btn.disabled = true;
        if (index === question.shuffledCorrect) btn.classList.add('correct');
        else if (index === selectedIndex && !isCorrect) btn.classList.add('wrong');
    });

    const footer = document.getElementById('question-footer');
    const timeBonus = isCorrect && responseTime < 10 ? ' ⚡ Rapide!' : '';

    if (isCorrect) {
        player.score += question.difficulty.points;

        const difficultyIndex = DIFFICULTY_LEVELS.findIndex(function (d) { return d.id === question.difficulty.id; });
        const wedgePositions = [];
        for (let i = difficultyIndex; i < BOARD_SIZE; i += DIFFICULTY_LEVELS.length) wedgePositions.push(i);

        if (wedgePositions.includes(player.position) && !player.wedges[question.difficulty.id]) {
            player.wedges[question.difficulty.id] = true;
            footer.innerHTML = '<div class="feedback correct">✅ Bonne réponse en ' + responseTime.toFixed(1) + 's! +' + question.difficulty.points + ' pts' + timeBonus + '<br>🎯 Camembert ' + question.difficulty.name + ' gagné!</div>' +
                '<button class="btn btn-primary" onclick="continueAfterQuestion(true)">Rejouer 🎲</button>';
        } else {
            footer.innerHTML = '<div class="feedback correct">✅ Bonne réponse en ' + responseTime.toFixed(1) + 's! +' + question.difficulty.points + ' points' + timeBonus + '</div>' +
                '<button class="btn btn-primary" onclick="continueAfterQuestion(true)">Rejouer 🎲</button>';
        }

        if (Object.values(player.wedges).every(function (w) { return w; })) {
            setTimeout(function () { showVictory(player); }, 1000);
            return;
        }
    } else {
        footer.innerHTML = '<div class="feedback wrong">❌ Mauvaise réponse en ' + responseTime.toFixed(1) + 's. C\'était: ' + question.shuffledAnswers[question.shuffledCorrect] + '</div>' +
            '<button class="btn btn-secondary" onclick="continueAfterQuestion(false)">Tour suivant →</button>';
    }

    renderScoreboard();
}

function logPlayerResponse(playerName, isCorrect, responseTime, question) {
    // Stats globales
    sessionStats.questionsAnswered++;
    if (isCorrect) {
        sessionStats.correctAnswers++;
    } else {
        sessionStats.wrongAnswers++;
    }

    // Stats du joueur
    const playerStats = sessionStats.playerStats[playerName];
    if (playerStats) {
        playerStats.questionsAnswered++;
        playerStats.totalResponseTime += responseTime;
        if (isCorrect) {
            playerStats.correctAnswers++;
        } else {
            playerStats.wrongAnswers++;
        }
        playerStats.responses.push({
            question: question.question,
            difficulty: question.difficulty.name,
            isCorrect: isCorrect,
            responseTime: responseTime,
            timestamp: new Date().toISOString()
        });
    }

    // Log dans la console pour debug
    console.log('📊 Stats:', playerName, isCorrect ? '✅' : '❌', responseTime.toFixed(1) + 's');
}

function continueAfterQuestion(replay) {
    stopTimer();
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

function generateLegend() {
    const container = document.getElementById('legend-items');
    container.innerHTML = '';

    DIFFICULTY_LEVELS.forEach(function (level) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = '<div class="legend-color" style="background: ' + level.color + '"></div><span>' + level.name + ' (' + level.points + ' pt' + (level.points > 1 ? 's' : '') + ')</span>';
        container.appendChild(item);
    });
}

function renderScoreboard() {
    const container = document.getElementById('scores-container');
    container.innerHTML = '';

    gameState.players.forEach(function (player, index) {
        const card = document.createElement('div');
        card.className = 'score-card' + (index === gameState.currentPlayerIndex ? ' active' : '');
        card.style.borderLeftColor = player.color;

        let wedgesHTML = '';
        DIFFICULTY_LEVELS.forEach(function (level) {
            const earned = player.wedges[level.id];
            wedgesHTML += '<div class="wedge' + (earned ? ' earned' : '') + '" style="background: ' + level.color + '; color: ' + level.color + '"></div>';
        });

        // Afficher les stats du joueur
        const playerStats = sessionStats.playerStats[player.name];
        let statsText = '';
        if (playerStats && playerStats.questionsAnswered > 0) {
            const accuracy = Math.round((playerStats.correctAnswers / playerStats.questionsAnswered) * 100);
            statsText = '<div class="player-accuracy">' + accuracy + '% correct</div>';
        }

        card.innerHTML = '<div class="score-name"><span style="color: ' + player.color + '">● </span>' + player.name + ' <span style="opacity:0.6">(' + player.score + ' pts)</span></div>' +
            statsText +
            '<div class="score-wedges">' + wedgesHTML + '</div>';
        container.appendChild(card);
    });
}

// ========================================
// VICTORY & STATS
// ========================================

function showVictory(winner) {
    stopTimer();

    // Calculer le temps total de jeu
    const totalGameTime = Math.round((Date.now() - gameState.gameStartTime) / 1000);
    sessionStats.totalTime = totalGameTime;

    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';

    const colors = ['#00f5ff', '#ff00ff', '#22c55e', '#ffd700', '#ef4444', '#a855f7'];
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        confettiContainer.appendChild(piece);
    }

    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('winner-name').style.color = winner.color;

    const finalScores = document.getElementById('final-scores');
    finalScores.innerHTML = '';

    // Afficher les scores finaux avec stats
    var sortedPlayers = gameState.players.slice().sort(function (a, b) { return b.score - a.score; });
    sortedPlayers.forEach(function (player) {
        const stats = sessionStats.playerStats[player.name];
        const avgTime = stats.questionsAnswered > 0 ? (stats.totalResponseTime / stats.questionsAnswered).toFixed(1) : 0;
        const accuracy = stats.questionsAnswered > 0 ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) : 0;

        const card = document.createElement('div');
        card.className = 'final-score-card';
        card.innerHTML = '<div class="final-score-name" style="color: ' + player.color + '">' + player.name + '</div>' +
            '<div class="final-score-points">' + player.score + ' pts</div>' +
            '<div class="final-score-stats">' + stats.correctAnswers + '/' + stats.questionsAnswered + ' (' + accuracy + '%) • Moy: ' + avgTime + 's</div>';
        finalScores.appendChild(card);
    });

    // Ajouter les stats globales
    const statsDiv = document.createElement('div');
    statsDiv.className = 'game-stats-summary';
    const minutes = Math.floor(totalGameTime / 60);
    const seconds = totalGameTime % 60;
    statsDiv.innerHTML = '<h4>📊 Statistiques de la partie</h4>' +
        '<p>⏱️ Durée: ' + minutes + 'min ' + seconds + 's</p>' +
        '<p>❓ Questions: ' + sessionStats.questionsAnswered + '</p>' +
        '<p>✅ Bonnes réponses: ' + sessionStats.correctAnswers + '</p>' +
        '<p>❌ Mauvaises réponses: ' + sessionStats.wrongAnswers + '</p>';
    finalScores.appendChild(statsDiv);

    document.getElementById('victory-modal').classList.add('active');

    // Log final dans la console
    console.log('📊 STATISTIQUES FINALES:', sessionStats);
}

function restartGame() {
    document.getElementById('victory-modal').classList.remove('active');

    // Reset stats des joueurs
    gameState.players.forEach(function (player) {
        player.position = 0;
        player.wedges = { discovery: false, easy: false, medium: false, hard: false, expert: false, challenge: false };
        player.score = 0;
        sessionStats.playerStats[player.name] = {
            questionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalResponseTime: 0,
            responses: []
        };
    });

    // Reset stats globales
    sessionStats.questionsAnswered = 0;
    sessionStats.correctAnswers = 0;
    sessionStats.wrongAnswers = 0;
    sessionStats.startTime = Date.now();

    gameState.gameStartTime = Date.now();
    gameState.currentPlayerIndex = 0;
    gameState.questionNumber = 0;
    placePlayerTokens();
    renderScoreboard();
    updateTurnIndicator();
    document.getElementById('dice-value').textContent = '?';
}

function newGame() {
    document.getElementById('victory-modal').classList.remove('active');
    gameState = {
        currentChapter: null,
        players: [],
        currentPlayerIndex: 0,
        currentQuestion: null,
        questionNumber: 0,
        boardCells: [],
        isRolling: false,
        gameStarted: false,
        gameStartTime: null,
        questionStartTime: null,
        timerInterval: null,
        timeLimit: 30
    };
    sessionStats = {
        startTime: null,
        totalTime: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        playerStats: {}
    };
    playerCount = 2;
    document.getElementById('player-count').textContent = '2';
    generatePlayerInputs();
    showScreen('chapter-screen');
}

// ========================================
// SCREEN NAVIGATION
// ========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(function (screen) { screen.classList.remove('active'); });
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'game-screen' && gameState.gameStarted) {
        setTimeout(function () { generateBoard(); placePlayerTokens(); }, 100);
    }
}

window.addEventListener('resize', function () {
    if (gameState.gameStarted && document.getElementById('game-screen').classList.contains('active')) {
        generateBoard();
        placePlayerTokens();
    }
});
