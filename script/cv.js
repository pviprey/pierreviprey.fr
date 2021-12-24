"use strict";

const START_YEAR = 2014;
const NUM_YEAR = new Date().getFullYear();
const DATE_LOAD = Date();

class Coord{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Experience{
    constructor(experience, index, color, dateBegin, dateEnd = null){
        this.experience = experience;
        this.index = index;
        this.color = color;
        this.dateBegin = dateBegin;
        this.dateEnd = dateEnd;
    }
}

function fill_canvas(tab_exp){
    let canvas = document.getElementById("cvs");
    let limite = document.getElementById("limit");

    const WIDTH = canvas.width = limite.offsetWidth;
    const HEIGHT = canvas.height = limite.offsetHeight;
    let ctx = canvas.getContext("2d");

    let size_year = WIDTH/(NUM_YEAR-START_YEAR+2);

    for(let i = 0; i < NUM_YEAR-START_YEAR+2; i++){
        let year = START_YEAR + i;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "2.4vh helvetica";
        let position = new Coord(size_year/2+size_year*i, 25);
        ctx.fillText(year, position.x, position.y);

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "3px";
        ctx.moveTo(position.x, position.y+10);
        ctx.lineTo(position.x, HEIGHT);
        ctx.stroke();
        ctx.closePath();
    }

    for(let event of tab_exp){
        let size = 50;

        let monthBegin = event.dateBegin.getMonth();
        let yearBegin = event.dateBegin.getFullYear();
        let positionBegin = new Coord(size_year/2 + (yearBegin - START_YEAR)*size_year + monthBegin/11*size_year, HEIGHT/2 + (size+20)*event.index);
        
        let monthEnd = event.dateEnd.getMonth();
        let yearEnd = event.dateEnd.getFullYear();
        let positionEnd = new Coord(size_year/2 + (yearEnd - START_YEAR)*size_year + monthEnd/11*size_year, HEIGHT/2 + (size+20)*event.index);

        if(event.dateEnd == DATE_LOAD){
            positionEnd.x -=size/2;
            ctx.beginPath();
            ctx.fillStyle = event.color;

            ctx.moveTo(positionBegin.x, positionBegin.y+size/2);
            ctx.lineTo(positionEnd.x, positionEnd.y+size/2);
            ctx.lineTo(positionEnd.x+size/2, positionEnd.y);
            ctx.lineTo(positionEnd.x, positionEnd.y-size/2);
            ctx.lineTo(positionBegin.x, positionBegin.y-size/2);

            ctx.fill();            
        }else{
            ctx.beginPath();
            ctx.strokeStyle = event.color;
            ctx.lineWidth = size;

            ctx.moveTo(positionBegin.x, positionBegin.y);
            ctx.lineTo(positionEnd.x, positionEnd.y);
            
            ctx.stroke();
            ctx.closePath();
        }

        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "4vh helvetica";
        ctx.fillText(event.experience, (positionEnd.x-positionBegin.x)/2+positionBegin.x, positionBegin.y+size/4);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    /* Ajout de ma boite mail */
    let mail = document.createElement("a");
    mail.href = "mailto:viprey.pierre@gmail.com";
    mail.innerText = "viprey.pierre@gmail.com";
    document.getElementById("mail").insertAdjacentElement('beforeend', mail);


    /* Ajout de mes expériences */
    let tab_exp = [];
    /* Lycee: Sept 2014 -> Juin 2017 */
    tab_exp.push(new Experience("Lycée", 0, "blue", new Date(2014, 8), new Date(2017, 5)));
    /* Universite: Sept 2017 -> Now */
    tab_exp.push(new Experience("Université", 0, "purple", new Date(2017, 8), new Date()));
    /* CSGO Team: Sept 2018 -> Avril 2019 */
    tab_exp.push(new Experience("Projet", 1, "green", new Date(2018, 8), new Date(2019, 3)));
    /* Les Josettes: Avril 2021 -> Now */
    tab_exp.push(new Experience("Association", 1, "orange", new Date(2021, 3), new Date()));

    fill_canvas(tab_exp);

    $(window).resize(function() {
        fill_canvas(tab_exp);
    });
});

