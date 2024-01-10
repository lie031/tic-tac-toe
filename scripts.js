const gameboard = (()=>{

  const board = document.querySelectorAll(".cell");

  const getBoard = ()=> [...board];

  return{getBoard}

})();

const player = (name,symbol)=>{
  const getName = ()=>name;
  const getSymbol = ()=>symbol;

  return{getName,getSymbol}
}

const game =( ()=>{

  gameboard.getBoard().forEach((element)=>{
    element.addEventListener("click",()=>{
      if(!gameEnd && element.textContent===""){
         element.textContent= currentplayer.getSymbol();
    
        if(checkwin()){
          document.querySelector(".winner").textContent = `${currentplayer.getSymbol()} WINS`;
          gameEnd= true;
          resetGame(gameEnd)
        }
        else if(checkdraw()){
          document.querySelector(".winner").textContent = `Its a draw`;
          gameEnd =true;
          resetGame(gameEnd)
        }

        currentplayer = currentplayer===player1?player2:player1;
        document.querySelector(".turn").textContent = `${currentplayer.getSymbol()} turn`;
      }
    })
  })
})();

const checkwin = ()=>{

  const cells = gameboard.getBoard();
  const symbol = currentplayer.getSymbol();

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].textContent === symbol &&
      cells[b].textContent === symbol &&
      cells[c].textContent === symbol
    ) {
      return true;
    } 
  }
 return false;
}

const checkdraw = ()=>{
  const cells = gameboard.getBoard();
 
  for(const cell of cells){
    if(cell.textContent===""){
      return false;
    }
  }
  return true;
}

const resetGame = ()=>{
  const resetBtn = document.createElement('button');
  resetBtn.classList.add('resetBtn');
  resetBtn.textContent = 'reset'
  document.querySelector('.winner').appendChild(resetBtn);
  resetBtn.addEventListener('click',()=>{
    gameboard.getBoard().forEach((element)=>{
      element.textContent="";
    })
    gameEnd= false;
    document.querySelector('.winner').removeChild(resetBtn);
    document.querySelector('.winner').textContent = '';
    currentplayer = player1;
    document.querySelector(".turn").textContent = `${currentplayer.getSymbol()} turn`;
  })
}

let player1 = player("player1","X");
let player2 = player("player2","O");
let currentplayer = player1;
let gameEnd = false;
document.querySelector(".turn").textContent = `${currentplayer.getSymbol()} turn`;



