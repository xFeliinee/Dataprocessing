/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file: this file draws a graph of data given by a .csv file
* When running don't forget in cmd: python -m http.server 8080
* To watch it: http://localhost:8080
*
* Thanks to http://www.tutorialspark.com/html5/HTML5_Canvas_Graphs_Charts.php
* for xScale formula
**/


/**
* This function returns a formula to transform your data coordinates
* into screen coordinates.
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
            // *0.1 omdat de data vanaf KNMI site zo gegeven werd
            data_y.push(data[key]["T1"]*0.1);
        };

        // Transformation y-axis, min/max to fit yAxis
        var domain_y;
        domain_y = [-10, 10];
        range_y = [500, 50];
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
        var domain_x = [Math.min(...dates), Math.max(...dates)];
        var range_x = [50, 700];
        var transformation_x = createTransform(domain_x, range_x);
        var pixels_x = [];
        for (var k = 0; k < arrayLength_x; k++){
            pixels_x.push(transformation_x(dates[k]));
        };

        // Making axis labels
        var xAxis = ["1 Jan", "11 Jan", "21 Jan", "31 Jan", "10 Feb", "20 Feb",
                     "2 May", "12 May", "22 May", "1 Apr"];
        var yAxis = ["-10", "-8", "-6", "-4", "-2", "0", "2", "4", "6", "8",
                     "10"];

        // Create a canvas
        var canvas = document.getElementById("chart");
        var ctx = canvas.getContext("2d");

        // Draw the axis, variables are made to use more often
        var start_x = 50;
        var start_y = 500;
        var end_x = 700;
        var end_y = 50;
        var columnSize = 50;
        var rowSize = 50;
        var margin = 10;

        // Header and axis titles
        ctx.font = "20px Verdana";
        ctx.fillStyle = "#67DA08";
        ctx.fillText("Temperature in the Bilt from January to April 2019", 100, 30);

        ctx.font = "15px Verdana";
        ctx.fillStyle = "#67DA08";
        ctx.fillText("Dates", 320, 540);

        ctx.save();
        ctx.translate(15, 350);
        ctx.rotate(-(Math.PI/2));
        ctx.font = "15px Verdana";
        ctx.fillStyle = "#67DA08";
        ctx.fillText("Temperature (Celsius)", 15, 0);
        ctx.restore();

        // Draw border around graph
        ctx.beginPath();
        ctx.strokeRect(50, 500, 650, -450);
        ctx.stroke();

        // y labels and y bars
        for (i = 0; i < yAxis.length; i++){
            ctx.beginPath();
            ctx.font = "15px Verdana";
            ctx.fillStyle = "#000000";
            canvas.textAlign = "right";
            ctx.fillText(yAxis[i], 20, transformation_y(yAxis[i]));
            ctx.moveTo(start_x, transformation_y(yAxis[i]));
            ctx.lineTo(end_x, transformation_y(yAxis[i]));
            ctx.strokeStyle = "#D3D4D1";
            ctx.stroke();
        };

        // x labels
        for (i = 0; i < xAxis.length; i++){
            ctx.beginPath();
            ctx.font = "15px Verdana"
            ctx.fillStyle = "#000000"
            ctx.fillText(xAxis[i], 60 + i * ((end_x - start_x) / xAxis.length), 520);
            ctx.stroke();
        };

        // this functions draws a line between all screen coordinates of data
        var xScale = (canvas.width - rowSize) / arrayLength_x;
        function plotData(dataSet) {
            ctx.beginPath();
            ctx.moveTo(start_x, dataSet[0]);
            for (l = 1; l < dataSet.length; l++) {
                ctx.lineTo(start_x + l * xScale, dataSet[l]);
            };
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        };
        plotData(pixels_y);
        };
};
txtFile.open("GET", fileName);
txtFile.send();
