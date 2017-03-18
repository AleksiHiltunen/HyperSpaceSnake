

function start_game(){
	
	var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var status=false;
    var score = 0;
	var block = 20;
	var direction = "down";
	var snake_lenght = 4;
	var snake_position = [[1,1], [2,1], [3,1], [4,1]];
	var refresh_rate = 100;
	var keys = {
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down'
    };
	
	drawSnake();
	
	loop();
	
	function loop(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		getNewPosition();
		drawSnake();
		status = setTimeout(function() { loop(); },refresh_rate);
	}
	
	function drawSnake(){
		ctx.fillStyle='#000000';
		var i = 0;
		while(i < snake_lenght){
			ctx.fillRect(snake_position[i][0]*block,snake_position[i][1]*block,block,block);
			i+=1;
		}
	}
	
	function getNewPosition(){
		var i = 0;
		while(i < (snake_lenght-1)){
			snake_position[i] = snake_position[i+1];
			i+=1;
		}
		if(direction == "right"){
			snake_position[i]=[snake_position[i-1][0]+1, snake_position[i-1][1]];
		}
		else if(direction == "left"){
			snake_position[i]=[snake_position[i-1][0]-1, snake_position[i-1][1]];
		}
		else if(direction == "up"){
			snake_position[i]=[snake_position[i-1][0], snake_position[i-1][1]-1];
		}
		else if(direction == "down"){
			snake_position[i]=[snake_position[i-1][0], snake_position[i-1][1]+1];
		}
	}
	
	window.onkeydown = function(event){
		new_direction = keys[event.keyCode];
		console.log(new_direction);
		if(new_direction){
			changeDirection(direction);
			event.preventDefault();
		}
    };
	
	function changeDirection() {
		if(new_direction == "up" && direction != "down"){
			direction = new_direction;
		}
		else if(new_direction == "left" && direction != "right"){
			direction = new_direction;
		}
		else if(new_direction == "right" && direction != "left"){
			direction = new_direction;
		}
		else if(new_direction == "down" && direction != "up"){
			direction = new_direction;
		}
		
	}
}

