const minimaxBtn = document.querySelector("#minimax");

function init() {
    minimaxBtn.addEventListener("click", findBestMove);
}
init();
function findBestMove() {
    let bestMoves = [];
    if (!isGameOver) {
        let result;
        let player = getPlayer();
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] == 0) {
                board[i] = player;
                result = minimax(board, (player % 2 + 1));
                let score = -result["bScore"]*(9 / result["depth"]);
                if (score > bestScore) {
                    bestScore = score;
                    bestMoves=[];
                }
                if (score == bestScore) {
                    bestMoves.push(i);
                }
                board[i] = 0;
            }
        }
        console.log(bestMoves)
        let bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
        board[bestMove] = player;
        boxes.forEach(display);
        isGameOver = (checkWinner(board) != -1);
        round++;
    }
}


function minimax(board, player, depth = 0, alpha = -Infinity, beta = Infinity) {
    //Negamax-AB Algorithm
    depth++;
    let gameStatus = checkWinner(board);
    if (gameStatus != -1) {
        if (gameStatus == 0) return {"bScore": 0, "depth":depth};
        else if (gameStatus == player) return {"bScore": 1, "depth":depth};
        else return {"bScore": -1, "depth":depth};;
    }

    let result;
    let bestScore = -Infinity;
    let minDepth = Infinity;
    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            board[i] = player;
            result = minimax(board, (player % 2 + 1), depth, -beta, -Math.max(alpha, bestScore));
            let score = -result["bScore"];
            board[i] = 0;
            bestScore = Math.max(score,bestScore);
            minDepth = Math.min(minDepth,result["depth"]);
            
            if (bestScore >= beta)
                break;
        }
    }
    return {"bScore": bestScore, "depth":minDepth};
}

// function minimax(board, player, alpha = -Infinity, beta = Infinity) {
//     //Negamax-AB Algorithm
    
//     let gameStatus = checkWinner(board);
//     if (gameStatus != -1) {
//         if (gameStatus == 0) return 0;
//         else if (gameStatus == player) return 1;
//         else return -1;
//     }

//     let bestScore = -Infinity;
//     // let bestScore = alpha;
//     for (let i = 0; i < 9; i++) {
//         if (board[i] == 0) {
//             board[i] = player;
//             let score = -minimax(board, (player % 2 + 1), -beta, -Math.max(alpha, bestScore));
//             // let score = -minimax(board, (player % 2 + 1), -beta, -bestScore);
//             board[i] = 0;
//             bestScore = Math.max(score, bestScore);
//             if (bestScore >= beta)
//                 break;
//         }
//     }
//     return bestScore;
// }