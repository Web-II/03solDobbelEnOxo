// start hier
class Dobbelsteen {
  constructor() {
    this._aantalOgen = 1;
  }
  get aantalOgen() {
    return this._aantalOgen;
  }
  rol() {
    this._aantalOgen = Math.floor(Math.random() * 6 + 1);
  }
}
class Speler {
  constructor(naam) {
    this._naam = naam;
    this._score = 0;
    this._dobbelstenen = [];
    for (let i = 1; i <= 5; i++) {
      this._dobbelstenen.push(new Dobbelsteen());
    }
  }
  get naam() {
    return this._naam;
  }
  get score() {
    return this._score;
  }
  get dobbelstenen() {
    return this._dobbelstenen;
  }
  get aantalDobbelstenen() {
    return this._dobbelstenen.length;
  }
  speel() {
    for (const d of this.dobbelstenen) {
      d.rol();
      if (d.aantalOgen === 1) this._score += 100;
      else if (d.aantalOgen === 5) this._score += 50;
    }
  }
}

class Spel {
  constructor(spelersNamen) {
    this._spelers = [];
    for (const naam of spelersNamen) this._spelers.push(new Speler(naam));
    this._spelerAanZet = this._spelers[0];
  }
  get spelerAanZet() {
    return this._spelerAanZet;
  }
  get heeftWinnaar() {
    for (const s of this._spelers) {
      if (s.score >= 1000) return true;
    }
    return false;
  }
  get scoreOverzicht() {
    let overzicht = "";
    for (const s of this._spelers) {
      overzicht += `${s.naam}: ${s.score}\n`;
    }
    return overzicht;
  }
  speel() {
    if (!this.heeftWinnaar) this.spelerAanZet.speel();
  }
  bepaalVolgendeSpeler() {
    if (!this.heeftWinnaar) {
      const indexNext =
        (this._spelers.indexOf(this._spelerAanZet) + 1) % this._spelers.length;
      this._spelerAanZet = this._spelers[indexNext];
    }
  }
}

function toHtml(spel) {
    //spel._spelers.push(new Speler("Stefaan"));
    for (let i = 0; i < spel.spelerAanZet.aantalDobbelstenen; i++) {
      document.getElementById(i + 1).src = `images/Dice${spel.spelerAanZet.dobbelstenen[i].aantalOgen}.png`;
    }
    document.getElementById("score").innerText = `Score: ${spel.spelerAanZet.score}`;
    document.getElementById("speler").innerText = `Speler: ${spel.spelerAanZet.naam}`;
    if (spel.heeftWinnaar){
      alert(`Gefeliciteerd ${spel.spelerAanZet.naam}, je bent de winnaar!!`);
      document.getElementById("play").disabled = true;
    }
    else {
      if (document.getElementById("play").value === "Rol dobbelstenen") {
        document.getElementById("play").value = "Volgende speler";
        document.getElementById("play").onclick = function () {
          spel.bepaalVolgendeSpeler();
          toHtml(spel);
        };
      } else {
        document.getElementById("play").value = "Rol dobbelstenen";
        document.getElementById("play").onclick = function () {
          spel.speel();
          toHtml(spel);
        };
      }
    }
  }
  
  function init() {
    const aantalSpelers = prompt("Geef aantal spelers");
    const spelers = [];
    for (let i = 0; i < aantalSpelers; i++)
      spelers.push(prompt(`Naam speler ${i + 1}`));
    const spel = new Spel(spelers);
    toHtml(spel);
    document.getElementById("play").onclick = function () {
      spel.spelerAanZet.speel();
      toHtml(spel);
    };
    document.getElementById("scorebord").onclick = function () {
      alert(spel.scoreOverzicht);
    };
  }

window.onload = init;

/***************************************************************************************** */
/* ondestaand stukje code heb je pas in de laatste stap van de oefening nodig (zie opgave) */
/***************************************************************************************** */
// if (document.getElementById('play').value === 'Rol dobbelstenen') {
// 	document.getElementById('play').value = 'Volgende speler';
// 	document.getElementById('play').onclick = function() {
// 		spel.bepaalVolgendeSpeler();
// 		toHtml(spel);
// 	};
// } else {
// 	document.getElementById('play').value = 'Rol dobbelstenen';
// 	document.getElementById('play').onclick = function() {
// 		spel.speel();
// 		toHtml(spel);
// 	};
// }
