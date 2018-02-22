class Spel {
  constructor() {
    this._spelbord = new Spelbord();
    this._tePlaatsenSymbool = 'O';
    this._geplaatsteSymbool = 'X';
    this._winaarsSymbool = null;
  }
  plaatsSymbool(rij, kol) {
    if (!this.isEindeSpel) {
      if (this._spelbord.isVrij(rij, kol)) {
        this._spelbord.plaatsSymbool(this._tePlaatsenSymbool, rij, kol);
        [this._tePlaatsenSymbool, this._geplaatsteSymbool] = [
          this._geplaatsteSymbool,
          this._tePlaatsenSymbool
        ];
        if (this._spelbord.bevatDrieOpEenRij(this.geplaatsteSymbool, rij, kol))
          this._winaarsSymbool = this.geplaatsteSymbool;
      }
    }
  }
  get isEindeSpel() {
    return this._spelbord.isVolzet || this._winaarsSymbool;
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
  get isVolzet() {
    for (let rij of this._bord) for (let kol of rij) if (!kol) return false;
    return true;
  }
  bevatDrieOpEenRij(symbool, rij, kol) {
    const isDrieOpEenRij = function(symbolen) {
      for (let s of symbolen) if (s !== symbool) return false;
      return true;
    };
    // horizontaal
    if (isDrieOpEenRij(this._bord[rij])) return true;
    // verticaal
    const kolom = [];
    for (let rij = 0; rij < 3; rij++) {
      kolom.push(this._bord[rij][kol]);
    }
    if (isDrieOpEenRij(kolom)) return true;
    // diagonalen
    const diagonaal1 = [];
    const diagonaal2 = [];
    for (let index = 0; index < 3; index++) {
      diagonaal1.push(this._bord[index][index]);
      diagonaal2.push(this._bord[index][2 - index]);
    }
    if (isDrieOpEenRij(diagonaal1) || isDrieOpEenRij(diagonaal2)) return true;
    return false;
  }
}

function toHtml(spel) {
  if (spel.winnaarsSymbool)
    document.getElementById('message').innerHTML = `Proficiat, speler ${
      spel.winnaarsSymbool
    } wint`;
  else if (spel.isEindeSpel)
    document.getElementById('message').innerHTML = `Gelijkspel!`;
  else
    document.getElementById('message').innerHTML = `Speler ${
      spel.tePlaatsenSymbool
    } is aan de beurt`;
}

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName('img');
  for (var img of imgElementen) {
    img.onclick = function() {
      if (!spel.isEindeSpel) {
        spel.plaatsSymbool(this.id[0] - 1, this.id[1] - 1);
        this.src = 'images/' + spel.geplaatsteSymbool + '.png';
        toHtml(spel);
      }
    };
  }
  toHtml(spel);
}

window.onload = init;
