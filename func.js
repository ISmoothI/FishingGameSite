/**
 * @todo MAJOR
 * Destroy Bass when Rod intereacts with Fish class and add new Bass
 * 
 * 
 * @todo MINOR
 * Remove viewHitArea method declarations in constructors
 * Change Rod hitbox to small rectangle that follows fishing line as it sink/rises continously
 * 
 * @todo SUGGESTIONS
 * Have Bass swim from right to left (if they reach the end of left, game over?)
 * 
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
  constructor(x, y, texture, container){
    super(texture);
    this.x = x;
    this.y = y;
    this.eventMode = 'static';
    this.hitArea = new PIXI.Rectangle(this.x - 20, this.y + container.y + 10, 97, 50);

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

  //gets hit area information of bass sprite
  //hit area is relative to stage, not sprite
  getHitAreaInfo(){
    return "x: " + this.hitArea.x + ", y: " + this.hitArea.y + ", width: " + this.hitArea.width + ", height: " + this.hitArea.height;
  }

}

//Container to keep Bass behind Ocean
let bassContainer = new PIXI.Container();
bassContainer.x = 0;
bassContainer.y = 500;
bassContainer.width = 1500;
bassContainer.height = 140;
app.stage.addChild(bassContainer);

let bassConHitArea = new PIXI.Graphics();
bassConHitArea.lineStyle(5, 0xFF0000);
bassConHitArea.drawRect(0, 0, 1500, 140);
bassContainer.addChild(bassConHitArea);

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
app.stage.addChild(rodMeterAnim);

//Stage event handlers
app.stage.eventMode = "static";

app.stage.on("pointermove", e => {
  rod.x = e.clientX - 70;
  rod.y = e.clientY - 70;
  // rod.hitArea.x = rod.x;
  // rod.hitArea.y = rod.y;
  rodMeterAnim.x = rod.x + 140;
  rodMeterAnim.y = rod.y;
  // console.log(rod.hitArea.x);
});

app.stage.on("pointerdown", e => {
  //change hit box to be above water
  rodhit.x = 0;
  rod.hitArea.x = rod.x;
  rodhit.y = 0;
  rod.hitArea.y = rod.y;

  //make meter visible and play it from the start (just incase)
  setTimeout(() => {
    rodMeterAnim.alpha = 1;
    rodMeterAnim.currentFrame = 0;
    rodMeterAnim.play();
  }, 300);
});

app.stage.on("pointerup", e => {
  //stop meter animation for user to see and make it invisible
  rodMeterAnim.stop();
  setTimeout(() => {
    rodMeterAnim.alpha = 0;
  }, 300);

  //changes hitbox to move to the right depending on the frame the meter stopped
  switch (rodMeterAnim.currentFrame) {
    case 0:
    case 13:
      rodhit.x += 10;
      rod.hitArea.x = rod.x + 10;
      break;
    case 1:
    case 12:
      rodhit.x += 100;
      rod.hitArea.x = rod.x + 100;
      break;
    case 2:
    case 11:
      rodhit.x += 200;
      rod.hitArea.x = rod.x + 200;
      break;
    case 3:
    case 10:
      rodhit.x += 300;
      rod.hitArea.x = rod.x + 300;
      break;
    case 4:
    case 9:
      rodhit.x += 400;
      rod.hitArea.x = rod.x + 400;
      break;
    case 5:
    case 8:
      rodhit.x += 500;
      rod.hitArea.x = rod.x + 500;
      break;
    case 6:
    case 7:
      rodhit.x += 600;
      rod.hitArea.x = rod.x + 600;
      break;
  }

  // console.log(rod.hitArea.x);
});

//loop that plays throughout the game
function loop(){
  //changes hitbox to move down overtime past the edge of the dock
  if(rod.hitArea.x > 350 && rod.hitArea.y < 510){
    rodhit.y += 0.5;
    rod.hitArea.y += 0.5;
  }

  //working hit box for Rod and Bass
  //for each bass in basses array: if bass collides with rod: destroy bass and add new bass
  basses.forEach((b) => {
    if(rod.hitArea.intersects(b.hitArea)){
      b.destroy();
      basses.splice(basses.indexOf(b), 1);
      //ADD BASS
    }
  });
}

// mainMenu();
// addPier();
// addBass();
// addOcean();
// addFishingRod();




//Bass image
let bass = new Bass(400, 0, PIXI.Texture.from("./oceandrawings/BassOcean.png"), bassContainer);
let newbass = new Bass(0, 30, PIXI.Texture.from("./oceandrawings/BassOcean.png"), bassContainer);
bassContainer.addChild(bass, newbass);
let basses = [bass, newbass];

app.ticker.add((delta) => loop(delta));
