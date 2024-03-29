//gameboardObj.gameboardArr = [["x","","x"],["o","o","o"],["x","o","o"]];

const choosePlayerXbtn = document.querySelector('#xBtn');
const choosePlayerObtn = document.querySelector('#oBtn');
const playerSelectionMenu = document.querySelector('.selectButton');
const gameDisplaySpots = document.querySelectorAll('td');

const winnerMenu = document.querySelector('.winnerMenu');

function Gameboard(){
    this.gameboardArr=[["","",""],["","",""],["","",""]];
}
 
const gameboardObj = new Gameboard();

function updateBoard(posy,posx,playerChar){
    let k=0;
    if(gameboardObj.gameboardArr[posy][posx]==""){
        gameboardObj.gameboardArr[posy][posx]=playerChar;    
    }
    
    
    gameboardObj.gameboardArr.forEach((rowArr,i)=>{
        
        for(let j=0;j<gameboardObj.gameboardArr[i].length;j++){            
            if(gameboardObj.gameboardArr[i][j]!="" || playerChar == ""){
                gameDisplaySpots[k].textContent= gameboardObj.gameboardArr[i][j];
                gameDisplaySpots[k].style.color="black";
            }
    
            k++;
        }      
    })
    
}

function resetGame(){
    const playAgainBtn = document.querySelector('#playAgain');
    
    playAgainBtn.addEventListener('click',()=>{
        gameboardObj.gameboardArr = [["","",""],["","",""],["","",""]];
        
        for(let i=0;i<gameDisplaySpots.length;i++){
            gameDisplaySpots[i].style.color= "white";
            gameDisplaySpots[i].textContent ='n';
        }
        winnerMenu.style.display = 'none';
        playerSelectionMenu.style.display ='block';
    })
}

function showWinner(winningPlayer){
    const displayWinner = document.querySelector('#displayWinner');
    
    displayWinner.textContent = `Player ${winningPlayer.toUpperCase()} Has Won!`

    winnerMenu.style.display = 'block'; 

}

function showTie(){
    const displayWinner = document.querySelector('#displayWinner');
    
    displayWinner.textContent = `It a Tie!`

    winnerMenu.style.display = 'block'; 

}


function checkWinner(playerChar){
    let winner = false;
    for(let i=0;i<3;i++){
        if(gameboardObj.gameboardArr[0][i]==playerChar&&
        gameboardObj.gameboardArr[1][i]==playerChar&&
        gameboardObj.gameboardArr[2][i]==playerChar){
            showWinner(playerChar);
            
            return true;
        }

        if(gameboardObj.gameboardArr[i][0]==playerChar&&
        gameboardObj.gameboardArr[i][1]==playerChar&&
        gameboardObj.gameboardArr[i][2]==playerChar){
            showWinner(playerChar);
            
            return true;
        }
    }

    if(gameboardObj.gameboardArr[0][0]==playerChar&&
        gameboardObj.gameboardArr[1][1]==playerChar&&
        gameboardObj.gameboardArr[2][2]==playerChar){
            showWinner(playerChar);
            
            return true;
    }

    if(gameboardObj.gameboardArr[0][2]==playerChar&&
        gameboardObj.gameboardArr[1][1]==playerChar&&
        gameboardObj.gameboardArr[2][0]==playerChar){
            showWinner(playerChar);
            
            return true;
    }

    let checkForTie = true; 
    gameboardObj.gameboardArr.forEach(rowArr=>{
        rowArr.forEach(spot=>{
            if(spot==""){
                checkForTie = false;
            }
        })
    })

    if(checkForTie){
        showTie();
        return true;
    }
       
}



function gameLogic(){
    let playerChar = "";

    function switchPlayer(){
        if(playerChar ==="x"){
            playerChar= "o";
        }else if(playerChar ==="o"){
            playerChar = "x";
        } else{
            playerChar ="";  
        }
    }

    choosePlayerXbtn.addEventListener('click',()=>{
        playerSelectionMenu.style.display = 'none';
        playerChar = "x";
    })
    
    choosePlayerObtn.addEventListener('click',()=>{
        playerSelectionMenu.style.display = 'none';
        playerChar = "o"
    })

    gameDisplaySpots.forEach(spot=>{
        spot.addEventListener('click',()=>{
            if(playerChar!=""){
                updateBoard(spot.dataset.y,spot.dataset.x,playerChar); 
                if(checkWinner(playerChar)!=true){
                    switchPlayer();
                }else{
                    resetGame();
                    playerChar="";
                }
                
            } 
        })
    })
}




//run game
gameLogic();









