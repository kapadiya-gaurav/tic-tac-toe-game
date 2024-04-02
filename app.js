let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let imgContainer = document.querySelector(".img-container")
let img1 = document.querySelector(".hide-img1")
let img2 = document.querySelector(".hide-img2")
let msg = document.querySelector("#msg");

let turnO = true; //playerO, playerX
let count = 0; // to track draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      showDraw();
    }
  });
});

let showDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  imgContainer.classList.remove("hide");
  img2.classList.remove("hide-img2");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        // console.log("winner is  ", pos1Val);
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

let showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  imgContainer.classList.remove("hide");
  img1.classList.remove("hide-img1");
  disableBoxes();
};

let disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

let resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  imgContainer.classList.add("hide");
  img1.classList.add("hide-img1");
  img2.classList.add("hide-img2");
};

let enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

resetGameBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);