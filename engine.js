var canvas;
var ctx;
var status=false;
var current_score;
var block = 20;
var direction;
var snake_lenght;
var snake_position;
var food;
var refresh_rate = 100;
var pause;
var keys = {
	65	: 'left',
    37	: 'left',
	87 	: 'up',
    38  : 'up',
	68	: 'right',
    39  : 'right',
	83	: 'down',
    40  : 'down'
};
var pause_keys = {
	80	: 'pause'
};

function start_game(){

	canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    status=false;
    current_score = 0;
	direction = "down";
	snake_lenght = 4;
	snake_position = [[1,1], [2,1], [3,1], [4,1]];
	food = [-1,-1];
	pause = 0;
	var direction_changed = false;

	drawSnake();
	spawnFood();
	loop();

	function loop(){
		var i = 0
		if(pause == 1){ 
			i = 1; 
			ctx.font="108px Arial";
			ctx.fillText("PAUSED", 200, 350);
		}
		while(i < 1){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			getNewPosition();
			drawFood();
			console.log(snake_position[snake_lenght-1][1]);
			if(checkCollision() == 1){
				console.log("End Game");
				drawSnake();
				ctx.font="108px Arial";
				ctx.fillText("YOU DIED! :'(", 100, 350);
				return;
			}
			drawSnake();
			direction_changed = false;
			document.getElementById("score").innerHTML = current_score;
		++i;
		}
		status = setTimeout(function() { loop(); },refresh_rate);
	}

	function drawSnake(){
		ctx.fillStyle='#000000';
		var i = 0;
		while(i < snake_lenght){
			ctx.fillRect(snake_position[i][0]*block,snake_position[i][1]*block,block-0.5,block-0.5);
			i+=1;
		}
	}

	function getNewPosition(){
		if(direction == "right" && snake_position[snake_lenght-1][0]+1 == food[0] && snake_position[snake_lenght-1][1] == food[1]){
			snake_lenght += 1;
			snake_position.push(food);
			spawnFood();
			current_score += 1;
			return;
		}
		else if(direction == "left" && snake_position[snake_lenght-1][0]-1 == food[0] && snake_position[snake_lenght-1][1] == food[1]){
			snake_lenght += 1;
			snake_position.push(food);
			spawnFood();
			current_score += 1;
			return;
		}
		else if(direction == "up" && snake_position[snake_lenght-1][0] == food[0] && snake_position[snake_lenght-1][1]-1 == food[1]){
			snake_lenght += 1;
			snake_position.push(food);
			spawnFood();
			current_score += 1;
			return;
		}
		else if(direction == "down" && snake_position[snake_lenght-1][0] == food[0] && snake_position[snake_lenght-1][1]+1 == food[1]){
			snake_lenght += 1;
			snake_position.push(food);
			spawnFood();
			current_score += 1;
			return;
		}
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
		pause_key_pressed = pause_keys[event.keyCode];
		if(pause_key_pressed){
			if(pause == 1){pause = 0;}
			else if(pause == 0){
				pause = 1;
				
			}
			
		}
		if(direction_changed == true){
			return;
		}
		direction_changed = true;
		new_direction = keys[event.keyCode];
		
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
		food = [-1, -1];
		food[0] = Math.floor(Math.random() * 40);
		food[1] = Math.floor(Math.random() * 30);
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
	
	
	
	function load_request(){
		console.log("load_request attempt");
		
	return;
	}
}

function submit_score(){
	var message_score = {
		messageType: "SCORE",
		score: current_score //integer
	}
	window.parent.postMessage("submit", message_score);
	return;
}

function load_request(){
	var message_load_request = {
		messageType: "LOAD_REQUEST"
	}
	this.addEventListener("message", receiveMessage, false);
	window.parent.postMessage("load request", message_load_request);
	if(receiveMessage.messageType == "ERROR"){
		console.log("No game to be loaded");
	}
	else if(receiveMessage.messageType == "LOAD"){
		//TODO 
		//LOAD GAME
		
		//After load is done, send setting message to service	
		var message_setting = {
			messageType: "SETTING",
			options: {
				"width" : "800",
				"height" : "600"
			}
		}
		window.parent.postMessage("settings", message_setting);
	}
}

function save(){
	var message_save = {
		messageType: "SAVE",
		gameState: {
			snake_len: snake_lenght,
			snake_pos: snake_position,
			score: current_score,
			food_place: food,
			dir: direction
		}
	}
	window.parent.postMessage("save game", message_save);
}
