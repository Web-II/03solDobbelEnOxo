// start hier
class Dobbelsteen{
    constructor(){
        this._aantalOgen = 1;
    }
    get aantalOgen(){
        return this._aantalOgen;
    }
    rol(){
        this._aantalOgen = Math.floor(Math.random()*6 +1);
    }
}
class Speler{
    constructor(naam){
        this._naam = naam;
        this._score = 0;
        this._dobbelstenen = [];
        for(let i = 1;i<=5;i++){
            this._dobbelstenen.push(new Dobbelsteen());
        }
    }
    get naam(){
        return this._naam;
    }
    get score(){
        return this._score;
    }
    get dobbelstenen(){
        return this._dobbelstenen;
    }
    get aantalDobbelstenen(){
        return this._dobbelstenen.length;
    }
    speel(){
        for (const d of this.dobbelstenen){
            d.rol();
            if (d.aantalOgen === 1) this._score += 100;
            else if(d.aantalOgen === 5) this._score += 50;
        }
    }
}

function toHtml(speler){
    for(let i = 0;i < speler.aantalDobbelstenen;i++){
        document.getElementById(i+1).src = `images/Dice${speler.dobbelstenen[i].aantalOgen}.png`;
    }
    document.getElementById("speler").innerText = `Speler: ${speler.naam}`;
    document.getElementById("score").innerText = `Score: ${speler.score}`;
}

function init(){
    const speler = new Speler("Stefaan");    
    toHtml(speler);
    document.getElementById("play").onclick = function(){
        speler.speel();
        toHtml(speler);
    }
}

window.onload = init;

/***************************************************************************************** */
/* onderstaand stukje code heb je pas in de laatste stap van de oefening nodig (zie opgave) */
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
