var position = 0;

window.onload = function()
{
    getPosition();
    openPlanet();
}

function getPosition()
{
    document.getElementById('solar-system').addEventListener("click", function(event){
        position = (event.clientX-this.offsetLeft) / this.offsetWidth * 100;
        console.log(position);
    });
}
