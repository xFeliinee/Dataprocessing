/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file:
runnen: http://localhost:8080
**/


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
        var domain_y;
        domain_y = [Math.min(...data_y), Math.max(...data_y)];
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
        domain_x = [Math.min(...dates), Math.max(...dates)];
        range_x = [50, 700];
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

        // sections is arrayLength_x of arrayLength_y
        // val min is domain_x[0], domain_y[0]
        // val max is domain_y[1], domain_y[1]
         var stepSize_x = 10;
         var stepSize_y = 11;
         var columnSize = 50;
         var rowSize = 50;
         var margin = 10;

        // print the axis (missing)

        // Make a canvas and title
        var canvas = document.getElementById("chart");
        var ctx = canvas.getContext("2d");
        ctx.font = "20px Verdana"
        ctx.fillStyle = "#D5FF74"
        ctx.fillText("Temperature in the Bilt from January to April 2019", columnSize, rowSize - margin);

        yScale = (canvas.height - columnSize - margin) / (domain_y[1] - domain_y[0])
        xScale = (canvas.width - rowSize) / arrayLength_x;

        // Draw the axis, variables are made to use more often
        start_x = 50;
        start_y = 500;
        end_x = 700;
        end_y = 50;
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(end_x, start_y); //x
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x, end_y); //y
        ctx.stroke();

        // ctx.strokeStyle="#009933"; // color of grid lines
        // ctx.beginPath();

        // // loopen over je y values
        // for (i = 0; i < arrayLength_y; i++){
        //     ctx.moveTo(x?, pixels_y[i]);
        //     ctx.lineTo(x?, pixels_y)
        // }

        // for (i=1;i<=xAxis.length;i++) {
		// var x = i * xScale;
		// ctx.fillText(xAxis[i], x, 525);
		// ctx.moveTo(x, 525);
		// ctx.lineTo(x, 525);
        // };
        //
        // var count =  0;
        // for (scale=domain_y[1];scale>=domain_y[0];scale = scale - 11) {
        // var y = columnSize + (yScale * count * 11);
        // ctx.fillText(scale, margin,y + margin);
        // ctx.moveTo(rowSize,y)
        // ctx.lineTo(canvas.width,y)
        // count++;
        // }
        // ctx.stroke();
        // ctx.translate(rowSize,canvas.height + domain_y[1] * yScale);
	    // ctx.scale(1,-1 * yScale);

        plotData(pixels_y);

        function plotData(dataSet) {
            ctx.moveTo(start_x, dataSet[0]);
            for (l = 1; l < dataSet.length; l++) {
                ctx.lineTo(start_x + l * xScale, dataSet[l]);
            };
            ctx.stroke();
        };
}

txtFile.open("GET", fileName);
txtFile.send();
