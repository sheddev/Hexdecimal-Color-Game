const dotHolder = document.getElementById("colors");
const howManyColors = 4;
const answer = document.getElementById("answer");
let score = 0;
let games = 1;
let colorsArray = [];
let displayColor = "";
let hexColorArray = [];
let played = false;
dotHolder.addEventListener("click", guessColor);

function createDots() {
  dotHolder.innerHTML = "";
  colorsArray = [];
  hexColorArray = [];
  answer.innerHTML = "";
  for (i = 0; i < howManyColors; i++) {
    // building the dots
    colorsArray.push(genHex());
  }
  let someRandomNumber = Math.floor(Math.random() * howManyColors);
  displayColor = colorsArray[someRandomNumber];
  diplayHex(displayColor);
  newDot();
}

function diplayHex(displayColor) {
  displayColor = displayColor.toUpperCase();
  let red = displayColor.substring(0, 2);
  let green = displayColor.substring(2, 4);
  let blue = displayColor.substring(4, 6);
  document.getElementById("hexDec").innerHTML =
    "<span>" +
    red +
    "</span><span>" +
    green +
    "</span><span>" +
    blue +
    "</span>";
  hexColorArray.push(red);
  hexColorArray.push(green);
  hexColorArray.push(blue);
}

function genHex() {
  return Math.floor(Math.random() * 0xfffff * 1000000)
    .toString(16)
    .slice(0, 6);
}

function newDot() {
  for (color of colorsArray) {
    let newColorDot = document.createElement("div");
    newColorDot.style.backgroundColor = "#" + color;
    newColorDot.classList.add(color);
    dotHolder.append(newColorDot);
  }
}

function guessColor(e) {
  if (played === true) return false;
  let chosenColor = e.target.classList;
  showCorrect();
  if (displayColor == chosenColor[0]) {
    answer.innerHTML = "<h3>Correct!</h3>";
    score++;
  } else {
    played = true;
    answer.innerHTML = '<h3 style="red">Incorrect! <b>Play again.</b></h3>';
  }
  showScore();
}

function findKey(color) {
  for (let i = 0; i < hexColorArray.length; i++) {
    if (color === hexColorArray[i]) return i;
  }
}

function showCorrect() {
  allDots = document
    .getElementById("colors")
    .getElementsByClassName(displayColor.toLowerCase())[0];
  // correctColor.style.borderWidth = "thick";
  console.log(allDots.classList.add("correct"));
}

function showScore() {
  document.getElementById("score").innerHTML =
    "Score: <span>" + score + "</span> out of <span>" + games + "</span>";
}

document.getElementById("hexDec").addEventListener("mouseover", (e) => {
  hex = e.target.innerText;
  let key = findKey(hex);
  let hoverColor = "";
  if (hex.length <= 3) {
    if (key === 0) hoverColor = parseInt(hex, 16) + ",00, 00";
    else if (key === 1) hoverColor = "00," + parseInt(hex, 16) + ",00";
    else hoverColor = "00,00," + parseInt(hex, 16);
  }
  e.target.style.color = "rgb(" + hoverColor + ")";
});

document.getElementById("hexDec").addEventListener("mouseout", (e) => {
  e.target.style.color = "#000000";
});

document.getElementById("controls").addEventListener("click", () => {
  games++;
  showScore();
  played = false;
  createDots();
});

createDots();
