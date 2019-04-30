/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file:
**/

// Vaag huissie van de site
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
// Set line width
ctx.lineWidth = 5;

yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
xScale = (canvas.width - rowSize) / sections;
// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();

// Loading the data, snippet from minor programming
var fileName = "KNMI_data.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
    // When done, save data and draw plot?
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        var data = JSON.parse(txtFile.responseText);
        console.log(Object.keys(data));
        // hier bijvoorbeeld DrawPlot();
    }
}
txtFile.open("GET", fileName);
txtFile.send();
