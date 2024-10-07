// Game state
const gameState = {
    score: 0,
    pointsPerClick: 1,
    highScores: [],
    totalClicks: 0,
    upgradeLevel: 0,
    isNewHighScore: false
};

// DOM elements
const elements = {
    score: document.getElementById("score"),
    pointsPerClick: document.getElementById("points-per-click"),
    upgradeButton: document.getElementById("upgrade-button"),
    freakmoji: document.getElementById("freakmoji"),
    tree: document.querySelector('.tree'),
    shop: document.querySelector('.shop'),
    scoreBoard: document.querySelector('.score-board'),
    finishButton: document.querySelector('.finish-button'),
    highScoreBoard: document.getElementById('high-score-board'),
    finalScore: document.getElementById('final-score'),
    totalClicks: document.getElementById('total-clicks'),
    highScoreList: document.getElementById('high-scores'),
    loadingScreen: document.getElementById('loading-screen'),
    newHighScore: document.getElementById('new-high-score'),
    playerNameInput: document.getElementById('player-name'),
    submitScoreButton: document.getElementById('submit-score')
};

// Update functions
const updateFunctions = {
    score: () => elements.score.innerText = gameState.score,
    pointsPerClick: () => elements.pointsPerClick.innerText = gameState.pointsPerClick,
    upgradeButton: () => {
        const upgradeName = getUpgradeName(gameState.upgradeLevel);
        const upgradeCost = getUpgradeCost(gameState.upgradeLevel);
        const upgradeIncrease = getUpgradePointsIncrease(gameState.upgradeLevel);
        elements.upgradeButton.innerText = `${upgradeName}: +${upgradeIncrease} Points per Click (Cost: ${upgradeCost} Points)`;
    }
};

// Game actions
const gameActions = {
    clickFreakmoji: () => {
        gameState.score += gameState.pointsPerClick;
        gameState.totalClicks++;
        updateFunctions.score();
    },

    buyUpgrade: () => {
        const upgradeCost = getUpgradeCost(gameState.upgradeLevel);
        if (gameState.score >= upgradeCost) {
            gameState.score -= upgradeCost;
            gameState.upgradeLevel++;
            gameState.pointsPerClick += getUpgradePointsIncrease(gameState.upgradeLevel - 1);
            updateFunctions.score();
            updateFunctions.pointsPerClick();
            updateFunctions.upgradeButton();
        } else {
            alert("Not enough points to buy the upgrade!");
        }
    },

    finishGame: () => {
        toggleElementsVisibility(false);
        elements.finalScore.innerText = gameState.score;
        elements.totalClicks.innerText = gameState.totalClicks;

        checkForHighScore();
        if (!gameState.isNewHighScore) {
            updateHighScoreList();
        }
    },

    playAgain: () => {
        resetGameState();
        updateAllElements();
        toggleElementsVisibility(true);
        elements.newHighScore.classList.add('hidden');
    },

    submitHighScore: () => {
        const playerName = elements.playerNameInput.value.trim() || 'Anonymous';
        const newScore = { name: playerName, score: gameState.score, clicks: gameState.totalClicks };
        gameState.highScores.push(newScore);
        gameState.highScores.sort((a, b) => b.score - a.score);
        if (gameState.highScores.length > 10) {
            gameState.highScores.pop();
        }
        saveHighScores();
        updateHighScoreList();
        elements.newHighScore.classList.add('hidden');
    }
};

// Helper functions
function toggleElementsVisibility(showGame) {
    const gameElements = [elements.tree, elements.shop, elements.scoreBoard, elements.finishButton];
    gameElements.forEach(element => element.classList.toggle('hidden', !showGame));
    elements.highScoreBoard.classList.toggle('hidden', showGame);
}

function resetGameState() {
    gameState.score = 0;
    gameState.pointsPerClick = 1;
    gameState.totalClicks = 0;
    gameState.upgradeLevel = 0;
    gameState.isNewHighScore = false;
}

function updateAllElements() {
    updateFunctions.score();
    updateFunctions.pointsPerClick();
    updateFunctions.upgradeButton();
}

function updateHighScoreList() {
    elements.highScoreList.innerHTML = '';
    gameState.highScores.forEach((s, index) => {
        const li = document.createElement('li');
        li.innerText = `${s.name}: ${s.score} points (${s.clicks} clicks)`;
        elements.highScoreList.appendChild(li);
    });
}

function checkForHighScore() {
    const lowestHighScore = gameState.highScores[9]?.score || 0;
    gameState.isNewHighScore = gameState.score > lowestHighScore || gameState.highScores.length < 10;
    elements.newHighScore.classList.toggle('hidden', !gameState.isNewHighScore);
}

function saveHighScores() {
    localStorage.setItem('highScores', JSON.stringify(gameState.highScores));
}

function loadHighScores() {
    const savedScores = localStorage.getItem('highScores');
    if (savedScores) {
        gameState.highScores = JSON.parse(savedScores);
    }
}

// Event listeners
elements.freakmoji.addEventListener("click", gameActions.clickFreakmoji);
elements.upgradeButton.addEventListener("click", gameActions.buyUpgrade);
elements.finishButton.addEventListener("click", gameActions.finishGame);
elements.submitScoreButton.addEventListener("click", gameActions.submitHighScore);

// Make sure this event listener is present
elements.highScoreBoard.querySelector('#play-again-button').addEventListener("click", gameActions.playAgain);

// Call this function when initializing the game
loadHighScores();

// Initialize the game
loadHighScores();
updateHighScoreList();
updateFunctions.upgradeButton();

window.addEventListener('load', () => {
    elements.loadingScreen.style.display = 'none';
});
