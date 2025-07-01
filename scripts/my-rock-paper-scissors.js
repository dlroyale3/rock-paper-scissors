class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.head.next = newNode;
            this.head.prev = newNode;
        } else {
            const tail = this.head.prev;
            tail.next = newNode;
            newNode.prev = tail;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
    }

    find(data) {
        if (!this.head) return null;

        let current = this.head;
        do {
            if (current.data === data) return current;
            current = current.next;
        } while (current != this.head);

        return null;
    }
}

let movesList = new DoubleLinkedList();
movesList.append("rock");
movesList.append("paper");
movesList.append("scissors");

let score = {
    wins: 0,
    loses: 0,
    ties: 0
};

displayScore();

function getComputerMove() {
    seed = Math.random();
    let computerMove = "";

    if (seed < 1/3)
        computerMove = "rock";
    else if (seed >= 1/3 && seed < 2/3)
        computerMove = "paper";
    else
        computerMove = "scissors";

    return computerMove;
}

function getResult(moveA, moveB) {
    if (moveA === moveB) return "Tie."
    
    let nodeA = movesList.find(moveA);

    if (nodeA.next.data === moveB) return "You lose."
    return "You win."
}

function updateScore(result) {
    switch (result) {
        case "You win.":
            score.wins++;
            break;
        case "Tie.":
            score.ties++;
            break;
        case "You lose.":
            score.loses++;
            break;
        default:
            console.log("Invalid result.");
    }
}

function displayResult(result) {
    document.querySelector(".js-result").innerHTML = result;
}

function displayMoves(playerMove, computerMove) {
    document.querySelector(".js-moves").innerHTML = `You played ${playerMove}. Computer played ${computerMove}.`;
}

function displayScore() {
    document.querySelector(".score").innerHTML = `Wins: ${score.wins} Losses: ${score.loses} Ties: ${score.ties}`;
}

function playGame(playerMove) {
    const computerMove = getComputerMove();

    const result = getResult(playerMove, computerMove);

    updateScore(result);

    displayResult(result);
    displayMoves(playerMove, computerMove);
    displayScore();
}

function hideResultAndMoves() {
    document.querySelector(".js-result").innerHTML = "";
    document.querySelector(".js-moves").innerHTML = "";
}

function resetScore() {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    displayScore();
    hideResultAndMoves();
}
