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
  get bord(){
    return this._bord;
  }
  plaatsSymbool(symbool, rij, kol) {
    this._bord[rij][kol] = symbool;
  }
}
function toHtml(spelbord){
  for (let rij = 0; rij < 3; rij++){
    for(let kol = 0; kol < 3; kol++){
      const cel = spelbord.bord[rij][kol];
      const id = (rij+1).toString()+(kol+1).toString();
      document.getElementById(id).src = `images/${cel ? cel : 'wit'}.png`;
    }
  }
}
function init() {
  const bord = new Spelbord();
  const imgElementen = document.getElementsByTagName('img');
  toHtml(bord);
  for (const img of imgElementen) {    
    img.onclick = function() {
      const rij = this.id[0]-1;
      const kol = this.id[1]-1;
      bord.plaatsSymbool('O', rij, kol);
      toHtml(bord);      
    };
  }
}

window.onload = init;
