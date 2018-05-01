// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 3;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-car.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 50, this.y * 50);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row, col) {
    this.playerImage = 'images/player-write.png';
    this.row = 8;
    this.col = 7;
    this.grab = false;
    this.item = "none";
}

Player.prototype.update = function() {
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.col * 50, this.row * 50);
}

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.row - 1 > 0) {
        this.row--;
        if (this.grab === true) {
            this.item.y--;
        }
    }
    else if (key === 'down' && this.row + 1 <= Math.round(document.querySelector("canvas").height / 50) - 3) {
        this.row++;
        if (this.grab === true) {
            this.item.y++;
        }
    }
    else if (key === 'left' && this.col - 1 >= 0) {
        this.col--;
        if (this.grab === true) {
            this.item.x--;
        }
    }
    else if (key === 'right' && this.col + 1 < Math.round(document.querySelector("canvas").width / 50) - 3) {
        this.col++;
        if (this.grab === true) {
            this.item.x++;
        }
    }
    if (this.grab === false && this.row === 6 && allToys.find(a => a.x === player.col && a.y === player.row) !== undefined) {
        let grabbedItem = allToys.find(a => a.x === player.col && a.y === player.row);
        this.grab = true;
        grabbedItem.grabbed = true;
        this.item = grabbedItem;
    }
    if (this.grab === true && this.row === 1) {
        let kidAbove = allKids.find(b => b.x === player.col);
        if (kidAbove.color === this.item.color) {
            this.item.y--;
            this.grab = false;
            this.item.grabbed = false;
            this.item = 'none';
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy = new Enemy;
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Tables

var Table = function(width, name, imageFile) {
    this.x = 0;
    this.y = 1;
    this.width = width;
    this.name = name;
    this.imageFile = imageFile;
}

var familyTable = new Table(3, 'family', 'images/family-table.png');
var coupleTable = new Table(2, 'couple', 'images/couple-table.png');
var wineTable = new Table(2, 'wine', 'images/winecouple-table.png');
var girlsTable = new Table(3, 'girls', 'images/girls-table.png');
var boysTable = new Table(2, 'boys', 'images/buddies-table.png');
var businessTable = new Table(1, 'business', 'images/business-table.png');

var allTables = [familyTable, coupleTable, wineTable, girlsTable, boysTable, businessTable];
var screenTables = [];

while (screenTables.length < 3) {
    var item = allTables[Math.floor(Math.random()*allTables.length)];
    if (screenTables.includes(item) === false) {
        screenTables.push(item);
    }
}

for (let j = 0; j < 3; j++) {
    let w = screenTables[j-1] === undefined ? 0 : screenTables[j-1].width;
    let l = screenTables[j-1] === undefined ? 2 : screenTables[j-1].x;
    screenTables[j].x = w + l + (j ? 1 : 0);
}

Table.prototype.render = function() {
    ctx.drawImage(Resources.get(this.imageFile), this.x * 50, this.y * 50);
}

console.log(screenTables);

// shuffle function to randomize order of characters/toys
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}