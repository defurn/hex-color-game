let colorPieces = [];
let winnerHex = '';
let winnerElement;

function setBoard(){
  let difficulty = document.getElementById('difficulty').value;
  let colors = document.getElementById('color-choices')

  //reset the pieces
  colors.innerHTML = '';
  colorPieces = [];
  winnerHex = '';
  if (winnerElement !== undefined){winnerElement.setAttribute('style', '')};

  for (i = 0; i < difficulty; i++){
    let hex = getRandomHexColor(difficulty);
    let colorElement = createColorBox(hex)
    colors.appendChild(colorElement)
    colorPieces.push(hex)
  }

  winnerElement =  document.getElementById('winner')
  winnerElement.innerHTML = pickWinningHex();
}

function createColorBox(hex){
  let colorElement = document.createElement('div')
  colorElement.setAttribute("id", hex);
  colorElement.setAttribute("style", `background-color:${hex}; width:50px; height:50px; margin:auto;`)
  colorElement.addEventListener('click',() => {checkWinner(hex)});
  colorPieces.push(hex)
  return colorElement;
}

function getHexComplement(hexColorValue){
  let fontR = 0xff ^ hexColorValue.substr(1, 2);
  let fontG = 0xff ^ hexColorValue.substr(3, 2);
  let fontB = 0xff ^ hexColorValue.substr(5, 2);
  return "#" + fontR.toString(16) + fontG.toString(16) + fontB.toString(16)
}

function checkWinner(elementHex) {
  if (elementHex === winnerHex) {
    let fontColor = getHexComplement(elementHex)
    winnerElement.setAttribute("style", `color:${fontColor}; background-color:${elementHex}`)
  } else {
    document.getElementById(elementHex).setAttribute("style", "background-color:#fff; width:50px; height:50px; margin:auto;");
  }
}

function getRandomHexColor(difficulty){
  //needs a function to spread numbers out based on difficulty setting
  addPad = (num) => {if (num.length < 2){num = "0" + num} return num}
  rndHex = () => {return (Math.floor(Math.random() * 255)).toString(16);}
  let r = addPad(rndHex());
  let g = addPad(rndHex());
  let b = addPad(rndHex());
  let hex = "#" + r + g +b
  return hex
}


function pickWinningHex(){
  let winner = colorPieces[Math.floor(Math.random() * colorPieces.length)];
  winnerHex = winner;
  return `<h2>${winner}</h2>`
}
