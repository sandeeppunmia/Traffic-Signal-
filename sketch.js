var person,person_img;
var traffic_light;
var traffic_light_red,traffic_light_green;
var traffic_light_red_img,traffic_light_green_img;
var traffic_light_stand;
var backgroundImg;
var obstacle1,obstacle2,obstacle3;
var invisibleGround;
var gameState = "start";
var carGroup,scootyGroup,girlGroup;
var level_completed_sprite,level_completed;
var level2Car,level2ScootyImg;
var girl,girl_img;
var level_completed_sprite_level2,level_completed_sprite_level2_image;
var gameOver,gameOver_img;
var lose,lose_img;

function preload()
{
	backgroundImg = loadImage("background_img_.jpg");
	traffic_light_red_img = loadImage("Traffic lights/Traffic_light_red_image.jpeg");
	traffic_light_green_img = loadImage("Traffic lights/Traffic_light_green_image.jpeg");
	person_img = loadImage("persons/main.webp");
	level2_person = loadImage("persons/person_img_1.webp");
	obstacle1 = loadImage("obstacles/animal_image_1.webp");
	obstacle2 = loadImage("obstacles/car image.webp");
	level2ScootyImg = loadImage("obstacles/Scooty_image_!.webp");
	obstacle4 = loadImage("obstacles/red_car.webp");
	level_completed = loadImage("level_completed1.jpg");
	girl_img = loadImage("obstacles/bicycle.jpg");
	level_completed_sprite_level2_image = loadImage("level_completed1.jpg");
	gameOver_img = loadImage("game over.jpeg");
	lose_img = loadImage("you lose.png");
}

function setup() {
	createCanvas(1500, 700);
	rectMode(CENTER);

	person = createSprite(700,650,50,100);
	person.addImage(person_img);
	person.scale = 0.4;
	person.setCollider("circle",0,0,1);

	traffic_light = createSprite(1400,250,50,50);
	if(gameState==="start"){
	traffic_light.addImage(traffic_light_red_img);
	traffic_light.scale = 0.2;
	}

	traffic_light_stand = createSprite(1400,440,20,205);
	traffic_light_stand.shapeColor = "black";

	carGroup = new Group();
	scootyGroup = new Group();
	girlGroup = new Group();


	//invisibleGround = createSprite(750,350,100,700);
	level_completed_sprite = createSprite(750,350,1500,700);
	level_completed_sprite.addImage(level_completed);
	level_completed_sprite.scale = 1.6;
	level_completed_sprite.visible = false;

	level_completed_sprite_level2 = createSprite(750,350,1500,700);
	level_completed_sprite_level2.addImage(level_completed_sprite_level2_image);
	level_completed_sprite_level2.scale = 1.6;
	level_completed_sprite_level2.visible = false;

	level_completed_sprite_level3 = createSprite(750,350,1500,700);
	level_completed_sprite_level3.addImage(level_completed_sprite_level2_image);
	level_completed_sprite_level3.scale = 1.6;
	level_completed_sprite_level3.visible = false;
}

function draw() {
  rectMode(CENTER);
  background(backgroundImg);

  if(frameCount%400 === 0){
	traffic_light.addImage(traffic_light_green_img);
   }

console.log(person.y);

//person.collide(invisibleGround);

if(gameState === "stop"){
	carGroup.setVisibleEach(0);
	carGroup.setVelocityXEach(0);
	level2();
}

if(gameState === "stop2"){
	endLevel2();
	
}

console.log(gameState);

level1();

drawSprites();
  if(carGroup.isTouching(person) && (gameState==="start" ||  gameState === "state2")){
	  console.log("CAR COLLIDED");
	textSize(40);
	textFont("Comic");
	fill("red");
	text("GAME OVER!!! BE CAREUL WHILE CROSSING THE ROAD",200,450);
	gameState = "hit";
	carGroup.setVelocityXEach(0);
	carGroup.setVisibleEach(0);
   }

   if(gameState === "hit"){
	lose = createSprite(750,350,1500,700);
	lose.addImage(lose_img);
   }

   if(keyDown(RIGHT_ARROW)&&(gameState === "start" || gameState==="state2")){
	   if(gameState === "start"){
	person.y = person.y - 5;
	   } 
	   else{
		   if(gameState === "state2"){
			   person.y = person.y - 4;
		   }
	   }
	//person.x = 0;
	if(person.y === 350 && (gameState === "start" || gameState === "state2")){
		gameState = "stop";
		textSize(40);
		textFont("Georgia");
		fill("red");
		text("Great!! You have reached the next level of the game",200,450);
		carGroup.setVelocityXEach(0);
		carGroup.setVisibleEach(0);
	 }
   }

   /*if(person.y === 350 ){
	   gameState = "stop";
	   endLevel2();
	   //gameOver = createSprite(750,350,1500,700);
	   //gameOver.addImage(gameOver_img);
	   //gameOver.scale = 1.6; 
   }*/
   if(gameState === "start" && person.y<625){
	textSize(45);
	textFont("Georgia");
	fill("red");
	text("You are crossing the road at your risk..Be careful",200,450);
	}

	
}

function level1(){
	if(frameCount%200 === 0){
		var obstacle = createSprite(random(200,700),500);
		obstacle.addImage(obstacle2);
		obstacle.scale = 0.3;
		obstacle.velocityX = 2;
		var rand = Math.round(random(1,2));
		switch(rand){
			case 1: obstacle.addImage(obstacle2);
			break;
			case 2: obstacle.addImage(obstacle4);
			break;
		}
		carGroup.add(obstacle);
	}
}

function level2(){
	level_completed_sprite.visible = true;
	if(mousePressedOver(level_completed_sprite)){
		level_completed_sprite.destroy();
		startLevel2();
	}
}

function startLevel2(){
		traffic_light.visible = true;
		person.visible = true;
		person.y = 650;
		traffic_light.x = 750;
		traffic_light.y = 100;
		traffic_light_stand.x  = 750;
		traffic_light_stand.y = 290;
		carGroup.setVisibleEach(1);
		carGroup.setVelocityXEach(2);
		gameState = "state2";
		//console.log(person.y);
		spawnScooties();
		
}

function spawnScooties(){
	var scooty = createSprite(random(1300,1700),600);
	scooty.addImage(level2ScootyImg);
	scooty.scale = 0.2;
	scooty.velocityX = -2;
	carGroup.add(scooty);
}

function endLevel2(){
	gameState = "stop2";
	/*level_completed_sprite_level2.visible = true;
	if(mousePressedOver(level_completed_sprite_level2)){
		level_completed_sprite_level2.destroy();
		//startLevel3();
	}*/

	
		gameOver = createSprite(750,350,1500,700);
		gameOver.addImage(gameOver_img);
		gameOver.scale = 1.6;
		
}	
