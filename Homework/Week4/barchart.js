/**
* Name: Feline Benavides
* Student number: 11035358
* This file imports data from a .json file and creates a barchart from it
**/


// Getting the data and returning a barchart of it
d3.json("data.json").then(function(data) {
    barGraph(data);
});


/**
* This function generates a barchart for given dataset.
**/
function barGraph(dataset){

    // Define height and width
    var margin = {top: 100, right: 0, bottom: 50, left: 50};
    var w = 1150;
    var h = 350;
    var barPadding = 3;
    var barWidth = (w / dataset.length) - barPadding;

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
        .attr("transform", "translate(" + margin.left + "," +
                            (h + margin.top) + ")")
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
        .attr("x", w / 2 + margin.left)
        .attr("y", h + margin.top + ((4/5) * margin.bottom))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Countries");
    bars.append("text")
        .attr("x", w / 2 + margin.left)
        .attr("y", margin.top / 3)
        .attr("text-anchor", "middle")
        .style("font-size", "35px")
        .text("Primary energy supply of countries all over the world in 2015");

    // Getting the tip
    var tip = d3.tip()
                .attr("class", "d3Tip")
                .offset([-10, 0])
                .html(function(d) {
                    return "<b>Frequency:</b> <span style='color:orange'>" +
                            d.Value + "</span>";
                 });
    bars.call(tip);

    // Creating bars and adding tooltip and hovering color
    bars.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(h, i) {
            return i * (barWidth + barPadding) + margin.left + barPadding;
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
