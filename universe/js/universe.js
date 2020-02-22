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
        // console.log("x:"+positionX);
        // console.log("y:"+positionY);
    });
}

function onPlanet(positionX, positionY)
{
    planet = '';
    document.getElementById("solar-system").style.cursor = "initial";
    document.getElementById("title").innerHTML = 'Sistema Solar';

    // Venus
    if (positionX >= 28 && positionX <= 36 && positionY >= 32 && positionY <= 44) {
        document.getElementById("solar-system").style.cursor = "pointer";
        document.getElementById("title").innerHTML = 'Sistema Solar: Venus';
        planet = 'venus';
    }

    // Earth
    if (positionX >= 36 && positionX <= 42 && positionY >= 54 && positionY <= 65) {
        document.getElementById("solar-system").style.cursor = "pointer";
        document.getElementById("title").innerHTML = 'Sistema Solar: Tierra';
        planet = 'earth';
    }
}