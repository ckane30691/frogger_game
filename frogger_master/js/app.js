// Enemies player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 100*dt;
    this.x = this.x > 500 ? -100 : this.x;

    //Collision Detection Algo
    this.radius = 20;
    var dx = (this.x + this.radius) - (player.x + player.radius);
    var dy = (this.y + this.radius) - (player.y + player.radius);
    var distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < this.radius + player.radius) {
        var audio = document.createElement("audio");
        audio.src = "soundfx/nooo.wav";
        audio.volume = .2;
        audio.play();
        setTimeout(function(){location.reload()}, 500);
    };
};



Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.radius = 10;
};

Player.prototype.update = function(dt){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var score = 0;
$('.score').append(score);

Player.prototype.handleInput = function(input){
    if(!input) return;
    var moveToX = {
        'left': -100,
        'right': 100
    };
    
    var moveToY = {
        'up': -83,
        'down': 83
    };

    this.x += moveToX[input] || 0;
    this.y += moveToY[input] || 0; 
    this.win = this.y < 0 ? true : false;
    this.x = this.x < 0 ? 0 : this.x;
    this.y = this.y < 0 ? 400 : this.y;
    this.x = this.x > 400 ? 400 : this.x;
    this.y = this.y > 400 ? 400 : this.y;
    if (this.win === true){
        score+=1;
        var audio = document.createElement("audio");
        audio.src = "soundfx/achievement.wav";
        audio.volume = .5;
        audio.play();
        $(".score").html(score);
    };
};

var allEnemies = [new Enemy(0, 63), new Enemy(200, 146), new Enemy(400, 229)];
var player = new Player(100, 400);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

