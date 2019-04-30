/*
Name: Feline Benavides
Student number: 11035358
Purpose of this file:
*/

// Loading the data, snippet from minor programming
var fileName = "KNMI_data.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        console.log(JSON.parse(txtFile.responseText));
    }
}
txtFile.open("GET", fileName);
txtFile.send();


const canvas = document.getElementById('my-house');
const ctx = canvas.getContext('2d');
// Set line width
ctx.lineWidth = 10;

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
// Transforming the data (if necessary)

// Plotting a line chart with JavaScript. Do not use any external libraries!
