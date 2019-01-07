//image refrences
//---------------
var gameObjects = []; //gameobjects are seen by rayscans
var nullObjects = []; //null objects are not seen by rayscans
var ui = [];
var buttons = []; //clickable buttons
var socket = io.connect('http://localhost:2000');
//gameObject
//syntax:
//new var newGO = GameObject(id,x,y,posX,posY,sizeX,sizeY);
//font:
var user =  localStorage.getItem("uN");
var font = "Verdana";
//gameObjects.push(newGO);
class GameObject{
    constructor(a,b,c,d,e){
        this.id = a;
        this.x = b;
        this.y = c;
        this.sizeX = d;
        this.sizeY = e;
        this.image = null;
        this.color = null;
        this.gravity = null;
        this.rotation = null;
        this.clicked = null;
        this.hovered = null;
        this.gravityTimer = 0;
        this.yForce = 0;
        this.text = null;
        this.textColor = "black";
        this.textSize = 20;
        this.textOffsetY = 0;
        this.textOffsetX = 0;
        this.parent = null;
        this.changeX = 0;
        this.changeY = 0;
        this.rotateBox = null;
    }
}
function findObject(id){
    for(var i = 0; i < gameObjects.length; i++){
        if(gameObjects[i].id == id){
            return gameObjects[i];
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        if(nullObjects[i].id == id){
            return nullObjects[i];
        }
    }
    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].id == id){
            return buttons[i];
        }
    }
    for(var i = 0; i < ui.length; i++){
        if(ui[i].id == id){
            return ui[i];
        }
    }
    return null;
}
function deleteObject(id){
    var found = false;
    for(var i = 0; i < gameObjects.length; i++){
        if(gameObjects[i].id == id){
            gameObjects.splice(i,1);
            found = true;
            break;
        }
    }
    if(!found){
        for(var i = 0; i < nullObjects.length; i++){
            if(nullObjects[i].id == id){
                nullObjects.splice(i,1);
                found = true;
                break;
            }
        }
        if(!found){
            for(var i = 0; i < buttons.length; i++){
                if(buttons[i].id == id){
                    buttons.splice(i,1);
                    found = true;
                    break;
                }
            }
            if(!found){
                for(var i = 0; i < ui.length; i++){
                    if(ui[i].id == id){
                        ui.splice(i,1);
                        break;
                    }
                }
            }
        }
    }
}
//rayscan
//syntax:
//rayscan(starting x, starting y, angle, distance)
function rayscan(a,b,c,d){
    var checkX = a;
    var checkY = b;
    var ang = c;
    for(var i = 0; i < d; i++){
        for(var j = 0; j < gameObjects.length; j++){
            var objCheck = gameObjects[j];
            if(checkX >= (objCheck.x - objCheck.sizeX/2) && checkX <= (objCheck.x + objCheck.sizeX/2) && checkY <= (objCheck.y + objCheck.sizeY/2) && checkY >= (objCheck.y - objCheck.sizeY/2)){
                return objCheck;
            }       
        }
        checkX += Math.cos(ang);
        checkY -= Math.sin(ang);
    }
    return null;
}
//input
var input = {
    w:false,
    a:false,
    s:false,
    d:false,
    up:false,
    left:false,
    down:false,
    right:false,
    space:false,
    f:false,
    shift:false,
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    mouse1:false
}
var clickInput = {
    w:false,
    a:false,
    s:false,
    d:false,
    up:false,
    left:false,
    down:false,
    right:false,
    space:false,
    f:false,
    shift:false,
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    mouse1:false
};
var nClick;
document.addEventListener('keydown', function(event) {
    switch(event.code){
        case "KeyW":
            input.w = true;
            clickInput.w = true;
            break;
        case "KeyA":
            input.a = true;
            clickInput.a = true;
            break;
        case "KeyS":
            input.s = true;
            clickInput.s = true;
            break;
        case "KeyD":
            input.d = true;
            clickInput.d = true;
            break;
        case "ArrowUp":
            input.up = true;
            clickInput.up = true;
            break;
        case "ArrowLeft":
            input.left = true;
            clickInput.left = true;
            break;
        case "ArrowDown":
            input.down = true;
            clickInput.down = true;
            break;
        case "ArrowRight":
            input.right = true;
            clickInput.right = true;
            break;
        case "Space":
            input.space = true;
            clickInput.space = true;
            break;
        case "KeyF":
            input.f = true;
            clickInput.f = true;
            break;
        case "ShiftLeft":
            input.shift = true;
            clickInput.shift = true;
            break;
        case "Digit1":
            input.one = true;
            clickInput.one = true;
            break;
        case "Digit2":
            input.two = true;
            clickInput.two = true;
            break;
        case "Digit3":
            input.three = true;
            clickInput.three = true;
            break;
        case "Digit4":
            input.four = true;
            clickInput.four = true;
            break;
        case "Digit5":
            input.five = true;
            clickInput.five = true;
            break;
        case "Digit6":
            input.six = true;
            clickInput.six = true;
            break;
        case "Digit7":
            input.seven = true;
            clickInput.seven = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch(event.code){
        case "KeyW":
            input.w = false;
            break;
        case "KeyA":
            input.a = false;
            break;
        case "KeyS":
            input.s = false;
            break;
        case "KeyD":
            input.d = false;
            break;
        case "ArrowUp":
            input.up = false;
            break;
        case "ArrowLeft":
            input.left = false;
            break;
        case "ArrowDown":
            input.down = false;
            break;
        case "ArrowRight":
            input.right = false;
            break;
        case "Space":
            input.space = false;
            break;
        case "KeyF":
            input.f = false;
            break;
        case "ShiftLeft":
            input.shift = false;
            break;
        case "Digit1":
            input.one = false;
            break;
        case "Digit2":
            input.two = false;
            break;
        case "Digit3":
            input.three = false;
            break;
        case "Digit4":
            input.four = false;
            break;
        case "Digit5":
            input.five = false;
            break;
        case "Digit6":
            input.six = false;
            break;
        case "Digit7":
            input.seven = false;
            break;
    }
});
document.addEventListener('mousedown', function(event) {
    input.mouse1 = true;
    clickInput.mouse1 = true;
});
document.addEventListener('mouseup', function(event) {
    input.mouse1 = false;
});
document.addEventListener('mousemove', function(event) {
    getCursorPosition(canvas,event);
});
var mousePos = {
    x:0,
    y:0
}
//canvas creation
var canvasName = "myCanvas"; //replace with id of canvas within the html
var canvas = document.getElementById(canvasName);
var ctx = canvas.getContext("2d");
var virtualHeight = 900; //the width of the canvas things are being drawn on before scaling
var virtualWidth = 1600; //the height of the canvas things are being drawn on before scaling
fullScreen = false; //should the canvas fill the whole screen - make sure body and the canvas have a margin and padding of 0
fitAspectRatioFullscreen = true; //should the aspect ratio of the virtual canvas be forced - this removes distortion of stretching
fitDiv = false; //if you want the canvas to be in a part of the page instead of the whole page
/*recomended css settings for canvas
    padding:0;
    margin: 0 auto;
    display:block;
*/
var scaleX;
var scaleY;
setInterval(function(){
    if(fullScreen){
        fullScreenCanvas();
    }
    else if(fitAspectRatioFullscreen){
        aspectRatioFullScreenCanvas();
    }
    else if(fitDiv){
        fitDivCanvas();
    }
    scaleX = canvas.width / virtualWidth;
    scaleY = canvas.height / virtualHeight;
},1000/10); //refreshes canvas size a set times per second - the "10" is changeable to whatever tickrate works the best
//canvas fit functions
function fullScreenCanvas(){
    canvas.width = window.innerWidth;
    canvas.height =  window.innerHeight;
}
function aspectRatioFullScreenCanvas(){
    var heightW = window.innerHeight;
    var widthW = window.innerWidth;
    var aspectR = virtualWidth / virtualHeight;
    if(aspectR > widthW/heightW){
        canvas.width = widthW;
        canvas.height = widthW / aspectR;
    }
    else{
        canvas.height = heightW;
        canvas.width = heightW * aspectR;
    }
}
function fitDivCanvas(){
    var divIn = document.getElementById("myDIV"); //replace myDiv with the div the canvas is within
    canvas.height = divIn.offsetHeight;
    canvas.height = divIn.offsetWidth;
}
//cursor pos
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    mousePos.x = x/scaleX;
    mousePos.y = y/scaleY;
}
function pythagTheorem(a,b){
    return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
}
var deleteFixes = [];
function fixRotatingObjects(){
    var resolution = 8;
    for(var i = 0; i < deleteFixes.length; i++){
        deleteObject(deleteFixes[i]);
    }
    deleteFixes = [];
    for(var i = 0; i < gameObjects.length; i++){
        var n1 = gameObjects[i];
        if(n1.rotation != null){
            var manyX = n1.sizeX / resolution;
            var manyY = n1.sizeY / resolution;
            for(var j = 0; j < manyY; j++){
                for(var o = 0; o < manyX; o++){
                    var rndA = Math.random().toString().substring(2,7);
                    var farX = (o * resolution) - (n1.sizeX/2) + (resolution/2);
                    var farY = (j * resolution) - (n1.sizeY/2) + (resolution/2);
                    var radius = pythagTheorem(farX,farY);
                    var initRot = Math.atan(farY / farX);
                    deleteFixes.push(rndA);
                    if(o > manyX/2){
                        gameObjects.push(new GameObject(rndA,(Math.cos(n1.rotation + initRot) * radius) + n1.x,(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                        findObject(rndA).color = "red";
                    }
                    else if(o < manyX/2){
                        gameObjects.push(new GameObject(rndA,-(Math.cos(n1.rotation + initRot) * radius) + n1.x,-(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                        findObject(rndA).color = "red";
                    }
                }
            }
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var n1 = nullObjects[i];
        if(n1.rotateBox == true){
            if(n1.rotation != null){
                var manyX = n1.sizeX / resolution;
                var manyY = n1.sizeY / resolution;
                for(var j = 0; j < manyY; j++){
                    for(var o = 0; o < manyX; o++){
                        var rndA = Math.random().toString().substring(2,7);
                        var farX = (o * resolution) - (n1.sizeX/2) + (resolution/2);
                        var farY = (j * resolution) - (n1.sizeY/2) + (resolution/2);
                        var radius = pythagTheorem(farX,farY);
                        var initRot = Math.atan(farY / farX);
                        deleteFixes.push(rndA);
                        if(o > manyX/2){
                            gameObjects.push(new GameObject(rndA,(Math.cos(n1.rotation + initRot) * radius) + n1.x,(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                            findObject(rndA).color = "red";
                        }
                        else if(o < manyX/2){
                            gameObjects.push(new GameObject(rndA,-(Math.cos(n1.rotation + initRot) * radius) + n1.x,-(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                            findObject(rndA).color = "red";
                        }
                    }
                }
            }
        }
    }
}
//game type:
//overview - the player is in the middle of the screen, and moves around the world
//non-follow overview, the player is in a world where the camera doesnt follow them, the whole game world is just the window
//no player - used for games where the player is not a focal point, turned based stuff or anything like that
var overview = false;
var nFOverview = true;
var nPO = false;
var fov = { //fov is only used for overview follow games
    x: 400,
    y: 200
}
var scene = 1;
function start(){
    scene = 1;
    switchScene(scene);
}
start();
var prevTime = Date.now();
var delta;
function runGame(){
    delta = Date.now() - prevTime;
    if(input.two){
        delta/=10;
    }
    prevTime = Date.now();
    var parents = [];
    for(var i = 0; i < gameObjects.length; i++){
        var a = gameObjects[i];
        if(a.parent != null){
            if(!parents.includes(a.parent)){
                parents.push(a.parent);
            }
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var a = nullObjects[i];
        if(a.parent != null){
            if(!parents.includes(a.parent)){
                parents.push(a.parent);
            }
        }
    }
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.ogy = a.y;
        a.ogx = a.x;
    }
    for(var i = 0; i < buttons.length; i++){
        var button = buttons[i];
        if(mousePos.x <= (button.x + button.sizeX/2) && mousePos.x >= (button.x - button.sizeX/2) && mousePos.y >= (button.y - button.sizeY/2) && mousePos.y <= (button.y + button.sizeY/2)){
            button.hovered = true;
        }
        else{
            button.hovered = false;
        }
        if(button.hovered && clickInput.mouse1){
            button.clicked = true;
        }
        else{
            button.clicked = false;
        }
    }
    Object.keys(clickInput).forEach(function(key) {
        if(input[key] != clickInput[key]){
            nClick = clickInput[key];
        }   
    });
    nClick = false;
    switch(scene){
        case 1:
            scene1(null);
            break;
        case 2:
            scene2(null);
            break;
        case 3:
            scene3(null);
            break;
        case 4:
            scene4(null);
            break;
        case 5:
            scene5(null);
            break;
        case 6:
            scene6(null);
            break;
        case 7:
            scene7(null);
            break;
        case 8:
            scene8(null);
            break;
        case 9:
            scene9(null);
            break;
    }
    fixRotatingObjects();
    Object.keys(clickInput).forEach(function(key) {
        clickInput[key] = false;     
    });
    draw();
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.changeX = a.x - a.ogx;
        a.changeY = a.y - a.ogy;
    }
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.ogy = a.y;
        a.ogx = a.x;
    }
    for(var i = 0; i < gameObjects.length; i++){
        var a = gameObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var a = nullObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.changeX = a.x - a.ogx;
        a.changeY = a.y - a.ogy;
    }
    for(var i = 0; i < gameObjects.length; i++){
        var a = gameObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var a = nullObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    window.requestAnimationFrame(runGame);
}
window.requestAnimationFrame(runGame);

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < nullObjects.length; i++){
        var tempObject = nullObjects[i];
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
    for(var i = 0; i < gameObjects.length; i++){
        var tempObject = gameObjects[i];
        if(tempObject.gravity != null){
            applyGravity(tempObject);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(-tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
    for(var i = 0; i < buttons.length; i++){
        var tempObject = buttons[i];
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
    for(var i = 0; i < ui.length; i++){
        var tempObject = ui[i];
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
}
function applyGravity(a){
    if(rayscan(a.x,a.y + (a.sizeY / 2) + 1, 4.71, 2) == null){
        a.gravityTimer += delta/1000;
        a.y += a.gravity * a.gravityTimer * delta/10;
    }
    else{
        a.gravityTimer = 0;
    }
    if(a.yForce != 0){
        a.y -= a.yForce * delta/8;
        a.yForce -= delta/10;
        if(a.yForce < 0){
            a.yForce = 0;
        }
    }
}
function switchScene(a){
    gameObjects = [];
    nullObjects = [];
    ui = [];
    buttons = [];
    scene = a;
    switch(a){
        case 1:
            scene1("start");
            break;
        case 2:
            scene2("start");
            break;
        case 3:
            scene3("start");
            break;
        case 4:
            scene4("start");
            break;
        case 5:
            scene5("start");
            break;
        case 6:
            scene6("start");
            break;
        case 7:
            scene7("start");
            break;
        case 8:
            scene8("start");
            break;
        case 9:
            scene9("start");
            break;
    }
}
function scene1(a){
    if(a == "start"){
        //start function for scene1
        gameObjects.push(new GameObject("n",800,300,30,30));
        findObject("n").text = "Welcome " + user;
        findObject("n").textColor = "white";
        findObject("n").textSize = 40;
        buttons.push(new GameObject("play",800,450,180,100));
        var b = findObject("play");
        b.color = "blue";
        b.text = "play";
        b.textColor = "white";
        b.textSize = 48;
        b.textOffsetY = 10;
    }
    else{
        //logic for scene 1
        var b = findObject("play");
        if(b.hovered){
            b.color = "cyan";
        }
        else{
            b.color = "blue";
        }
        if(b.clicked){
            switchScene(2);
        }
    }
}
var score = 0;
var paused = false;
var hX;
var hY;
var bSpeed = 1;
var won = false;
enableRestart = false;
function scene2(a){
    if(a == "start"){
        ui.push(new GameObject("score",100,50,1,1));
        var s = findObject("score");
        s.text = "Score: " + score;
        s.textColor = "white";
        gameObjects.push(new GameObject("uP",50,450,20,200));
        findObject("uP").color = "blue";
        gameObjects.push(new GameObject("bP",1550,450,20,200));
        findObject("bP").color = "red";
        nullObjects.push(new GameObject("ball",800,450,20,20));
        findObject("ball").color = "white";
        hX = Math.random() < 0.5;
        hY = Math.random() < 0.5;
    }
    else{
        findObject("score").text = "Score: " + score;
        if(input.space){
            paused = !paused;
        }
        if(!paused){
            var uP = findObject("uP");
            if(input.w){
                uP.y -= delta;
            }
            if(input.s){
                uP.y += delta;
            }
            var bP = findObject("bP");
            var b = findObject("ball");
            if(b.x < 1531){
                if(bP.y < b.y){
                    bP.y += delta * (1/(1580 - b.x)) * 50 + 0.2;
                }
                if(bP.y > b.y){
                    bP.y -= delta * (1/(1580 - b.x)) * 50 + 0.2;
                }
            }
            var hitb = rayscan(b.x + 10,b.y,0,2) != null;
            var hitp = rayscan(b.x - 10,b.y,3.14,2) != null;
            if(hitb || hitp){
                hX = !hX;
                bSpeed *= 1.05;
                score++;
                if(hitb){
                    b.x = 1527;
                }
                if(hitp){
                    b.x = 73;
                }
            }
            if(b.y <= 10 || b.y >= 890){
                hY = !hY;
            }
            var speed = delta * bSpeed * 0.3;
            if(hX){
                b.x += speed;
            }
            else{
                b.x -= speed;
            }
            if(hY){
                b.y += speed;
            }
            else{
                b.y -= speed;
            }
            if(b.x < 0){
                botWin();
            }
            if(b.x > 1600){
                youWin();
            }
        }
        if(enableRestart){
            var rs = findObject("restart");
            if(rs.hovered){
                rs.color = "cyan";
            }
            else{
                rs.color = "blue";
            }
            if(rs.clicked){
                enableRestart = false;
                restart();
            }
        }
    }
}
function youWin(){
    nullObjects.push(new GameObject("wC",800,450,1,1));
    var wC = findObject("wC");
    wC.text = "You Win";
    wC.textColor = "white";
    wC.textSize = 50;
    paused = true;
    enableRestart = true;
    won = true;
    createButton();
}
function botWin(){
    nullObjects.push(new GameObject("wC",800,450,1,1));
    var wC = findObject("wC");
    wC.text = "Bot Wins";
    wC.textColor = "white";
    wC.textSize = 50;
    paused = true;
    enableRestart = true;
    createButton();
}
function createButton(){
    socket.emit("submitScore",user,won,score);
    buttons.push(new GameObject("restart",800,600,200,100));
    rs = findObject("restart");
    rs.color = "blue";
    rs.text = "Restart";
    rs.textColor = "white";
    rs.textOffsetY = 15;
    rs.textSize = 50;
}
function restart(){
    deleteObject("restart");
    deleteObject("wC");
    score = 0;
    findObject("ball").x = 800;
    findObject("ball").y = 450;
    findObject("bP").y = 450;
    findObject("uP").y = 450;
    hX = Math.random() < 0.5;
    hY = Math.random() < 0.5;
    bSpeed = 1;
    paused = false;
}
function scene3(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene4(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene5(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene6(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene7(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene8(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene9(a){
    if(a == "start"){

    }
    else{
        
    }
}
//game functions go down here


