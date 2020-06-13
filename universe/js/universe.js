var planet = '';

window.onload = function () {
    // if (Math.floor(Date.now() / 1000) < 1588204800)
    getPosition();
}

function getPosition() {
    document.getElementById('solar-system').addEventListener('mousemove', function (event) {
        positionX = (event.clientX - this.offsetLeft) / this.offsetWidth * 100;
        positionY = (event.clientY - this.offsetLeft) / this.offsetHeight * 100;
        onPlanet(positionX, positionY)
    });

    document.getElementById('solar-system').addEventListener('click', function (event) {
        if (planet != '') {
            window.location.href = 'planet.html?planet=' + planet;
        }
        // console.log('x:'+positionX);
        // console.log('y:'+positionY);
    });
}

function onPlanet(positionX, positionY) {
    planet = '';
    document.getElementById('solar-system').style.cursor = 'initial';
    document.getElementById('title').innerHTML = 'Sistema Solar';

    // Asteroid
    if (positionX >= 44 && positionX <= 54 && positionY >= 6 && positionY <= 13) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Asteroides';
        planet = 'asteroid';
    }
    if (positionX >= 85 && positionX <= 95 && positionY >= 12 && positionY <= 17) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Asteroides';
        planet = 'asteroid';
    }

    // Ceres
    if (positionX >= 49 && positionX <= 52 && positionY >= 78 && positionY <= 83) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Ceres';
        planet = 'ceres';
    }

    // Comet
    if (positionX >= 40 && positionX <= 46 && positionY >= 16 && positionY <= 21) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Cometa';
        planet = 'comet';
    }

    // Earth
    if (positionX >= 36 && positionX <= 42 && positionY >= 54 && positionY <= 65) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Tierra';
        planet = 'earth';
    }

    // Eris
    if (positionX >= 95 && positionX <= 98 && positionY >= 42 && positionY <= 47) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Eris';
        planet = 'eris';
    }

    // Haumea
    if (positionX >= 89 && positionX <= 92 && positionY >= 55 && positionY <= 59) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Haumea';
        planet = 'haumea';
    }

    // Jupiter
    if (positionX >= 51 && positionX <= 67 && positionY >= 46 && positionY <= 72) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Júpiter';
        planet = 'jupiter';
    }

    // Makemake
    if (positionX >= 95 && positionX <= 97 && positionY >= 71 && positionY <= 74.5) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Makemake';
        planet = 'makemake';
    }

    // Mars
    if (positionX >= 43 && positionX <= 48.5 && positionY >= 38 && positionY <= 47) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Marte';
        planet = 'mars';
    }

    // Mercury
    if (positionX >= 23 && positionX <= 27 && positionY >= 63 && positionY <= 70) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Mercurio';
        planet = 'mercury';
    }

    // Moon
    if (positionX >= 41 && positionX <= 43 && positionY >= 65 && positionY <= 68) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Luna';
        planet = 'moon';
    }

    // Neptune
    if (positionX >= 74 && positionX <= 85 && positionY >= 42 && positionY <= 60) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Neptuno';
        planet = 'neptune';
    }

    // Pluto
    if (positionX >= 86 && positionX <= 89.5 && positionY >= 26 && positionY <= 33) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Plutón';
        planet = 'pluto';
    }

    // Saturn
    if (positionX >= 51 && positionX <= 79 && positionY >= 19 && positionY <= 41) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Saturno';
        planet = 'saturn';
    }

    // Sun
    if (positionX >= 0 && positionX <= 21 && positionY >= 0 && positionY <= 100) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Sol';
        planet = 'sun';
    }

    // Uranus
    if (positionX >= 67 && positionX <= 76 && positionY >= 67 && positionY <= 88) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Urano';
        planet = 'uranus';
    }

    // Venus
    if (positionX >= 28 && positionX <= 36 && positionY >= 32 && positionY <= 44) {
        document.getElementById('solar-system').style.cursor = 'pointer';
        document.getElementById('title').innerHTML = 'Sistema Solar: Venus';
        planet = 'venus';
    }
}
