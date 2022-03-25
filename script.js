var board;
var playerO = '<img class="player" src="./assets/damonO.png"/>';
var playerX = '<img class="player" src="./assets/stefanX.png"/>';
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);

        }
    }
}

function resetGame() {
    //to reset the game select all the divs with class .tile
    const tiles = document.querySelectorAll(".tile");
    // tiles.forEach(function(tile) {
    //         tile.textContent = "";
    //         tile.classList.remove("winner");
    //     })
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i]
        tile.textContent = "";
        tile.classList.remove("winner");
    }
    //set their text content to empty string
    //remove winner class
}


function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-") //"1-1" -> ["1", "1"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != "") {
        return;
    }

    board[r][c] = currPlayer;
    this.innerHTML = currPlayer;

    if (currPlayer == playerO) {
        currPlayer = playerX;
    } else {
        currPlayer = playerO;
    }
    checkWinner();

}

function checkWinner() {
    //check horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != "") {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");

            }
            gameOver = true;
            return;
        }
    }
    //check vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != "") {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "") {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "") {
        for (let i = 0; i < 3; i++) {
            tile = document.getElementById("0-2");
            tile.classList.add("winner");
            tile = document.getElementById("1-1");
            tile.classList.add("winner");
            tile = document.getElementById("2-0");
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
}

document.querySelector(".reset").addEventListener("click", resetGame);