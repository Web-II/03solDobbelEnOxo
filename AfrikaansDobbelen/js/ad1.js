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

function toHtml(dobbelsteen){
    document.getElementById("1").src = `images/Dice${dobbelsteen.aantalOgen}.png`;
}

function init(){
    const dobbelsteen = new Dobbelsteen();
    dobbelsteen.rol();
    toHtml(dobbelsteen);
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
