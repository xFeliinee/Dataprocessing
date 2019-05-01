/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file: this file draws a graph of data given by a .csv file
* When running don't forget in cmd: python -m http.server 8080
* To watch it: http://localhost:8080
*
* Thanks to http://www.tutorialspark.com/html5/HTML5_Canvas_Graphs_Charts.php
* for xScale formula
*
* Small comment: sorry for not writing functions and using a lot of magic
* number. Started too late and had too little time to finalize it perfectly
* unfortunately.
**/


/**
* This function returns a formula to transform your data coordinates
* into screen coordinates. Input for domain: [domain_min, domain_max]. Input for
* range: [range_min, range_max].
**/
function createTransform(domain, range){
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
            // *0.1 to correct the data
            data_y.push(data[key]["T1"]*0.1);
        };
        drawGraph(data_x, data_y);
        };
};
txtFile.open("GET", fileName);
txtFile.send();

/**
* This function draws a graph for the given data and prints axis labels
**/
function drawGraph(data_x, data_y){

    // Variables of the graph
    var start_x = 50;
    var start_y = 500;
    var end_x = 700;
    var end_y = 50;

    // Transformation y-axis, min/max to fit yAxis
    var domain_y;
    domain_y = [-10, 10];
    range_y = [start_y, end_y];
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
    var range_x = [start_x, start_y];
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

    // Header and axis titles
    ctx.font = "20px Verdana";
    ctx.fillStyle = "#67DA08";
    ctx.fillText("Temperature in the Bilt from January to April 2019", 100, 30);

    ctx.font = "15px Verdana";
    ctx.fillText("Dates", 320, 540);

    ctx.save();
    ctx.translate(15, 350);
    ctx.rotate(-(Math.PI/2));
    ctx.fillText("Temperature (Celsius)", 15, 0);
    ctx.restore();

    // Draw border around graph
    ctx.beginPath();
    ctx.strokeRect(start_x, start_y, (end_x - start_x), (end_y - start_y));
    ctx.stroke();

    // Y labels and y bars
    for (l = 0; l < yAxis.length; l++){
        ctx.beginPath();
        ctx.font = "15px Verdana";
        ctx.fillStyle = "#000000";
        canvas.textAlign = "right";
        ctx.fillText(yAxis[l], 20, transformation_y(yAxis[l]));
        ctx.moveTo(start_x, transformation_y(yAxis[l]));
        ctx.lineTo(end_x, transformation_y(yAxis[l]));
        ctx.strokeStyle = "#D3D4D1";
        ctx.stroke();
    };

    // x labels
    for (m = 0; m < xAxis.length; m++){
        ctx.beginPath();
        ctx.font = "15px Verdana"
        ctx.fillStyle = "#000000"
        ctx.fillText(xAxis[m], 60 + m * ((end_x - start_x)/xAxis.length), 520);
        ctx.stroke();
    };

    // This functions draws a line between all screen coordinates of data
    var xScale = (canvas.width - start_x) / arrayLength_x;
    function plotData(dataSet) {
        ctx.beginPath();
        ctx.moveTo(start_x, dataSet[0]);
        for (n= 1; n < dataSet.length; n++) {
            ctx.lineTo(start_x + n * xScale, dataSet[n]);
        };
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    };
    plotData(pixels_y);
    console.log("hallo");
};
