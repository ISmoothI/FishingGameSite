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
  app.stage.addChild(water);
  
}

// mainMenu();
addOcean();