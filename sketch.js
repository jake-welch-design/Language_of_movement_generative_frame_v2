let fps = 12;
let vidLength = 30;

let tile;
let tileSizeW, tileSizeH;
let tileAmt = 30;

let vertAmt = 12;

let tileColor = 255;
let bgcolor = 0;
let blurVal = 10;

let sqSize;
let sqMoveCount = 0;
let sqStepIndex = 0;
let sqPos = { x: 0, y: 0 };

let sqMoveSeq = [
  { dir: 'right', count: 3 },
  { dir: 'down', count: 9},
  { dir: 'left', count: 3 },
  { dir: 'up', count: 3 },
  { dir: 'right', count: 9 },
  { dir: 'down', count: 3 },
  { dir: 'left', count: 3 },
  { dir: 'up', count: 9 },
  { dir: 'right', count: 3 },
  { dir: 'down', count: 3 },
  { dir: 'left', count: 9 },
  { dir: 'up', count: 3 }
];

let stepSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  background(bgcolor);

  tile = createGraphics(windowHeight,windowHeight); 
  sqSize = tile.height/10;
  stepSize = (tile.height/10);

  tileSizeW = width/tileAmt;
  let aspectRatio = width / height;
  tileSizeH = height/(tileAmt / aspectRatio);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  tileSizeW = width / tileAmt;
  let aspectRatio = width / height;
  tileSizeH = height / (tileAmt / aspectRatio);
}


function draw() {
  //   if (frameCount === 1) {
  //   capturer.start();
  // }

  imageMode(CENTER);
  drawtile();

  let wave = map(sin(frameCount * 0.1), -1, 1, -((tile.width/10)-30), ((tile.width/10)-30));

// top

for(let i = 0; i < width/tileSizeW; i++){
  push();
  translate((i * tileSizeW) + (tileSizeW/2),(tileSizeW/2));
  rotate(radians(180 * i));
  image(tile,0,0,tileSizeW,tileSizeW);
  pop();
}

// OVERLAPPING TOP TEST
// for(let i = 0; i < width/((tileSizeW/10)*6); i++){
//   push();
//   translate((i * (tileSizeW/10)*6) + (tileSizeW/2),(tileSizeW/2)); //overlapping
//   image(tile,0,0,tileSizeW,tileSizeW);
//   pop();
// }

// bottom
for(let i = 0; i < width/tileSizeW; i++){
  push();
  translate((i * tileSizeW) + (tileSizeW/2),(tileSizeW * (vertAmt+1))-(tileSizeW/2));
  rotate(radians(180 * i));
  image(tile,0,0,tileSizeW,tileSizeW);
  pop();
}

// left
for(let i = 0; i < vertAmt; i++){
  push();
  translate((tileSizeH/2),(i * tileSizeH) + (tileSizeH/2));
  rotate(radians(180 * i));
  image(tile,0,0,tileSizeH,tileSizeH);
  pop();
}

// right
for(let i = 0; i < vertAmt; i++){
  push();
  translate(width-(tileSizeH/2),(i * tileSizeH) + (tileSizeH/2));
  rotate(radians(180 * i));
  image(tile,0,0,tileSizeH,tileSizeH);
  pop();
}

  push();
  fill(bgcolor,blurVal);
  noStroke();
  rect(0,0,width,height);
  pop();

  // push();
  // fill(tileColor);
  // rect(tileSizeW,tileSizeH,width-(tileSizeW*2),height-(tileSizeH*2));
  // pop();

  //   if (frameCount < fps * vidLength) {
  //   capturer.capture(canvas);
  // } else if (frameCount === fps * vidLength) {
  //   capturer.save();
  //   capturer.stop();
  // }
}

function keyPressed() {
  if(key == 's'){
    saveCanvas('frame_v2', 'png');
  }
}

function drawtile() {
  let pos, moveCount, stepIndex, pattern;
  
  pos = sqPos;
  moveCount = sqMoveCount;
  stepIndex = sqStepIndex;  
  pattern = sqMoveSeq;

  const step = pattern[stepIndex];

  // Update position based on step direction
  if (step.dir === 'right') {
    pos.x += stepSize;
  } else if (step.dir === 'down') {
    pos.y += stepSize;
  } else if (step.dir === 'left') {
    pos.x -= stepSize;
  } else if (step.dir === 'up') {
    pos.y -= stepSize;
  }
  // tile.background(0);
  tile.clear();
    tile.fill(tileColor);
    tile.noStroke();
    tile.rect(pos.x, pos.y, sqSize, sqSize);

  moveCount++;
  if (moveCount === step.count) {
    moveCount = 0;
    stepIndex = (stepIndex + 1) % pattern.length;
  }

  // Update sqStepIndex and sqMoveCount
  sqStepIndex = stepIndex;
  sqMoveCount = moveCount;
}