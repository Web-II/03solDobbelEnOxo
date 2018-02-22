class Spelbord {
  constructor() {
    this._bord = [];
    for (let rij = 0; rij < 3; rij++) {
      this._bord[rij] = [];
      for (let kol = 0; kol < 3; kol++) {
        this._bord[rij][kol] = null;
      }
    }
  }
  plaatsSymbool(symbool, rij, kol) {
    this._bord[rij][kol] = symbool;
  }
}

function init() {
  const bord = new Spelbord();
  const imgElementen = document.getElementsByTagName('img');
  for (var img of imgElementen) {
    img.onclick = function() {
      bord.plaatsSymbool(this.id[0] - 1, this.id[1] - 1);
      this.src = 'images/o.png';
    };
  }
}

window.onload = init;
