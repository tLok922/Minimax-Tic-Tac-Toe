let round = 0;
let isGameOver = false;
// let seed;
const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restart");
const seedInputBox = document.querySelector("#seed");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let board = [];

function init() {
    round = 0;
    isGameOver = false;
    for (let i = 0; i < 9; i++) {
        board[i] = 0;
    }
    boxes.forEach(box => box.addEventListener("click", play));
    restartBtn.addEventListener("click", init);
    // seed = Math.floor(Math.random());
    // seedInputBox.addEventListener("keypress",function (e){
    //     if (e.key == 'Enter'){
    //         seed = seedInputBox.value;
    //     }
    // });
    boxes.forEach(display);
}

init();

function getPlayer() {
    return round % 2 + 1;
}

function getPlayerString(player) {
    return (player == 1) ? "O" : "X";
}

function display(box) {
    if (board[box.id] == 1)
        box.innerHTML = "O";
    else if (board[box.id] == 2)
        box.innerHTML = "X";
    else
        box.innerHTML = "";
}

function play() {
    if (isGameOver) {
        alert("Game has ended!")
        return;
    }
    const idx = this.getAttribute("id");
    let player = getPlayer();
    if (board[idx] == 0) {
        board[idx] = player;
        boxes.forEach(display);
        isGameOver = (checkWinner(board) != -1);
        round++;
    }
    else {
        alert("Occupied!");
    }
}

function checkWinner(board) {
    let result = -1;
    for (let i = 0; i < winConditions.length; i++) {
        if (board[winConditions[i][0]] != 0 && board[winConditions[i][0]] && board[winConditions[i][0]] == board[winConditions[i][1]] && board[winConditions[i][1]] == board[winConditions[i][2]]) {
            if (board[winConditions[i][0]] == 1) {
                result = 1;
            }
            else {
                result = 2;
            }
            break;
        }
    }

    if (result < 1 && (board.indexOf(0) == -1)) {
        result = 0;
    }
    return result;
}
