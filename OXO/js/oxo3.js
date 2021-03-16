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
  
  get volBord() {
    for (const rij of this._bord) for (const kol of rij) if (!kol) return false;
    return true;
  }
  get isVolzet() {
    for (const rij of this._bord) for (const kol of rij) if (!kol) return false;
    return true;
  }
  plaatsSymbool(symbool, rij, kol) {
    this._bord[rij][kol] = symbool;
  }
  getSymbool(rij,kol){
    return this.bord[rij][kol]
  }
  isVrij(rij, kol) {
    return !this._bord[rij][kol];
  }
  bevatDrieOpEenRij(symbool, rij, kol) {
    const isDrieOpEenRij = function (drieCellen) {
      for (const s of drieCellen) if (s !== symbool || !s) return false;
      return true;
    };
    // horizontaal
    if (isDrieOpEenRij(this._bord[rij])) return true;
    // verticaal
    const kolom = [];
    for (let r = 0; r < 3; r++) {
      kolom.push(this._bord[r][kol]);
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

class Spel {
  constructor() {
    this._spelbord = new Spelbord();
    this._tePlaatsenSymbool = "O";
    this._geplaatsteSymbool = "X";
    this._winnaarsSymbool = "";
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
  get isEindeSpel() {
    return this._spelbord.isVolzet || this._winnaarsSymbool;
  }  
  plaatsSymbool(rij, kol) {
    if (!this.isEindeSpel) {
      if (this._spelbord.isVrij(rij, kol)) {
        this._spelbord.plaatsSymbool(this._tePlaatsenSymbool, rij, kol);
        [this._tePlaatsenSymbool, this._geplaatsteSymbool] = [this._geplaatsteSymbool,this._tePlaatsenSymbool];
        if (this._spelbord.bevatDrieOpEenRij(this.geplaatsteSymbool, rij, kol))
          this._winnaarsSymbool = this.geplaatsteSymbool;
      }
    }
  }
}

function toHtml(spel) {
  for (let rij = 0; rij < 3; rij++) {
    for (let kol = 0; kol < 3; kol++) {
      const symbool = spel.spelbord.getSymbool(rij,kol);
      const id = [rij + 1, kol + 1].join('');
      document.getElementById(id).src = `images/${symbool ? symbool : "wit"}.png`;
    }
  }
  if (spel.winnaarsSymbool)
    document.getElementById('message').innerText = `Proficiat, speler ${spel.winnaarsSymbool} wint`;
  else if (spel.isEindeSpel)
    document.getElementById('message').innerText = `Gelijkspel!`;
  else
    document.getElementById('message').innerText = `Speler ${spel.tePlaatsenSymbool} is aan de beurt`;}

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName("img");
  for (const img of imgElementen) {
    img.onclick = function () {
      const [rij,kol] = this.id;
      spel.plaatsSymbool(rij-1, kol-1);
      toHtml(spel);
    };
  }
  toHtml(spel);
}

window.onload = init;
