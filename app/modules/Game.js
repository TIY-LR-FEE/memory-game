import Tile from './Tile';

class Game {
  constructor(numTiles = 4) {
    this.numTiles = numTiles;
    this.numTilesMatched = 0;
    this.tiles = [];
    this.tileToMatch = null;

    this.icons = [
      'fort-awesome',
      'car',
      'birthday-cake',
      'bomb',
      'space-shuttle',
      'rocket',
      'motorcycle',
      'fighter-jet',
      'cc-discover',
      'money',
      'github-alt',
      'facebook-official'
    ];

  }

  showTile(tile) {
    tile.div.classList.add("flipped");
    tile.removeListener();

    if (this.tileToMatch !== null) {
      this.checkMatch(this.tileToMatch, tile);
    }
    else {
      this.tileToMatch = tile;
    }

  }

  checkMatch(tileFirst, tileSecond) {
    if (tileFirst.icon === tileSecond.icon) {
      tileFirst.div.classList.add("match");
      tileSecond.div.classList.add("match");
      this.numTilesMatched += 2;

      setTimeout(() => {
        var audio = new Audio('../images/match.wav');
        audio.play();
      }, 250);

      this.checkWon();
    }
    else {
      setTimeout(() => {
        tileFirst.div.classList.remove("flipped");
        tileFirst.addListener();
        tileSecond.div.classList.remove("flipped");
        tileSecond.addListener();
      }, 1000);
    }

    this.tileToMatch = null;
  }

  checkWon() {
    if (this.numTiles === this.numTilesMatched) {
      setTimeout(() => {
        let heading = document.querySelector("#heading");
        heading.textContent = "Congratulations, You Won!";
        heading.classList.add("won");
      }, 300);
    }
  }

  shuffleTiles() {
    var currentIndex = this.tiles.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.tiles[currentIndex];
      this.tiles[currentIndex] = this.tiles[randomIndex];
      this.tiles[randomIndex] = temporaryValue;
    }
  }

  render() {
    this.tiles = [];

    let numToMake = this.numTiles / 2;
    let iconList = this.icons.slice(0);

    for (var i = 0; i < numToMake; i++) {
      let iconName = iconList[Math.floor(Math.random() * iconList.length)];

      let tile1 = new Tile(this, iconName);
      let tile2 = new Tile(this, iconName);
      this.tiles.push(tile1);
      this.tiles.push(tile2);

      iconList.splice(iconList.indexOf(iconName), 1);
    }

    this.shuffleTiles();

    this.tiles.forEach((tile) => {
      tile.render();
    });

  }
}

export default Game;
