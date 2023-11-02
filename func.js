/**
 * @todo 
 * 
 * @todo Remove viewHitArea method declarations in constructors
 */

import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs';

// Create the application helper and add its render target to the page
let app = new PIXI.Application({ background: "#1099bb", view: document.getElementById("mycanvas"), height: 650, width: 1500 });
document.body.appendChild(app.view);
// PIXI.settings.RESOLUTION = window.devicePixelRatio;

//Main Menu text
function mainMenu(){
  
  let gameTitleStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
  });

  let gameTitle = new PIXI.Text("Wish for Fish", gameTitleStyle);

  gameTitle.x = 50;
  gameTitle.y = 100;

  app.stage.addChild(gameTitle);
}

//Background
let bgTexture = PIXI.Texture.from("./oceandrawings/WhiteBGOcean.png");
let bg = new PIXI.Sprite(bgTexture);
bg.x = 0;
bg.y = 0;
app.stage.addChild(bg);

//Pier image
let pierTexture = PIXI.Texture.from("./oceandrawings/PierOcean.png");
let pier = new PIXI.Sprite(pierTexture);
pier.scale.set(1, 1);
pier.x = 0;
pier.y = 350;
app.stage.addChild(pier);


class Bass extends PIXI.Sprite{

  // x/y coordinates, opt-in interactivity, texture
  constructor(x, y, texture){
    super(texture);
    this.x = x;
    this.y = y;
    this.eventMode = 'static';
    this.hitArea = new PIXI.Rectangle(this.x, this.y + 25, 97, 50);

    //TESTING PURPOSES
    this.viewHitArea(true);
  }

  //shows viewable hitbox (for testing purposes)
  viewHitArea(state){
    if(state){
      let bassHitArea = new PIXI.Graphics();
      bassHitArea.lineStyle(5, 0xFF0000);
      bassHitArea.drawRect(0, 25, 97, 50);
      this.addChild(bassHitArea);
    }
    else{
      this.removeChild();
    }
  }

  //gets x coordinate of bass sprite
  getX(){
    return this.x;
  }

  //gets x coordinate of bass sprite
  getY(){
    return this.y;
  }
  
  //gets hit area information of bass sprite
  //hit area is relative to stage, not sprite
  getHitAreaInfo(){
    return "x: " + this.hitArea.x + ", y: " + this.hitArea.y + ", width: " + this.hitArea.width + ", height: " + this.hitArea.height;
  }

  //sets x coordinate of bass sprite
  setX(newX){
    this.x = newX;
  }

  //sets x coordinate of bass sprite
  setY(newY){
    this.y = newY;
  }

}

//Bass image
let bass = new Bass(400, 470, PIXI.Texture.from("./oceandrawings/BassOcean.png"));
app.stage.addChild(bass);

//Ocean image/animation
const oceanFrames = [];

for (let i = 1; i < 5; i++){
  oceanFrames.push(PIXI.Texture.from(`./OceanWavesAnimation/PixelGiantBetterOcean${i}.png`));
}

const oceanAnim = new PIXI.AnimatedSprite(oceanFrames);
oceanAnim.animationSpeed = 0.05;
oceanAnim.x = 0;
oceanAnim.y = 450;
oceanAnim.alpha = 0.8;
oceanAnim.play();
app.stage.addChild(oceanAnim);

//FishingRod image
let rodTexture = PIXI.Texture.from("./oceandrawings/FishingRodOcean.png");
let rod = new PIXI.Sprite(rodTexture);
rod.scale.set(1, 1);
rod.x = 300;
rod.y = 270;
rod.hitArea = new PIXI.Rectangle(rod.x + 20, rod.y + 17, 100, 110);

//Rod hitbox testing
let rodhit = new PIXI.Graphics();
rodhit.lineStyle(5, 0xFF0000);
rodhit.drawRect(20, 17, 100, 110);
rod.addChild(rodhit);

app.stage.addChild(rod);

//FishingRod Meter image/animation
const rodMeterFrames = [];

for (let i = 1; i < 15; i++){
  rodMeterFrames.push(PIXI.Texture.from(`./FishingRodMeterAnimation/FishingRodMeterOcean${i}.png`));
}

const rodMeterAnim = new PIXI.AnimatedSprite(rodMeterFrames);
rodMeterAnim.animationSpeed = 0.2;
rodMeterAnim.x = 450;
rodMeterAnim.y = 270;
rodMeterAnim.alpha = 0;
rodMeterAnim.play();
app.stage.addChild(rodMeterAnim);

//Stage event handlers
app.stage.eventMode = "static";

app.stage.on("pointermove", e => {
  rod.x = e.clientX - 70;
  rod.y = e.clientY - 70;
  rod.hitArea.x = rod.x;
  rod.hitArea.y = rod.y;
  rodMeterAnim.x = rod.x + 140;
  rodMeterAnim.y = rod.y;
});

app.stage.on("pointerdown", e => {
  setTimeout(() => {
    rodMeterAnim.alpha = 1;
    rodMeterAnim.currentFrame = 0;
    rodMeterAnim.play();
  }, 300);
});

app.stage.on("pointerup", e => {
  rodMeterAnim.stop();
  setTimeout(() => {
    rodMeterAnim.alpha = 0;
  }, 300);
});

//loop that plays throughout the game
function loop(){
  //working hit box for Rod and Bass

  //if fishing rod collides with a Bass class: destroy the bass
  if(bass.destroyed){
    return;
  }
  else if(rod.hitArea.x - bass.hitArea.x < 80 && rod.hitArea.x - bass.hitArea.x > -120 && rod.hitArea.y - bass.hitArea.y < 35  && rod.hitArea.y - bass.hitArea.y > -130){
    bass.destroy();
    
  }
}


// mainMenu();
// addPier();
// addBass();
// addOcean();
// addFishingRod();

app.ticker.add((delta) => loop(delta));
