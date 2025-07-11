const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const gamebtn = document.querySelector(".btn");

let currentPlayer;
let gamegrid;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init(){
    currentPlayer='x';
    gamegrid= ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        boxes[index].style.pointerEvents="all";
         box.classList=`box box${index+1}`;  

    })
    gamebtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}
init();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
       
    })
})

function swapturn(){
    if(currentPlayer=="x"){
        currentPlayer="0"
    }else{
        currentPlayer='x';
    }
    gameinfo.innerText = `Current Player - ${currentPlayer}`;

}
function checkgameover(){
    let answer="";
    
    winningPositions.forEach((positions)=>{
        if((gamegrid[positions[0]]!==""||gamegrid[positions[1]]!==""||gamegrid[positions[2]]!=="")
        &&(gamegrid[positions[0]]===gamegrid[positions[1]])&&(gamegrid[positions[1]]===gamegrid[positions[2]])){
    
            if(gamegrid[positions[0]]==="x")
                answer="x";
            else
            answer="0";
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");

        }
    });

    if(answer !==""){
        gameinfo.innerHTML =`winner player -${answer}`;
        gamebtn.classList.add("active");
        return;
    }


let fillcount=0;
gamegrid.forEach((box)=>{
    if(box!=="")
        fillcount++
})
if(fillcount ===9){
    gameinfo.innerText="game tied"
    gamebtn.classList.add("active")
}
    
}

function handleclick(index){
    if(gamegrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gamegrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap
        swapturn()
        //win
        checkgameover()
    }
    

}


gamebtn.addEventListener("click",init);

