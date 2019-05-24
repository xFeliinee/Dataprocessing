/**
 * Name: Feline Benavides
 * Student number: 11035358
 * This files...
**/

// window.onload = function() {
d3v5.json("HPI_data.json").then(function(data) {
    var map = new Datamap({
        element: document.getElementById('mapje'),
        data: data,
        // Get a full worldmap in green
        projection: 'mercator',
        fills: {
            defaultFill: 'rgba(213,255,116,1.0)'
        },
        // Hover in orange and show land and HPI rank
        geographyConfig: {
            highlightFillColor: '#FF8A28',
            highlightBorderColor: 'rgba(177, 168, 161, 1.0)',
            highlightBorderWidth: 2,
            popupTemplate: function(geography, d) {
                if (d) {
                    return "<b>Land: </b>" + d["Country"] + "<br/>" +
                           "<b>HPI-Rank: </b>" + d["HPIRank"] + "<br/>" +
                           "<b>HPI: </b>" + d["Happy Planet Index"];
                } else {
                    return "<b>Land: </b>" + geography.properties.name
                }
            // HPI moet hier nog uit, want ik wil de map op kleur op basis van HPI
            }
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography, d) {
                if (data[geography.id]) {
                    // console.log(data[geography.id]);
                    barChart(data[geography.id]);
                    // roep hier de barchart aan met data
                } else {
                    console.log("Doe niks");
                }
            });
        }
    });
});

// klik op dat land (of rank dus) moet een tweede plot maken
// tweede plot: bar chart met life expectacy and wellbeing voor dat land

/**
 * Discription
 **/
function barChart(dataset){
    // console.log(dataset);

    // Define height and width of the plot
    var margin = {top: 50, right: 10, bottom: 50, left: 50};
    var w = 600;
    var h = 350;
    var barPadding = 20;
    var barWidth = (w / 3) - barPadding - margin.right;

    // Getting DOM element
    var bars = d3v5.select(".barchart")

    // Set scales for axis
    var yScale = d3v5.scaleLinear()
                    .domain([0, 100])
                    .range([h, 0]);
    var list = ["Average Life Expectancy", /
                "Inequality-adjusted Life Expectancy", "Happy Life Years"]
    var xScale = d3v5.scaleBand()
                        .domain(list)
                        .range([0, w]);

    bars.attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + margin.left + "," + margin.top +
              ")")
        .call(d3v5.axisLeft(yScale));

    bars.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(" + margin.left + "," +
                            (h + margin.top) + ")")
        .call(d3v5.axisBottom(xScale));

    // Set titles to axis
    bars.append("text")
        .attr("x", ((h / 2) + margin.top)*-1)
        .attr("y", margin.left / 3)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Years");

    bars.append("text")
        .attr("x", w / 2 + margin.left)
        .attr("y", h + margin.top + ((4/5) * margin.bottom))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Variables from the Happy Planet Index");

    bars.append("text")
        .attr("x", w / 2 + margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "35px")
        .text("Happy Planet Index data from " + dataset["Country"]);

    // Getting the data for .attr
    data = []
    data.push(dataset["Average Life Expectancy"], dataset["Inequality-adjusted Life Expectancy"], dataset["Happy Life Years"])
    // console.log(data);

    // Getting the bars (deze werkt)
    bars.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return (i * (barWidth + barPadding)) + margin.left + barPadding;
        })
        .attr("y", function(d){
            return yScale(d) + margin.top;
        })
        .attr("height", function(d){
            return h - yScale(d);
        })
        .attr("width", barWidth)
        .attr("fill", "orange")

    // xScale

    // Draw axis
    // Set titles to axis
    // Tooltip (werkt overigens ook niet, misschien vanwege gebruik d3v3 en v5?)
    // Create barchart (update op het moment dat er ergens anders op wordt geklikt)
//     var t=20,a=20,n=30,e=40,d=960-e-a,i=500-t-n
//     s = d3v5.select("body")
//             .append("svg")
//             .attr("width",d+e+a)
//             .attr("height",i+t+n)
//             .append("g")
//             .attr("transform","translate("+e+","+t+")");

// eenmaal deze functie en daarna update functie

};
