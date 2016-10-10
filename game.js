window.onload = function() {
    var tileSize = 80;
    var numRows = 4;
    var numCols = 5;
    var tileSpacing = 10;
    var tilesArray = [];
    var selectedArray = [];
    var game = new Phaser.Game(500,500);
    var playGame = function(game){}
    playGame.prototype = {
        preload: function(){
            game.load.spritesheet("tiles", "tiles.png", tileSize, tileSize)    
        },
        create: function(){
        this.placeTiles();
        },
        placeTiles: function(){
            var leftSpace = (game.width - (numCols * tileSize) - ((numCols - 1) * tileSpacing))/2;
            var topSpace = (game.height - (numRows * tileSize) - ((numRows - 1) * tileSpacing))/2;
            for(var i = 0; i < numCols * numRows; i++){
                tilesArray.push(Math.floor(i / 2));
            }
            for(i = 0; i < numCols * numRows; i++){
                var from = game.rnd.between(0, tilesArray.length-1);
                var to = game.rnd.between(0, tilesArray.length-1);
                tilesArray[from] = (tilesArray[from] + tilesArray[to]) - (tilesArray[to] = tilesArray[from]);
            }
            for(i = 0; i < numCols; i++){
                for(var j = 0; j < numRows; j++){
                    var tile = game.add.button(leftSpace + i * (tileSize + tileSpacing), topSpace + j * (tileSize + tileSpacing), "tiles", this.showTile, this);
                    tile.frame = 5;
                    tile.value = tilesArray[j * numCols + i];
                }
            }
        },
        showTile: function(target){
            if (selectedArray.length < 2 && selectedArray.indexOf(target) == -1){
                target.frame = target.value;
                selectedArray.push(target);
            }
            if (selectedArray.length == 2){
                game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
            }
        },
        checkTiles: function(){
            if (selectedArray[0].value == selectedArray[1].value){
                    selectedArray[0].destroy();
                    selectedArray[1].destroy();
                }
                else{
                    selectedArray[0].frame = 5;
                    selectedArray[1].frame = 5;
                }
                selectedArray.length = 0;
        }
    }
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}