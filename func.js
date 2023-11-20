/**
 * @todo MAJOR ISSUES:
 * 
 * 
 * @todo MINOR ISSUE:
 * 
 * 
 * @todo SUGGESTIONS:
 * 
 * 
 */

import * as PIXI from './pixi.mjs';

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
let bgTexture = PIXI.Texture.from("./oceandrawings/BackgroundOcean.png");
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

class Bass extends PIXI.AnimatedSprite{

  // x/y coordinates, opt-in interactivity, texture
  constructor(x, y, textures, container){
    super(textures);
    this.x = x;
    this.y = y;
    this.eventMode = 'static';
    this.hitArea = new PIXI.Rectangle(this.x - 20, this.y + container.y + 10, 97, 50);
    this.animationSpeed = 0.07;
    this.play();

    //TESTING PURPOSES
    this.viewHitArea(false);
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

//Container visual hitArea (FOR BUG FIXING)
// let bassConHitArea = new PIXI.Graphics();
// bassConHitArea.lineStyle(5, 0xFF0000);
// bassConHitArea.drawRect(0, 0, 1500, 140);
// bassContainer.addChild(bassConHitArea);

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
rod.x = 240;
rod.y = 270;
rod.hitArea = new PIXI.Rectangle(rod.x + 106, rod.y + 111, 15, 15);

//fishing rod hook
let rodHookTexture = PIXI.Texture.from("./oceandrawings/FishingRodHookOcean.png");
let rodHook = new PIXI.Sprite(rodHookTexture);
rodHook.scale.set(1, 1);
rodHook.x = 0;
rodHook.y = 0;
rod.addChild(rodHook);

//Rod hitbox testing (FOR BUG FIXING)
// let rodhit = new PIXI.Graphics();
// rodhit.lineStyle(5, 0xFF0000);
// rodhit.drawRect(106, 111, 15, 15);
// rod.addChild(rodhit);

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
  //stops the rod from moving past the dock
  // if(e.clientX < 320 && e.clientY < 355){
    rod.x = e.clientX - 70;
    rod.y = e.clientY - 70;
    // rod.hitArea.x = rod.x + 90;
    // rod.hitArea.y = rod.y + 100;
    rodMeterAnim.x = rod.x + 140;
    rodMeterAnim.y = rod.y;
  // }
});

app.stage.on("pointerdown", e => {
  //change hit box to be above water
  // rodhit.x = 0;
  // rodhit.y = 0;
  rod.hitArea.x = rod.x;
  rod.hitArea.y = rod.y;
  rodHook.x = 0;
  rodHook.y = 0;

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
      // rodhit.x += 25;
      rod.hitArea.x = rod.x + 90 + 25;
      rodHook.x += 25;
      break;
    case 1:
    case 12:
      // rodhit.x += 100;
      rod.hitArea.x = rod.x + 90 + 100;
      rodHook.x += 100;
      break;
    case 2:
    case 11:
      // rodhit.x += 200;
      rod.hitArea.x = rod.x + 90 + 200;
      rodHook.x += 200;
      break;
    case 3:
    case 10:
      // rodhit.x += 300;
      rod.hitArea.x = rod.x + 90 + 300;
      rodHook.x += 300;
      break;
    case 4:
    case 9:
      // rodhit.x += 400;
      rod.hitArea.x = rod.x + 90 + 400;
      rodHook.x += 400;
      break;
    case 5:
    case 8:
      // rodhit.x += 500;
      rod.hitArea.x = rod.x + 90 + 500;
      rodHook.x += 500;
      break;
    case 6:
    case 7:
      // rodhit.x += 600;
      rod.hitArea.x = rod.x + 90 + 600;
      rodHook.x += 600;
      break;
  }
  rod.hitArea.y = rod.y + 100;
});

//loop that plays throughout the game
function loop(){
  //changes hitbox to move down overtime past the edge of the dock
  if(rod.hitArea.x > 360 && rod.hitArea.y < 610){
    // rodhit.y += 0.7;
    rod.hitArea.y += 0.7;
    
    //move hook sprite to match hitbox area
    rodHook.y += 0.7;
  }

  //working hit box for Rod and Bass
  /* for each bass in basses array:
  * if bass collides with rod: destroy bass and add new bass
  * fish swim from right to left until they reach end
  */
  basses.forEach((b) => {
    //move bass from right to left
    b.x -= 0.5;
    b.hitArea.x -= 0.5;
    
    if(rod.hitArea.intersects(b.hitArea)){
      b.destroy();
      basses.splice(basses.indexOf(b), 1);
      gameScore += 1;
      gameScoreText.text = "Bass Caught: " + gameScore;

      //adds bass to the right of canvas
      //if bass reach left side of container: move it OR spawn new one to the right of container
      let spawnBass = new Bass(1500, Math.floor(Math.random() * (60 - 0 + 1) + 0), bassFrames, bassContainer);
      bassContainer.addChild(spawnBass);
      basses.push(spawnBass);
    }
    else if(b.x == -100){
      b.destroy();
      basses.splice(basses.indexOf(b), 1);

      //adds bass to the right of canvas
      //if bass reach left side of container: move it OR spawn new one to the right of container
      let spawnBass = new Bass(1500, Math.floor(Math.random() * (60 - 0 + 1) + 0), bassFrames, bassContainer);
      bassContainer.addChild(spawnBass);
      basses.push(spawnBass);
    }
    
  });
}


/* ORDER OF IMPLEMENTATION:
* mainMenu();
* addPier();
* addBass();
* addOcean();
* addFishingRod();
*/

//game score text
let gameScoreStyle = new PIXI.TextStyle({
  fontFamily: "Impact",
});
var gameScore = 0;
var gameScoreText = new PIXI.Text("Bass Caught: " + gameScore, gameScoreStyle);
gameScoreText.x = 10;
gameScoreText.y = 10;
app.stage.addChild(gameScoreText);

//Bass images/animation
const bassFrames = [];

for (let i = 1; i < 5; i++){
  bassFrames.push(PIXI.Texture.from(`./BassSwimmingAnimation/BassOcean${i}.png`));
}

//initial bass creation
let bass1 = new Bass(400, 0, bassFrames, bassContainer);
let bass2 = new Bass(220, 30, bassFrames, bassContainer);
let bass3 = new Bass(600, 60, bassFrames, bassContainer);
let bass4 = new Bass(900, 50, bassFrames, bassContainer);
let bass5 = new Bass(1200, 20, bassFrames, bassContainer);
let bass6 = new Bass(1400, 10, bassFrames, bassContainer);
bassContainer.addChild(bass1, bass2, bass3, bass4, bass5, bass6);
let basses = [bass1, bass2, bass3, bass4, bass5, bass6];

//loop game overtime to do general game checks
app.ticker.add((delta) => loop(delta));
