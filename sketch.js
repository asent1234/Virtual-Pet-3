const db = firebase.database();
var dog, happyDog, foodS, foodStock;
var gsr
var stockbutton
var dogimg, happydogimg, saddogimg, gardenimg, bedroomimg, washroomimg;
var lastBottle = []
var food
var hour
var gameState
var period = ""
var notStatic = false
var l = 0
function preload(){
    dogimg = loadImage("images/Dog.png");
    happydogimg = loadImage("images/happydog.png");
    saddogimg = loadImage("images/Lazy.png")
    gardenimg  = loadImage("images/Garden.png")
    bedroomimg  = loadImage("images/Bed Room.png")
    washroomimg  = loadImage("images/Wash Room.png")
}
function setup(){
    food = new Food;
    food.getFS
    canvas = createCanvas(800, 800);
    dog = createSprite (575, 250,1,1);
    dog.scale = 0.15;
    dog.addImage(dogimg, "dogimg");

    stockbutton = createButton("Add Stock");

    stockbutton.mousePressed(stock);

    stockbutton.position(100,100)
    
    feedbutton = createButton("Feed");

    feedbutton.mousePressed(feed);

    feedbutton.position(200,100)
    gsr = db.ref('gameState');
    gsr.on("value", function(data){
        gameState = data.val();
    });
}
function draw(){
    background(46, 139, 87);
    drawSprites();
    food.getFS();
    food.getLF();
    getFeedTime();
    stroke("white");
    text("Food Remaing: "+ food.foodStock, 50, 100);
    text("Last Fed: "+ food.lastFed, 50, 80 )
    if(gameState !=	 "Hungry"){
        //console.log("works")
        feedbutton.hide();
        stockbutton.hide();
        dog.remove();
    }
    else{
        feedbutton.show();
        stockbutton.show();
        dog.addImage(saddogimg)
        //console.log("fail")
    }
    if(hour === (food.lastFed+1)){ 
    update("Playing"); 
    food.garden();  
    }  
    else if(hour === ( food.lastFed + 2)){ 
    update("Sleeping"); 
    food.bedroom(); 
    }
    else if(hour >(food.lastFed+2) && hour<=(food.lastFed+4)){
    update("Bathing");
    food.washroom(); 
    }
    else { 
    update("Hungry") 
    dog = createSprite (575, 250,1,1);
    dog.scale = 0.15;
    //dog.addImage(dogimg, "dogimg");
    food.display(); 
    }
}


function stock(){
    food.updateFS();
}
function feed (){
    food.deductF();
    food.updateLF()
    if(hour > 12){
        period = "PM"
    }
    if(hour < 12){
        period = "AM"
    }
}
function update(state){
    db.ref('/').update({
        gameState : state
    })
}
async function getFeedTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Los_Angeles");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hourstring = datetime.slice(11,13);
    //hour = parseInt(hourstring)
    hour = 12
}
