let timeLeft = 60;
let timerDisplay = document.querySelector('#timer');
let ball = document.querySelector('.ball');
let container = document.querySelector('.container');

let popup = document.querySelector('#popup');
let popupMessage = document.querySelector('#popup-message');

const colors = ['#f7cac9', '#f7786b', '#92a8d1', '#034f84'];

let availableColors = {};
let colorInterval;
let timerInterval;

function updateBigBallColor() {
    // בוחרים רק צבעים שקיימים עם ספירה חיובית
    let validColors = Object.keys(availableColors).filter(color => availableColors[color] > 0);
    if (validColors.length === 0) {
        ball.style.backgroundColor = 'gray';
        return;
    }
    let randomIndex = Math.floor(Math.random() * validColors.length);
    ball.style.backgroundColor = validColors[randomIndex];
}

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
}

function showPopup(text) {
    popupMessage.textContent = text;
    popup.style.display = 'block';
}

function checkWin() {
    if (Object.keys(availableColors).length === 0) {
        clearInterval(colorInterval);
        clearInterval(timerInterval);
        showPopup('🎉 כל הכבוד! הצלחת בזמן!');
    }
}

function gameOver() {
    clearInterval(colorInterval);
    clearInterval(timerInterval);
    showPopup('⏰ הזמן אזל! נסו שוב!');
    ball.style.backgroundColor = 'gray';
}

function init() {
    for (let i = 0; i < 55; i++) {
        let num = Math.floor(Math.random() * colors.length);
        let color = colors[num];

        let minBall = document.createElement('div');
        minBall.classList.add('minball');
        minBall.style.backgroundColor = color;
        container.appendChild(minBall);

        // עדכון ספירת הצבעים
        if (availableColors[color]) {
            availableColors[color]++;
        } else {
            availableColors[color] = 1;
        }

        minBall.addEventListener('click', function () {
            let minColor = getComputedStyle(minBall).backgroundColor;
            let ballColor = getComputedStyle(ball).backgroundColor;

            if (minColor === ballColor) {
                minBall.style.display = 'none';
                availableColors[minColor]--;
                if (availableColors[minColor] === 0) {
                    delete availableColors[minColor];
                }
                checkWin();
            }
        });
    }

    updateBigBallColor();
    colorInterval = setInterval(updateBigBallColor, 4000);

    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            gameOver();
        }
    }, 1000);
}

init();
