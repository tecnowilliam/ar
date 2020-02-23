var planet = '';

window.onload = function()
{
    getPosition();
}

function getPosition()
{
    document.getElementById('solar-system').addEventListener("mousemove", function(event) {
        positionX = (event.clientX-this.offsetLeft) / this.offsetWidth * 100;
        positionY = (event.clientY-this.offsetLeft) / this.offsetHeight * 100;
        onPlanet(positionX, positionY)
    });

    document.getElementById('solar-system').addEventListener("click", function(event) {
        if (planet != '') {
            window.location.href = 'planet.html?planet='+planet;
        }
        console.log("x:"+positionX);
        console.log("y:"+positionY);
    });
}

function onPlanet(positionX, positionY)
{
    planet = '';
    document.getElementById("solar-system").style.cursor = "initial";
    document.getElementById("title").innerHTML           = 'Sistema Solar';

    // Earth
    if (positionX >= 36 && positionX <= 42 && positionY >= 54 && positionY <= 65) {
        document.getElementById("solar-system").style.cursor = "pointer";
        document.getElementById("title").innerHTML           = 'Sistema Solar: Tierra';
        planet = 'earth';
    }

    // Mars
    if (positionX >= 43 && positionX <= 48.5 && positionY >= 38 && positionY <= 47) {
        document.getElementById("solar-system").style.cursor    = "pointer";
        document.getElementById("title").innerHTML              = 'Sistema Solar: Marte';
        planet = 'mars';
    }

    // Mercury
    if (positionX >= 23 && positionX <= 27 && positionY >= 63 && positionY <= 70) {
        document.getElementById("solar-system").style.cursor    = "pointer";
        document.getElementById("title").innerHTML              = 'Sistema Solar: Mercurio';
        planet = 'mercury';
    }

    // Moon
    if (positionX >= 41 && positionX <= 43 && positionY >= 65 && positionY <= 68) {
        document.getElementById("solar-system").style.cursor    = "pointer";
        document.getElementById("title").innerHTML              = 'Sistema Solar: Luna';
        planet = 'moon';
    }

    // Sun
    if (positionX >= 0 && positionX <= 21 && positionY >= 0 && positionY <= 100) {
        document.getElementById("solar-system").style.cursor    = "pointer";
        document.getElementById("title").innerHTML              = 'Sistema Solar: Sol';
        planet = 'sun';
    }

    // Venus
    if (positionX >= 28 && positionX <= 36 && positionY >= 32 && positionY <= 44) {
        document.getElementById("solar-system").style.cursor    = "pointer";
        document.getElementById("title").innerHTML              = 'Sistema Solar: Venus';
        planet = 'venus';
    }
}