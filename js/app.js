// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.horizontal = 101;
    this.boundary = this.horizontal * 5;
    this.resetPosition = -this.horizontal;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.boundary){
        this.x += this.speed * dt;
    }
    else{
        this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
class Player {
    constructor(){
    this.horizontal = 101;
    this.vertical = 83;
    this.XPosition = this.horizontal * 2;
    this.YPosition = (this.vertical * 4) + 55;
    this.x = this.XPosition;
    this.y = this.YPosition;
    this.sprite = 'images/char-boy.png';
    }
    //  render method
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //  update method
    update() {
        for(let enemy of allEnemies){
            if(this.y === enemy.y && (enemy.x + enemy.horizontal/2 > this.x) && enemy.x < this.x + this.horizontal/2){
                this.reset();
            }
            if(this.y === 55){
                allEnemies = [];
                unrespond();
            }
        }
    }
    // game reset method
    reset(){
        this.x = this.XPosition;
        this.y = this.YPosition;
    }
    //  handleInput() method.
    handleInput(key){
        switch (key) {
            case "left":
                if(this.x > 0){
                    this.x -= this.horizontal; 
                }
            break;
            case "right":
                if(this.x < this.horizontal * 4){
                    this.x += this.horizontal;
                }
            break;
            case "up":
                if(this.y > this.vertical - 83){
                    this.y -= this.vertical;
                }
            break;
            case "down":
                if(this.y < this.vertical * 4){
                    this.y += this.vertical;
                }
            break;
        }
    }

    
}
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


const player = new Player();
var enemyOne = new Enemy(-101, 0, 200 );
var enemyTwo = new Enemy(-101, 83, 300);
var enemyThree = new Enemy((-101*2.5), 83, 300);

var allEnemies = [];
allEnemies.push(enemyOne, enemyTwo, enemyThree);
// unrespond for keyboard events
function unrespond(){
    document.removeEventListener("keydown", keyboard);
    function keyboard(event) {     
       document.body.innerHTML = `
        &nbsp;&nbsp;&nbsp;
        <b>which: ${event.which}</b>`;    
     }
    }

