class Spelbord {
  constructor() {
    this._bord = [];
    for (let rij = 0; rij < 3; rij++) {
      this._bord[rij] = [];
      for (let kol = 0; kol < 3; kol++) {
        this._bord[rij][kol] = "";
      }
    }
  }
  get bord() {
    return this._bord;
  }
  plaatsSymbool(symbool, rij, kol) {
    this._bord[rij][kol] = symbool;
  }
  isVrij(rij, kol) {
    return !this._bord[rij][kol];
  }
}

class Spel {
  constructor() {
    this._spelbord = new Spelbord();
    this._tePlaatsenSymbool = "O";
    this._geplaatsteSymbool = "X";
    this._winnaarsSymbool = "";
  }
  plaatsSymbool(rij, kol) {
    if (this._spelbord.isVrij(rij, kol)) {
      this._spelbord.plaatsSymbool(this._tePlaatsenSymbool, rij, kol);
      [this._tePlaatsenSymbool, this._geplaatsteSymbool] = [this._geplaatsteSymbool,this._tePlaatsenSymbool,
      ];
    }
  }
  get spelbord() {
    return this._spelbord;
  }
  get winnaarsSymbool() {
    return this._winnaarsSymbool;
  }
  get geplaatsteSymbool() {
    return this._geplaatsteSymbool;
  }
  get tePlaatsenSymbool() {
    return this._tePlaatsenSymbool;
  }
}

function toHtml(spel) {
  for (let rij = 0; rij < 3; rij++) {
    for (let kol = 0; kol < 3; kol++) {
      const cel = spel.spelbord.bord[rij][kol];
      const id = (rij + 1).toString() + (kol + 1).toString();
      document.getElementById(id).src = `images/${cel ? cel : "wit"}.png`;
    }
  }
  document.getElementById(
    "message"
  ).innerHTML = `Speler ${spel.tePlaatsenSymbool} is aan de beurt`;
}

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName("img");
  for (const img of imgElementen) {
    img.onclick = function () {
      const rij = this.id[0] - 1;
      const kol = this.id[1] - 1;
      spel.plaatsSymbool(rij, kol);
      toHtml(spel);
    };
  }
  toHtml(spel);
}

window.onload = init;
