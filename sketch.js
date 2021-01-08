//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
 dogImage = loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

  createCanvas(1500,500);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed =  createButton("Feed The Dog");
  feed.position(1200,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(1300,95);
  addFood.mousePressed(addFoods);

  
  

  //creating sprites object
  dog = createSprite(1200,300,100,100);
  dog.addImage("dog",dogImage);
  dog.scale = 0.2;

  
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255);
  textSize(20);

  if(lastFed >= 12){
    text("Last Feed :" + lastFed % 12 + "PM",900,30);

  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : " + lastFed + "AM",900,30);

  }

 // foodObj.display();
  drawSprites();
  
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happyDog);
  }

  drawSprites();
  fill("black");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",170,20);
  text("Food Remaining "+foodS,170,120);*/


}
//function to read values in DB
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}

//function to write values in DB
/*function writeStock(x){
if(x <= 0){
  x = 0;
}else{
  x = x-1;
}
  database.ref('/').update({
    Food: x
  })
}*/



