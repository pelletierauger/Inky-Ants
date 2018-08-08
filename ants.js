let Ant = function(x, y) {
    this.pos = { x: x, y: y };
};

Ant.prototype.walk = function() {
    let s = map(level, 0, 1, 1, 10);
    let x = (random() < 0.5) ? s * -1 : s;
    let y = (random() < 0.5) ? s * -1 : s;
    if (this.pos.x + x > 0 && this.pos.x + x < width) {
        this.pos.x += x;
    }
    if (this.pos.y + y > 0 && this.pos.y + y < height) {
        this.pos.y += y;
    }
};

Ant.prototype.show = function() {
    let s = map(level, 0, 1, 0, 10);
    let r = 2;
    for (let i = 0; i < layers.length; i++) {
        layers[i].ellipse(this.pos.x + random(-r, r), this.pos.y + random(-r, r), s + random());
    }
};