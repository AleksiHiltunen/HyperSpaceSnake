

function start_game(){
	
	var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var status=false;
    var score = 0;
	var block = 20;
	var direction = "down";
	var snake_lenght = 4;
	var snake_position = [[1,1], [2,1], [3,1], [4,1]];
	var food = [-1,-1];
	var refresh_rate = 100;
	var keys = {
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down'
    };
	
	drawSnake();
	spawnFood();
	loop();
	
	function loop(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		getNewPosition();
		drawFood();
		console.log(snake_position[snake_lenght-1][1]);
		if(checkCollision() == 1){
			console.log("End Game");
			return;
		}
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
	
	function checkCollision(){
		//Checks the collision of top and left wall
		if(snake_position[snake_lenght-1][0] <= -1 || snake_position[snake_lenght-1][1] <= -1){
			console.log("Collision");
			return 1;
		}
		//Checks the collision of right and bottom wall
		else if(snake_position[snake_lenght-1][0] >= 40 || snake_position[snake_lenght-1][1] >= 30){
			console.log("Collision");
			return 1;
		}
		//Checks the collision of itself
		var i = 0;
		while(i < snake_lenght - 1){
			if(snake_position[i][0] == snake_position[snake_lenght-1][0] && snake_position[i][1] == snake_position[snake_lenght-1][1]){
				return 1;
			}
			++i;
		}	
		return 0;
	}
	
	//Function to create new food in the map
	function spawnFood(){
		food[0] = Math.floor(Math.random() * 40);
		food[1] = Math.floor(Math.random() * 30);
		console.log(food[0], food[1]);
		var i = 0;
		while(i < snake_lenght){
			if(food[0] == snake_position[i][0] && food[1] == snake_position[i][1]){
				food[0] = Math.floor(Math.random() * 40);
				food[1] = Math.floor(Math.random() * 30);
				i = 0;
			}
			++i;
		}
		
		return 0;
	} 
	
	function drawFood(){
		ctx.fillStyle='#F45628';
		ctx.fillRect(food[0]*block,food[1]*block,block,block);
		return;
	}
}

