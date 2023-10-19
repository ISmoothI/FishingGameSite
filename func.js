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

//Ocean image
function addOcean(){
  let waterTexture = PIXI.Texture.from("PixelGiantBetterOcean.png");
  let water = new PIXI.Sprite(waterTexture);
  water.scale.set(1, 1);
  water.x = 0;
  water.y = 450;
  water.alpha = 0.8;

  // let waterFilter = new PIXI.filters.ColorMatrixFilter();
  // waterFilter.matrix = 
  // [1, 0, 0, 0, -0.15, 
  //   0, 1, 0, 0, -0.15, 
  //   0, 0, 1, 0, -0.15, 
  //   0, 0, 0, 1, 0];
  // water.filters = [waterFilter];

  app.stage.addChild(water);
  
}

//Pier image
function addPier(){
  let pierTexture = PIXI.Texture.from("PierOcean.png");
  let pier = new PIXI.Sprite(pierTexture);
  pier.scale.set(1, 1);
  pier.x = 0;
  pier.y = 350;
  app.stage.addChild(pier);
}

//Bass image
function addBass(){
  let bassTexture = PIXI.Texture.from("BassOcean.png");
  let bass = new PIXI.Sprite(bassTexture);
  bass.scale.set(1, 1);
  bass.x = 400;
  bass.y = 470;

  // Opt-in to interactivity
  bass.eventMode = 'static';

  // Shows hand cursor
  bass.cursor = 'pointer';

  bass.on('click', e => {
    bass.destroy();
  });

  app.stage.addChild(bass);
}

//FishingRod image
function addFishingRod(){
  let rodTexture = PIXI.Texture.from("FishingRodOcean.png");
  let rod = new PIXI.Sprite(rodTexture);
  rod.scale.set(1, 1);
  rod.x = 300;
  rod.y = 270;
  app.stage.addChild(rod);


  const rodMeterFrames = [];

  for (let i = 1; i < 15; i++){
    rodMeterFrames.push(PIXI.Texture.from(`FishingRodMeterAnimation/FishingRodMeterOcean${i}.png`));
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
    rodMeterAnim.x = rod.x + 140;
    rodMeterAnim.y = rod.y;
  });

  app.stage.on("pointerdown", e => {
    setTimeout(() => {
      rodMeterAnim.alpha = 1;
      rodMeterAnim.currentFrame = 0;
      rodMeterAnim.play();
    }, 500);
  });

  app.stage.on("pointerup", e => {
    rodMeterAnim.stop();
    setTimeout(() => {
      rodMeterAnim.alpha = 0;
    }, 500);
  });
}

// function addFishingRodMeter(){
//   const rodMeterFrames = [];

//   for (let i = 1; i < 15; i++){
//     rodMeterFrames.push(PIXI.Texture.from(`FishingRodMeterAnimation/FishingRodMeterOcean${i}.png`));
//   }

//   const rodMeterAnim = new PIXI.AnimatedSprite(rodMeterFrames);
//   rodMeterAnim.animationSpeed = 0.2;
//   rodMeterAnim.play();
//   app.stage.addChild(rodMeterAnim);

//   app.stage.on("pointerdown", e => {
//     rodMeterAnim.alpha = 1;
//     rodMeterAnim.currentFrame = 0;
//     rodMeterAnim.x = 20;
//     rodMeterAnim.play();
//   });

//   app.stage.on("pointerup", e => {
//     rodMeterAnim.stop();
//     setTimeout(() => {
//       rodMeterAnim.alpha = 0;
//     }, 1000);
    
//   });
// }

// mainMenu();
addPier();
addBass();
addOcean();
addFishingRod();
// addFishingRodMeter();
