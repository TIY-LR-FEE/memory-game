(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Game = require('./modules/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// # step one
// game object
var game = new _Game2.default(12);
game.render();

// click on tile, show tile image

// # step two
// show image until two are clicked, then hide image

// # step three
// if images clicked match, stay up, don't allow clicking

},{"./modules/Game":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tile = require('./Tile');

var _Tile2 = _interopRequireDefault(_Tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    var numTiles = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];

    _classCallCheck(this, Game);

    this.numTiles = numTiles;
    this.numTilesMatched = 0;
    this.tiles = [];
    this.tileToMatch = null;

    this.icons = ['fort-awesome', 'car', 'birthday-cake', 'bomb', 'space-shuttle', 'rocket', 'motorcycle', 'fighter-jet', 'cc-discover', 'money', 'github-alt', 'facebook-official'];
  }

  _createClass(Game, [{
    key: 'showTile',
    value: function showTile(tile) {
      tile.div.classList.add("flipped");
      tile.removeListener();

      if (this.tileToMatch !== null) {
        this.checkMatch(this.tileToMatch, tile);
      } else {
        this.tileToMatch = tile;
      }
    }
  }, {
    key: 'checkMatch',
    value: function checkMatch(tileFirst, tileSecond) {
      if (tileFirst.icon === tileSecond.icon) {
        tileFirst.div.classList.add("match");
        tileSecond.div.classList.add("match");
        this.numTilesMatched += 2;

        setTimeout(function () {
          var audio = new Audio('../images/match.wav');
          audio.play();
        }, 250);

        this.checkWon();
      } else {
        setTimeout(function () {
          tileFirst.div.classList.remove("flipped");
          tileFirst.addListener();
          tileSecond.div.classList.remove("flipped");
          tileSecond.addListener();
        }, 1000);
      }

      this.tileToMatch = null;
    }
  }, {
    key: 'checkWon',
    value: function checkWon() {
      if (this.numTiles === this.numTilesMatched) {
        setTimeout(function () {
          var heading = document.querySelector("#heading");
          heading.textContent = "Congratulations, You Won!";
          heading.classList.add("won");
        }, 300);
      }
    }
  }, {
    key: 'shuffleTiles',
    value: function shuffleTiles() {
      var currentIndex = this.tiles.length,
          temporaryValue,
          randomIndex;

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
  }, {
    key: 'render',
    value: function render() {
      this.tiles = [];

      var numToMake = this.numTiles / 2;
      var iconList = this.icons.slice(0);

      for (var i = 0; i < numToMake; i++) {
        var iconName = iconList[Math.floor(Math.random() * iconList.length)];

        var tile1 = new _Tile2.default(this, iconName);
        var tile2 = new _Tile2.default(this, iconName);
        this.tiles.push(tile1);
        this.tiles.push(tile2);

        iconList.splice(iconList.indexOf(iconName), 1);
      }

      this.shuffleTiles();

      this.tiles.forEach(function (tile) {
        tile.render();
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./Tile":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
  function Tile(game, icon) {
    var _this = this;

    _classCallCheck(this, Tile);

    this.showTile = function (e) {
      _this.game.showTile(_this);
    };

    this.game = game;
    this.icon = icon;
    this.div;
  }

  _createClass(Tile, [{
    key: "addListener",
    value: function addListener() {
      this.div.addEventListener("click", this.showTile);
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      this.div.removeEventListener("click", this.showTile);
    }
  }, {
    key: "render",
    value: function render() {
      // <div class="tile">
      //   <div class="front">
      //     <i class="fa fa-question-circle"></i>
      //   </div>
      //   <div class="back">
      //     <i class="fa fa-github-alt"></i>
      //   </div>
      // </div>
      var div = document.createElement("div");
      div.classList.add("tile");

      var front = document.createElement("div");
      front.classList.add("front");

      var question = document.createElement("i");
      question.classList.add("fa");
      question.classList.add("fa-question-circle");

      front.appendChild(question);

      var back = document.createElement("div");
      back.classList.add("back");

      var icon = document.createElement("i");
      icon.classList.add("fa");
      icon.classList.add("fa-" + this.icon);

      back.appendChild(icon);

      div.appendChild(front);
      div.appendChild(back);

      this.div = div;

      this.addListener();

      document.querySelector("#tiles").appendChild(div);
    }
  }]);

  return Tile;
}();

exports.default = Tile;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL21vZHVsZXMvR2FtZS5qcyIsImFwcC9tb2R1bGVzL1RpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUlBLElBQUksT0FBTyxtQkFBUyxFQUFULENBQVA7QUFDSixLQUFLLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7Ozs7Ozs7SUFFTTtBQUNKLFdBREksSUFDSixHQUEwQjtRQUFkLGlFQUFXLGlCQUFHOzswQkFEdEIsTUFDc0I7O0FBQ3hCLFNBQUssUUFBTCxHQUFnQixRQUFoQixDQUR3QjtBQUV4QixTQUFLLGVBQUwsR0FBdUIsQ0FBdkIsQ0FGd0I7QUFHeEIsU0FBSyxLQUFMLEdBQWEsRUFBYixDQUh3QjtBQUl4QixTQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FKd0I7O0FBTXhCLFNBQUssS0FBTCxHQUFhLENBQ1gsY0FEVyxFQUVYLEtBRlcsRUFHWCxlQUhXLEVBSVgsTUFKVyxFQUtYLGVBTFcsRUFNWCxRQU5XLEVBT1gsWUFQVyxFQVFYLGFBUlcsRUFTWCxhQVRXLEVBVVgsT0FWVyxFQVdYLFlBWFcsRUFZWCxtQkFaVyxDQUFiLENBTndCO0dBQTFCOztlQURJOzs2QkF3QkssTUFBTTtBQUNiLFdBQUssR0FBTCxDQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsU0FBdkIsRUFEYTtBQUViLFdBQUssY0FBTCxHQUZhOztBQUliLFVBQUksS0FBSyxXQUFMLEtBQXFCLElBQXJCLEVBQTJCO0FBQzdCLGFBQUssVUFBTCxDQUFnQixLQUFLLFdBQUwsRUFBa0IsSUFBbEMsRUFENkI7T0FBL0IsTUFHSztBQUNILGFBQUssV0FBTCxHQUFtQixJQUFuQixDQURHO09BSEw7Ozs7K0JBU1MsV0FBVyxZQUFZO0FBQ2hDLFVBQUksVUFBVSxJQUFWLEtBQW1CLFdBQVcsSUFBWCxFQUFpQjtBQUN0QyxrQkFBVSxHQUFW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QUF5QixLQUFLLElBQUwsQ0FBekIsQ0ExQk87O0FBNEJQLFdBQUssV0FBTCxDQUFpQixJQUFqQixFQTVCTzs7QUE4QlAsVUFBSSxXQUFKLENBQWdCLEtBQWhCLEVBOUJPO0FBK0JQLFVBQUksV0FBSixDQUFnQixJQUFoQixFQS9CTzs7QUFpQ1AsV0FBSyxHQUFMLEdBQVcsR0FBWCxDQWpDTzs7QUFtQ1AsV0FBSyxXQUFMLEdBbkNPOztBQXFDUCxlQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsV0FBakMsQ0FBNkMsR0FBN0MsRUFyQ087Ozs7U0FuQkw7OztrQkE0RFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9tb2R1bGVzL0dhbWUnO1xuXG4vLyAjIHN0ZXAgb25lXG4vLyBnYW1lIG9iamVjdFxubGV0IGdhbWUgPSBuZXcgR2FtZSgxMik7XG5nYW1lLnJlbmRlcigpO1xuXG4vLyBjbGljayBvbiB0aWxlLCBzaG93IHRpbGUgaW1hZ2VcblxuLy8gIyBzdGVwIHR3b1xuLy8gc2hvdyBpbWFnZSB1bnRpbCB0d28gYXJlIGNsaWNrZWQsIHRoZW4gaGlkZSBpbWFnZVxuXG4vLyAjIHN0ZXAgdGhyZWVcbi8vIGlmIGltYWdlcyBjbGlja2VkIG1hdGNoLCBzdGF5IHVwLCBkb24ndCBhbGxvdyBjbGlja2luZ1xuIiwiaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKG51bVRpbGVzID0gNCkge1xuICAgIHRoaXMubnVtVGlsZXMgPSBudW1UaWxlcztcbiAgICB0aGlzLm51bVRpbGVzTWF0Y2hlZCA9IDA7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIHRoaXMudGlsZVRvTWF0Y2ggPSBudWxsO1xuXG4gICAgdGhpcy5pY29ucyA9IFtcbiAgICAgICdmb3J0LWF3ZXNvbWUnLFxuICAgICAgJ2NhcicsXG4gICAgICAnYmlydGhkYXktY2FrZScsXG4gICAgICAnYm9tYicsXG4gICAgICAnc3BhY2Utc2h1dHRsZScsXG4gICAgICAncm9ja2V0JyxcbiAgICAgICdtb3RvcmN5Y2xlJyxcbiAgICAgICdmaWdodGVyLWpldCcsXG4gICAgICAnY2MtZGlzY292ZXInLFxuICAgICAgJ21vbmV5JyxcbiAgICAgICdnaXRodWItYWx0JyxcbiAgICAgICdmYWNlYm9vay1vZmZpY2lhbCdcbiAgICBdO1xuXG4gIH1cblxuICBzaG93VGlsZSh0aWxlKSB7XG4gICAgdGlsZS5kaXYuY2xhc3NMaXN0LmFkZChcImZsaXBwZWRcIik7XG4gICAgdGlsZS5yZW1vdmVMaXN0ZW5lcigpO1xuXG4gICAgaWYgKHRoaXMudGlsZVRvTWF0Y2ggIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2hlY2tNYXRjaCh0aGlzLnRpbGVUb01hdGNoLCB0aWxlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnRpbGVUb01hdGNoID0gdGlsZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrTWF0Y2godGlsZUZpcnN0LCB0aWxlU2Vjb25kKSB7XG4gICAgaWYgKHRpbGVGaXJzdC5pY29uID09PSB0aWxlU2Vjb25kLmljb24pIHtcbiAgICAgIHRpbGVGaXJzdC5kaXYuY2xhc3NMaXN0LmFkZChcIm1hdGNoXCIpO1xuICAgICAgdGlsZVNlY29uZC5kaXYuY2xhc3NMaXN0LmFkZChcIm1hdGNoXCIpO1xuICAgICAgdGhpcy5udW1UaWxlc01hdGNoZWQgKz0gMjtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHZhciBhdWRpbyA9IG5ldyBBdWRpbygnLi4vaW1hZ2VzL21hdGNoLndhdicpO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICB9LCAyNTApO1xuXG4gICAgICB0aGlzLmNoZWNrV29uKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbGVGaXJzdC5kaXYuY2xhc3NMaXN0LnJlbW92ZShcImZsaXBwZWRcIik7XG4gICAgICAgIHRpbGVGaXJzdC5hZGRMaXN0ZW5lcigpO1xuICAgICAgICB0aWxlU2Vjb25kLmRpdi5jbGFzc0xpc3QucmVtb3ZlKFwiZmxpcHBlZFwiKTtcbiAgICAgICAgdGlsZVNlY29uZC5hZGRMaXN0ZW5lcigpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgdGhpcy50aWxlVG9NYXRjaCA9IG51bGw7XG4gIH1cblxuICBjaGVja1dvbigpIHtcbiAgICBpZiAodGhpcy5udW1UaWxlcyA9PT0gdGhpcy5udW1UaWxlc01hdGNoZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgaGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGluZ1wiKTtcbiAgICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9IFwiQ29uZ3JhdHVsYXRpb25zLCBZb3UgV29uIVwiO1xuICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoXCJ3b25cIik7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfVxuXG4gIHNodWZmbGVUaWxlcygpIHtcbiAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy50aWxlcy5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblxuICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG4gICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcbiAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICB0ZW1wb3JhcnlWYWx1ZSA9IHRoaXMudGlsZXNbY3VycmVudEluZGV4XTtcbiAgICAgIHRoaXMudGlsZXNbY3VycmVudEluZGV4XSA9IHRoaXMudGlsZXNbcmFuZG9tSW5kZXhdO1xuICAgICAgdGhpcy50aWxlc1tyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy50aWxlcyA9IFtdO1xuXG4gICAgbGV0IG51bVRvTWFrZSA9IHRoaXMubnVtVGlsZXMgLyAyO1xuICAgIGxldCBpY29uTGlzdCA9IHRoaXMuaWNvbnMuc2xpY2UoMCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVRvTWFrZTsgaSsrKSB7XG4gICAgICBsZXQgaWNvbk5hbWUgPSBpY29uTGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpY29uTGlzdC5sZW5ndGgpXTtcblxuICAgICAgbGV0IHRpbGUxID0gbmV3IFRpbGUodGhpcywgaWNvbk5hbWUpO1xuICAgICAgbGV0IHRpbGUyID0gbmV3IFRpbGUodGhpcywgaWNvbk5hbWUpO1xuICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUxKTtcbiAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlMik7XG5cbiAgICAgIGljb25MaXN0LnNwbGljZShpY29uTGlzdC5pbmRleE9mKGljb25OYW1lKSwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy5zaHVmZmxlVGlsZXMoKTtcblxuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgdGlsZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjbGFzcyBUaWxlIHtcbiAgY29uc3RydWN0b3IoZ2FtZSwgaWNvbikge1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICB0aGlzLmRpdjtcbiAgfVxuXG4gIGFkZExpc3RlbmVyKCkge1xuICAgIHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNob3dUaWxlKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuZGl2LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNob3dUaWxlKTtcbiAgfVxuXG4gIHNob3dUaWxlID0gKGUpID0+IHtcbiAgICB0aGlzLmdhbWUuc2hvd1RpbGUodGhpcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gPGRpdiBjbGFzcz1cInRpbGVcIj5cbiAgICAvLyAgIDxkaXYgY2xhc3M9XCJmcm9udFwiPlxuICAgIC8vICAgICA8aSBjbGFzcz1cImZhIGZhLXF1ZXN0aW9uLWNpcmNsZVwiPjwvaT5cbiAgICAvLyAgIDwvZGl2PlxuICAgIC8vICAgPGRpdiBjbGFzcz1cImJhY2tcIj5cbiAgICAvLyAgICAgPGkgY2xhc3M9XCJmYSBmYS1naXRodWItYWx0XCI+PC9pPlxuICAgIC8vICAgPC9kaXY+XG4gICAgLy8gPC9kaXY+XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ0aWxlXCIpO1xuXG4gICAgbGV0IGZyb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmcm9udC5jbGFzc0xpc3QuYWRkKFwiZnJvbnRcIik7XG5cbiAgICBsZXQgcXVlc3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBxdWVzdGlvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIik7XG4gICAgcXVlc3Rpb24uY2xhc3NMaXN0LmFkZChgZmEtcXVlc3Rpb24tY2lyY2xlYCk7XG5cbiAgICBmcm9udC5hcHBlbmRDaGlsZChxdWVzdGlvbik7XG5cbiAgICBsZXQgYmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYmFjay5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcblxuICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmFcIik7XG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKGBmYS0ke3RoaXMuaWNvbn1gKTtcblxuICAgIGJhY2suYXBwZW5kQ2hpbGQoaWNvbik7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQoZnJvbnQpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChiYWNrKTtcblxuICAgIHRoaXMuZGl2ID0gZGl2O1xuXG4gICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aWxlc1wiKS5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGU7XG4iXX0=
