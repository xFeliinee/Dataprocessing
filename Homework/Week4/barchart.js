/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file:
* When running don't forget in cmd: python -m http.server 8080
* To watch it: http://localhost:8080
* Thanks to:
* http://learnjsdata.com/read_data.html
**/


// this function does something
d3.json("data.json").then(function(data) {
    barGraph(data);
});


/**
* This function does something
**/
function barGraph(dataset){
    // Define height and width
    var w = 1000;
    var h = 400;
    var barPadding = 1;

    // Create bars
    var bars = d3.select("svg");
    bars.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(h, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function(d) {
            return h - d.Value * 50;
        })
        .attr("height", function(d){
            return d.Value * 50;
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("fill", "#67DA08");


};
