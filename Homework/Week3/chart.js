/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file:
**/

// Vaag huissie van de site
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

// Loading the data, snippet from minor programming
var fileName = "KNMI_data.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
    // When done, save data and draw plot?
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        var data = JSON.parse(txtFile.responseText);
        console.log(Object.keys(data));
    }
}
txtFile.open("GET", "KNMI_data.txt");
txtFile.send();


/**
* Purpose of this function
**/
function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 		// a solution would be:

    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

// Transforming the data (if necessary)

// Plotting a line chart with JavaScript. Do not use any external libraries!
