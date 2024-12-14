const music = new Audio("background-music-224633.mp3");
const mturn = new Audio("ting.mp3");
const mgameover = new Audio("videogame-death-sound-43894.mp3");

let turn = "X";
let gameover = false;

// Function to change the turn
const changeTurn = () => (turn === "X" ? "0" : "X");

// Function to check for a win
const checkWin = () => {
    const boxtext = document.getElementsByClassName("boxtext");
    const boxes = document.getElementsByClassName("box");
    const wins = [
        [0, 1, 2],   // Horizontal top
        [3, 4, 5],   // Horizontal middle
        [6, 7, 8],   // Horizontal bottom
        [0, 3, 6],   // Vertical left
        [1, 4, 7],   // Vertical middle
        [2, 5, 8],   // Vertical right
        [0, 4, 8],   // Diagonal top-left to bottom-right
        [2, 4, 6],   // Diagonal top-right to bottom-left
    ];

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won!";
            gameover = true;

            // Highlight the winning boxes
            e.forEach((index) => {
                boxes[index].classList.add("winning");
            });

            // Stop background music and play game over sound
            music.pause();
            mgameover.play();

            // Show the winning emoji
            const img = document.querySelector(".imgbox img");
            img.style.display = "block";
            img.classList.add("winner");
        }
    });
};

// Game logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((box) => {
    const boxtext = box.querySelector(".boxtext");
    box.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            mturn.play();
            checkWin();

            if (!gameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset logic
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
    const boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((boxtext) => {
        boxtext.innerText = "";
    });

    turn = "X";
    gameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;

    // Hide emoji
    const img = document.querySelector(".imgbox img");
    img.style.display = "none";
    img.classList.remove("winner");

    // Remove winning class from boxes
    const boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((box) => {
        box.classList.remove("winning");
    });

    // Play background music
    music.currentTime = 0;
    music.play();
});

// Start music on first user interaction
window.addEventListener("click", () => {
    if (!music.playing) {
        music.play();
        music.loop = true;
    }
}, { once: true }); // Ensure it runs only once
