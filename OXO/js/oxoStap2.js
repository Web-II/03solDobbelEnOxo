class Spel {
  constructor() {
    this._spelbord = new Spelbord();
    this._tePlaatsenSymbool = 'O';
    this._geplaatsteSymbool = 'X';
    this._winaarsSymbool = null;
  }
  plaatsSymbool(rij, kol) {
    if (this._spelbord.isVrij(rij, kol)) {
      this._spelbord.plaatsSymbool(this._tePlaatsenSymbool, rij, kol);
      [this._tePlaatsenSymbool, this._geplaatsteSymbool] = [
        this._geplaatsteSymbool,
        this._tePlaatsenSymbool
      ];
    }
  }
  get winnaarsSymbool() {
    return this._winaarsSymbool;
  }
  get geplaatsteSymbool() {
    return this._geplaatsteSymbool;
  }
  get tePlaatsenSymbool() {
    return this._tePlaatsenSymbool;
  }
}

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
  isVrij(rij, kol) {
    return !this._bord[rij][kol];
  }
}

function toHtml(spel) {
  document.getElementById('message').innerHTML = `Speler ${
    spel.tePlaatsenSymbool
  } is aan de beurt`;
}

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName('img');
  for (var img of imgElementen) {
    img.onclick = function() {
      spel.plaatsSymbool(this.id[0] - 1, this.id[1] - 1);
      this.src = 'images/' + spel.geplaatsteSymbool + '.png';
      toHtml(spel);
    };
  }
  toHtml(spel);
}

window.onload = init;
