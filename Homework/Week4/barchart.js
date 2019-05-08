/**
* Name: Feline Benavides
* Student number: 11035358
* Purpose of this file:
* When running don't forget in cmd: python -m http.server 8080
* To watch it: http://localhost:8080
* Thanks to:
* http://learnjsdata.com/read_data.html
d3v5 axis syntax: https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
again: http://bl.ocks.org/d3noob/10633421
more syntax: https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal
https://github.com/d3/d3-axis


voor interactieve: http://bl.ocks.org/Caged/6476579
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
    var margin = {top: 100, right: 0, bottom: 50, left: 50}
    var w = 1150;
    var h = 350;
    var barPadding = 5;
    var barWidth = (w / dataset.length) - barPadding


    // Getting DOM element for chart
    var bars = d3.select("svg");


    // Set scales for axis
    var yScale = d3.scaleLinear()
                    .domain([0, 100])
                    // .range([h + margin.top, 0])
                    .range([h, 0]);
    xList = [];
    for (key in dataset) {
        xList.push(dataset[key]["LOCATION"]);
    }
    var xOrdinal = d3.scaleBand()
                      .domain(xList)
                      .range([0, w]);


    // Draw the axis
    bars.attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale));
    bars.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(" + margin.left + "," + (h + margin.top) + ")")
        .call(d3.axisBottom(xOrdinal));


    // Set titles to axis
    bars.append("text")
        .attr("x", ((h / 2) + margin.top)*-1)
        .attr("y", margin.left / 3)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("% of primary energy supply");
    bars.append("text")
        .attr("x", w / 2)
        .attr("y", h + margin.top + ((4/5) * margin.bottom))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Countries");
    bars.append("text")
        .attr("x", w / 2)
        .attr("y", margin.top / 3)
        .attr("text-anchor", "middle")
        .style("font-size", "35px")
        .text("Primary energy supply of countries all over the world");


    // Getting the tip
    var tip = d3.tip()
                .attr("class", "d3Tip")
                .offset([-10, 0])
                .html(function(d) {
                    return "<b>Frequency:</b> <span style='color:orange'>" + d.Value + "</span>";
                 });
    bars.call(tip);


    // Creating bars
    bars.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(h, i) {
            return i * (barWidth + barPadding) + margin.left;
        })
        .attr("y", function(d) {
            return yScale(d.Value) + margin.top
        })
        .attr("height", function(d){
            return h - yScale(d.Value)
        })
        .attr("width", barWidth)
        .attr("fill", "#67DA08")
        .on("mouseover", tip.show)
        .on("mouseenter", function(d){
            d3.select(this)
            .attr("fill", "orange")
        })
        .on("mouseleave", tip.hide)
        .on("mouseout", function(d){
            d3.select(this)
            .attr("fill", "#67DA08")
        });
};
