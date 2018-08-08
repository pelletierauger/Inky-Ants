let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let ant;
let mic;
let song;
let amp;
let level;
let layers = [];
let currentLayer = 0;

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    song = loadSound("test-notes.mp3", loaded);
    amp = new p5.Amplitude();
    // 
    for (let i = 0; i < 4; i++) {
        let graphics = createGraphics(width * 2, height * 2);
        graphics.background(0);
        graphics.fill(255, 100);
        graphics.noStroke();
        layers.push(graphics);
    }
    ant = new Ant(width / 2, height / 2);
    frameRate(30);
    background(0);
    fill(255, 25);
    noStroke();
    if (!looping) {
        noLoop();
    }
    // mic = new p5.AudioIn();
    // mic.start();
    // tint(255, 127);
}

function loaded() {
    song.play();
}

function draw() {
    // level = mic.getLevel();
    level = amp.getLevel();
    for (let i = 0; i < 50; i++) {
        ant.walk();
        ant.show();
    }
    image(layers[currentLayer], 0, 0, width, height);
    currentLayer++;
    if (currentLayer >= layers.length) {
        currentLayer = 0;
    }
    if (exporting && frameCount < maxFrames) {
        frameExport();
    }

    let mapCol = map(level, 0, 1, 80, 255);
    for (let i = 0; i < layers.length; i++) {
        // layers[currentLayer].background(0, 10);
        // layers[currentLayer].fill(255, mapCol, 0, 100);
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
            song.pause();
        } else {
            loop();
            looping = true;
            song.play();
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport();
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }
}