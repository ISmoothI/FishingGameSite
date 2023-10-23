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



  let bgTexture = PIXI.Texture.from("./oceandrawings/WhiteBGOcean.png");
  let bg = new PIXI.Sprite(bgTexture);
  bg.x = 0;
  bg.y = 0;
  app.stage.addChild(bg);


//Pier image
// function addPier(){
  let pierTexture = PIXI.Texture.from("./oceandrawings/PierOcean.png");
  let pier = new PIXI.Sprite(pierTexture);
  pier.scale.set(1, 1);
  pier.x = 0;
  pier.y = 350;
  app.stage.addChild(pier);
// }

//Bass image
// function addBass(){
  let bassTexture = PIXI.Texture.from("./oceandrawings/BassOcean.png");
  let bass = new PIXI.Sprite(bassTexture);
  bass.scale.set(1, 1);
  bass.x = 400;
  bass.y = 470;

  // Opt-in to interactivity
  bass.eventMode = 'static';

  //x, y, width, height
  //hitArea is relative to stage NOT sprite
  bass.hitArea = new PIXI.Rectangle(bass.x, bass.y + 25, 97, 50);
  
  //Bass hitbox testing
  let basshit = new PIXI.Graphics();
  basshit.lineStyle(5, 0xFF0000);
  basshit.drawRect(0, 25, 97, 50);
  bass.addChild(basshit);

  app.stage.addChild(bass);
// }

//Ocean image
// function addOcean(){
  let waterTexture = PIXI.Texture.from("./oceandrawings/PixelGiantBetterOcean.png");
  let water = new PIXI.Sprite(waterTexture);
  water.scale.set(1, 1);
  water.x = 0;
  water.y = 450;
  water.alpha = 0.8;
  app.stage.addChild(water);
// }

//FishingRod image
// function addFishingRod(){
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

// app.stage.interactive = true;
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
// }

// mainMenu();
// addPier();
// addBass();
// addOcean();
// addFishingRod();

function loop(){
  //working hit box for Rod and Bass
  if(rod.hitArea.x - bass.hitArea.x < 80 && rod.hitArea.x - bass.hitArea.x > -120 && rod.hitArea.y - bass.hitArea.y < 35  && rod.hitArea.y - bass.hitArea.y > -130){
    console.log("Yo");
    
  }

  // console.log(bass.hitArea.x + " " + bass.hitArea.y + " " + rod.hitArea.x + " " + rod.hitArea.y);

  // if(Math.round(bass.hitArea.x) == Math.round(rod.hitArea.x) && Math.round(bass.hitArea.y) == Math.round(rod.hitArea.y)){
  //   console.log("Yo");
  // }
}

// console.log(bass.hitArea.x + " " + bass.hitArea.y + " " + rod.hitArea.x + " " + rod.hitArea.y);
app.ticker.add((delta) => loop(delta));
