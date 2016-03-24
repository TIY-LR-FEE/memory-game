class Tile {
  constructor(game, icon) {
    this.game = game;
    this.icon = icon;
    this.div;
  }

  addListener() {
    this.div.addEventListener("click", this.showTile);
  }

  removeListener() {
    this.div.removeEventListener("click", this.showTile);
  }

  showTile = (e) => {
    this.game.showTile(this);
  }

  render() {
    // <div class="tile">
    //   <div class="front">
    //     <i class="fa fa-question-circle"></i>
    //   </div>
    //   <div class="back">
    //     <i class="fa fa-github-alt"></i>
    //   </div>
    // </div>
    let div = document.createElement("div");
    div.classList.add("tile");

    let front = document.createElement("div");
    front.classList.add("front");

    let question = document.createElement("i");
    question.classList.add("fa");
    question.classList.add(`fa-question-circle`);

    front.appendChild(question);

    let back = document.createElement("div");
    back.classList.add("back");

    let icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add(`fa-${this.icon}`);

    back.appendChild(icon);

    div.appendChild(front);
    div.appendChild(back);

    this.div = div;

    this.addListener();

    document.querySelector("#tiles").appendChild(div);
  }
}

export default Tile;
