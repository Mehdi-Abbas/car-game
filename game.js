const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen")
const gameArea=document.querySelector(".gameArea")
const car=document.querySelector(".car")
const leftArrow=document.querySelector("#left-arrow")
const rightArrow=document.querySelector("#right-arrow")

let player={
    start:false,
    score:0,
    speed:5
}
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}

startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
leftArrow.addEventListener("click",moveLeft);
rightArrow.addEventListener("click",moveRight);

function moveLines(){
    let lines=document.querySelectorAll(".line")
    lines.forEach(function(item){
        // console.log(item.y);
         if(item.y>=1500){
             item.y-=1500
         }
         item.y+=player.speed;
         item.style.top=item.y+"px"
         
    })
}

function isCollide(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();

    return!(
        (aRect.bottom<bRect.top) || 
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}

function moveEnemy(car){
    let enemy=document.querySelectorAll(".enemy")
    enemy.forEach(function(item){
         if(isCollide(car,item)){
             endGame();
         }
         if(item.y>1500){
             item.y=-600
             item.style.left=Math.floor(Math.random()*200)+"px"
             //item.style.backgroundColor=randomColor()
         }
         item.y+=player.speed*0.8;
         item.style.top=item.y+"px"
         
    })
}


function playGame(){
    let car=document.querySelector(".car")
    moveLines();
    moveEnemy(car);
    // checkCollision();
    
    let road=gameArea.getBoundingClientRect()
    let enemy=document.querySelectorAll(".enemy")

    if(player.start){
        if(keys.ArrowUp && player.y>road.top){
            player.y-=player.speed
            
        }
        if(keys.ArrowDown && player.y+100<road.bottom){
            player.y+=player.speed
            
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed
            // console.log(player.x)
        }
        if(keys.ArrowRight && player.x<road.width-car.getBoundingClientRect().width){
            player.x+=player.speed
            // console.log(player.x)
        }

        car.style.left=player.x+'px'
        car.style.top=player.y+'px'
        window.requestAnimationFrame(playGame)
        player.score++;
        score.innerHTML="Score: "+player.score;
    }
    
}

function pressOn(e){
    e.preventDefault();
    keys[e.key]=true
    //console.log(keys);
}
function pressOff(e){
    e.preventDefault();
    keys[e.key]=false
    //console.log(keys);
}

function moveRight(e){
    e.preventDefault();
    keys.ArrowLeft=false
    keys.ArrowRight=true
    
    //setTimeout(keys.ArrowRight=false, 500)
    
    //console.log(keys);
}
function moveLeft(e){
    e.preventDefault();
    keys.ArrowRight=false
    keys.ArrowLeft=true
    //keys.ArrowLeft=false
    //setTimeout()
    
    //console.log(keys);
}


function endGame(){
    player.start=false;
    score.innerHTML="Game Over<br>Score was "+player.score
    startScreen.classList.remove("hide")
}



function start(){
    startScreen.classList.add("hide");
    //gameArea.classList.remove("hide");
    gameArea.innerHTML=""
    player.score=0;
    player.start=true
    for(let x=0;x<10;x++){
        let div=document.createElement("div")
        div.classList.add("line")
        div.y=x*150;
        div.style.top=(x*150)+"px"
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame)
    let car=document.createElement("div");
    //car.innerText="Car";
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    for(let x=0;x<3;x++){
        let enemy=document.createElement("div")
        enemy.classList.add("enemy")
        //enemy.innerHTML="<br>"+(x+1)
        enemy.y=((x+1)*600)-1
        enemy.x=parseInt(Math.random()*200)
        enemy.style.left=enemy.x+"px"
        enemy.style.top=enemy.y+"px"
        //enemy.style.backgroundColor=randomColor()
        gameArea.appendChild(enemy);
    }

    
    
}
function randomColor(){
        function c(){
            let hex=Math.floor(Math.random()*256).toString(16);
            return("0"+String(hex)).substr(-2)
        }
        return "#"+c()+c()+c()
    }
    
//resume from 3:22:44
