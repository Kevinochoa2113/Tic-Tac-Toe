
function fadeOut() {

     TweenMax.to(".myBtn", 1, {
          y: -100,
          opacity: 0
     });

     TweenMax.to(".screen", 2, {
          y: -400,
          opacity: 0,
          ease: Power2.easeInOut,
          delay: 2
     });

     TweenMax.from(".overlay", 2, {
          ease: Power2.easeInOut
     });

     TweenMax.to(".overlay", 2, {
          delay: 2.6,
          top: "-110%",
          ease: Expo.easeInOut
     });

     TweenMax.to(".overlay-2", 2, {
          delay: 3,
          top: "-110%",
          ease: Expo.easeInOut
     });

     TweenMax.from(".content", 2, {
          delay: 3.2,
          opacity: 0,
          ease: Power2.easeInOut
     });

     TweenMax.to(".content", 2, {
          opacity: 1,
          y: -300,
          delay: 3.2,
          ease: Power2.easeInOut
     });

}
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
]
const boxElements = document.querySelectorAll('[boxe]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
     circleTurn = false
     boxElements.forEach(box => {
          box.classList.remove(X_CLASS)
          box.classList.remove(CIRCLE_CLASS)
          box.removeEventListener('click', handleClick)
          box.addEventListener('click', handleClick, { once: true })
     })
     setBoardHoverClass()
     winningMessageElement.classList.remove('show')
}

function handleClick(e) {
     const box = e.target
     const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
     placeMark(box, currentClass)
     if (checkWin(currentClass)) {
          endGame(false)
     } else if (isDraw()) {
          endGame(true)
     } else {
          swapTurns()
          setBoardHoverClass()
     }
}

function endGame(draw) {
     if (draw) {
          winningMessageTextElement.innerText = 'Draw!'
     } else {
          winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
     }
     winningMessageElement.classList.add('show')
}

function isDraw() {
     return [...boxElements].every(box => {
          return box.classList.contains(X_CLASS) || box.classList.contains(CIRCLE_CLASS)
     })
}

function placeMark(box, currentClass) {
     box.classList.add(currentClass)
}

function swapTurns() {
     circleTurn = !circleTurn
}

function setBoardHoverClass() {
     board.classList.remove(X_CLASS)
     board.classList.remove(CIRCLE_CLASS)
     if (circleTurn) {
          board.classList.add(CIRCLE_CLASS)
     } else {
          board.classList.add(X_CLASS)
     }
}

function checkWin(currentClass) {
     return WINNING_COMBINATIONS.some(combination => {
          return combination.every(index => {
               return boxElements[index].classList.contains(currentClass)
          })
     })
}