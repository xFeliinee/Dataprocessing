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
    // Ik kan hier alle data plotten van dat land
    console.log(dataset);
    console.log(dataset["Average Life Expectancy"]);
    console.log(dataset["Happy Planet Index"]);
    console.log(dataset["Population"]);

    // Define height and width of the plot
    var margin = {top: 100, right: 0, bottom: 50, left: 50};
    var w = 1150;
    var h = 350;
    var barPadding = 3;
    var barWidth = (w / dataset.length) - barPadding;

    // Getting DOM element
    var bars = d3v5.select(".barchart")

    // yScale
    var yScale = d3v5.scaleLinear()
                    .domain([0, 100])
                    // .range([h + margin.top, 0])
                    .range([h, 0]);
    var xScale = d3v5.scaleLinear()
                        .domain([0,100])
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

    console.log("ikkomhier");

    // x Axis werken niet?
    // svg.append("g")
    //     .attr("class", "xAxis")
    //     .attr("transform", "translate(" + margin.left + "," +
    //                         (h + margin.top) + ")")
    //     .call(d3v5.axisBottom(xScale));

    console.log("ik kom ook hier");
    console.log(yScale(50));
    console.log(xScale(50));

    // bars.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr("x", 250)
    //     .attr("y", 250)
    //     .attr("height", 50)
    //     .attr("width", 50);

    // xScale

    // Draw axis
    // Set titles to axis
    // Tooltip (werkt overigens ook niet, misschien vanwege gebruik d3v3 en v5?)
    // Create barchart (update op het moment dat er ergens anders op wordt geklikt)
    var t=20,a=20,n=30,e=40,d=960-e-a,i=500-t-n
    s = d3v5.select("body")
            .append("svg")
            .attr("width",d+e+a)
            .attr("height",i+t+n)
            .append("g")
            .attr("transform","translate("+e+","+t+")");
};
