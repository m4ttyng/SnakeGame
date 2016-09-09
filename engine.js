"use strict";
$(document).ready(function(){
    $('#startButton').click(function(){
      setTimeout(function () {

    let startBtn, highScoreBtn;
    let menuDiv, gameDiv, scoresDiv;
    let snakeArray = [];
    let cs = 20;
    let dir = "right";


    startBtn = $("#startButton")[0];
    highScoreBtn = $("#highScore")[0];
    menuDiv = $("#menuDiv")[0];
    gameDiv = $("#gameDiv")[0];

    //switch these later just for dev
    //$("#gameDiv").show();
    //$("#menuDiv").hide();

    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");


    fitToContainer(canvas);

    function fitToContainer(canvas){
      // Make it visually fill the positioned parent
      //canvas.style.width ='50%';
      //canvas.style.height='30%';
      // ...then set the internal size to match
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }


    let width = $("#gameCanvas").width();
    let height = $("#gameCanvas").height();

    //Lets paint the canvas now
    paintCanvas(canvas);

    let w = (width/2)/cs;
    let h = (height/2)/cs;

    for (let i=0; i < 5; i++){
        snakeArray.push({x: w-i , y: h});
    }

    drawSnake();

    setInterval(moveSnake,100);



    function moveSnake(){

        paintCanvas(canvas);

        let headX = snakeArray[0].x;
        let headY = snakeArray[0].y;

        if (dir == "right") headX++;
        else if (dir == "left") headX--;
        else if (dir == "up") headY--;
        else if (dir == "down") headY++;

        let tail = snakeArray.pop();
        tail.x = headX;
        tail.y = headY;
        snakeArray.unshift(tail);

        drawSnake();

    }

    function drawSnake(){

         for(let i = 0; i < snakeArray.length; i++)
        {
            let cell = snakeArray[i];

            if (i==0) ctx.fillStyle = "black";
            else ctx.fillStyle = "white";
            ctx.fillRect(cell.x*cs, cell.y*cs, cs, cs);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cell.x*cs, cell.y*cs, cs, cs);
        }
    }

    function paintCanvas(canvas){
        ctx.fillStyle = "rgba(125, 167, 87, 1)";
        ctx.fillRect(0, 0, width, height);
    }

    $(document).keydown(function(e){
		let arrow = e.which;

        //change direction, but not in reverse of current dir
		if(arrow == "37" && dir != "right") dir = "left";
		else if(arrow == "38" && dir != "down") dir = "up";
		else if(arrow == "39" && dir != "left") dir = "right";
		else if(arrow == "40" && dir != "up") dir = "down";

	})
}, 900);
});
});
