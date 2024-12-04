const maximinBtn = document.querySelector("#maximin");

function init() {
    maximinBtn.addEventListener("click", findWorstMove);
}
init();
function findWorstMove() {
    let worstMoves = [];
    if (!isGameOver) {
        let result;
        let player = getPlayer();
        let worstScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] == 0) {
                board[i] = player;
                result = maximin(board, (player % 2 + 1));
                let score = -result["wScore"]*(9 / result["depth"]);
                if (score < worstScore) {
                    worstScore = score;
                    worstMoves=[];
                }
                if (score == worstScore){
                    worstMoves.push(i);
                }
                board[i] = 0;
            }
        }
        let worstMove = worstMoves[Math.floor(Math.random() * worstMoves.length)];
        board[worstMove] = player;
        boxes.forEach(display);
        isGameOver = (checkWinner(board) != -1);
        round++;
    }
}

function maximin(board, player, depth = 0, alpha = Infinity, beta = -Infinity) {
    //Negamin-AB Algorithm
    depth++;
    let gameStatus = checkWinner(board);
    if (gameStatus != -1) {
        if (gameStatus == 0) return {"wScore": 0, "depth":depth};
        else if (gameStatus == player) return {"wScore": 1, "depth":depth};
        else return {"wScore": -1, "depth":depth};
    }
    let result;
    let worstScore = Infinity;
    let minDepth = Infinity;
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            board[i] = player;
            result = maximin(board, (player % 2 + 1), depth, -beta, -Math.min(alpha, worstScore));
            let score = -result["wScore"];
            board[i] = 0;
            worstScore = Math.min(score, worstScore);
            minDepth = Math.min(result["depth"],minDepth);
            if (worstScore <= beta)
                break;
        }
    }
    return {"wScore": worstScore, "depth":minDepth};
}

// function maximin(board, player, alpha = Infinity, beta = -Infinity) {
//     //Negamin-AB Algorithm
    
//     let gameStatus = checkWinner(board);
//     if (gameStatus != -1) {
//         if (gameStatus == 0) return 0;
//         else if (gameStatus == player) return 1;
//         else return -1;
//     }
//     let worstScore = Infinity;
//     for (let i = 0; i < 9; i++) {
//         if (board[i] == 0) {
//             board[i] = player;
//             let score = -maximin(board, (player % 2 + 1), -beta, -Math.min(alpha, worstScore));
//             board[i] = 0;
//             worstScore = Math.min(score, worstScore);
//             if (worstScore <= beta)
//                 break;
//         }
//     }
//     return worstScore;
// }