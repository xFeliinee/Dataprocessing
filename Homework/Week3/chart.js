/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file:
runnen: http://localhost:8080
**/


var canvas = document.getElementById("chart");
var ctx = canvas.getContext("2d");
ctx.moveTo(0, 400);
ctx.lineTo(600, 0);
ctx.stroke();
ctx.font = "20px Arial";
ctx.fillText("Temperatuurtjes", 10, 50);


/**
* Purpose of this function: geen idee
**/
function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
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


// // Vaag huissie van de site
// const canvas = document.getElementById('chart');
// const ctx = canvas.getContext('2d');
// // Set line width
// ctx.lineWidth = 5;
//
// // yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
// // xScale = (canvas.width - rowSize) / sections;
// // Wall
// ctx.strokeRect(75, 140, 150, 110);
//
// // Door
// ctx.fillRect(130, 190, 40, 60);

// // Roof
// ctx.moveTo(50, 140);
// ctx.lineTo(150, 60);
// ctx.lineTo(250, 140);
// ctx.closePath();
// ctx.stroke();

// Loading the data, snippet from minor programming
var data_x = []
var data_y = []
var fileName = "KNMI_data.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4 && txtFile.status == 200) {

        var data = JSON.parse(txtFile.responseText);
        for (key in data){
            data_x.push(key);
            data_y.push(data[key]["T1"]*0.1);
            // *0.1 omdat de data vanaf KNMI site zo gegeven werd
        };

        // Transformation y-axis
        domain_y = [Math.min(...data_y), Math.max(...data_y)];
        range_y = [400, 0];
        transformation_y = createTransform(domain_y, range_y);
        var arrayLength_y = data_y.length;
        var pixels_y = [];
        for (var i = 0; i < arrayLength_y; i++){
            pixels_y.push(transformation_y(data_y[i]));
        };

        // Convert time into milliseconds from 1970
        var dates = [];
        var arrayLength_x = data_x.length;
        for (var j = 0; j < arrayLength_x; j++){
            var dt = new Date(data_x[j]);
            dates.push(dt.getTime());
        };

        // Transformation x-axis
        domain_x = [Math.min(...dates), Math.max(...dates)];
        range_x = [0, 600];
        transformation_x = createTransform(domain_x, range_x);
        var pixels_x = [];
        for (var k = 0; k < arrayLength_x; k++){
            pixels_x.push(transformation_x(data_x[k]));
        };
        };

        // Making axis labels
        var xAxis = ["01-01-2019", "11-01-2019", "21-01-2019", "31-01-2019",
                     "10-02-2019", "20-02-2019", "02-03-2019", "12-03-2019",
                     "22-03-2019", "01-04-2019"];
        var yAxis = ["-10", "-8", "-6", "-4", "-2", "0", "2", "4", "6", "8",
                     "10"];

        // print the axis (missing)

    }

txtFile.open("GET", fileName);
txtFile.send();
