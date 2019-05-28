/**
 * Name: Feline Benavides
 * Student number: 11035358
 * This files creates a clickable world map. If there is data from the land that
 * is clicked on, a barchart will be made and updated. The map is from
 * https://datamaps.github.io/ (see also README)
**/


d3v5.json("HPI_data.json").then(function(data) {
    // making averages for barchart
    var sumExpectancy = 0;
    var sumHappyYears = 0;
    var sumInequality = 0;

    Object.keys(data).forEach(function(d) {
        sumExpectancy += data[d]["Average Life Expectancy"]
        sumInequality += data[d]["Inequality-adjusted Life Expectancy"]
        sumHappyYears += data[d]["Happy Life Years"]
    });

    var length = Object.keys(data).length;
    var averages = [];
    averages.push((Math.round((sumExpectancy / length) * 10 ) / 10),
                  (Math.round((sumInequality / length) * 10 ) / 10),
                  (Math.round((sumHappyYears / length) * 10 ) / 10));

    // Getting the maximum and minimum of the Happy Planet Index
    var fillKey = "fillKey";
    var max = -Infinity;
    var min = Infinity;

    Object.keys(data).forEach(function(d) {
        if (data[d]["Happy Planet Index"] > max) {
            max = data[d]["Happy Planet Index"]
        }
        if (data[d]["Happy Planet Index"] < min) {
            min = data[d]["Happy Planet Index"]
        }
    });

    var colorRange = max - min;

    // Making a colorscale based on the Happy Planet Index
    var colorScale = d3v5.scaleThreshold()
                        .domain([(1/3 * colorRange + min),
                                 (2/3 * colorRange + min), colorRange + min])
                        .range(["Low", "Medium", "High"]);

    // Add the color to the .json file
    Object.keys(data).forEach(function(d) {
        var value = colorScale(data[d]["Happy Planet Index"])
        data[d][fillKey] = value;
    });

    // Making a map
    var map = new Datamap({
        element: document.getElementById('map'),
        data: data,
        projection: "mercator",
        fills: {
            High: "#31a354",
            Medium: "#addd8e",
            Low: "#f7fcb9",
            defaultFill: "#E4DBE4"
        },
        geographyConfig: {
            highlightFillColor: "orange",
            highlightBorderColor: "rgba(0, 0, 0, 0.4)",
            highlightBorderWidth: 2,
            popupTemplate: function(geography, d) {
                // If the country exist in the data give ranking
                if (d) {
                    return ["<div class='hoverinfo'><b>Country: </b>",
                           d["Country"], "</br><b>Happy Planet Index-Rank: ",
                           "</b>", d["HPIRank"], "</br><b>Happy Planet ",
                           "Index-value: </b>", d["Happy Planet Index"],
                           "</div>"].join('');
                } else {
                    return ["<div class='hoverinfo'><b>Country: </b>",
                            geography.properties.name, "</br><i>No data",
                            " available from the Happy Planet Index</i>",
                            "</div>"].join('');
                }
            }
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography, d) {
                // Check for data
                if (data[geography.id]) {
                    // Make a color library
                    if (data[geography.id][fillKey] == "Low") {
                        var color = "#f7fcb9";
                    } else if (data[geography.id][fillKey] == "Medium"){
                        var color = "#addd8e";
                    } else {
                        var color = "#31a354";
                    };
                    // Check for a barchart and update it
                    if (document.getElementById("barchart")) {
                        updateBarchart(data[geography.id], averages, color)
                    }
                };
            })
        }
    });
    // Draw a legend for this map
    map.legend({
        legendTitle : "Range of Happy Planet Index ",
        defaultFillName: "No data",
    })
    // Start the page with a barchart about the Netherlands
    barChart(data["NLD"], averages, "#31a354");
});


/**
 * This functies makes the first barchart with data from the land that is
 * clicked on, if there is data from the Happy Planet Index.
 **/
function barChart(dataset, averages, color) {
    // Append text about the barchart
    d3v5.select("body")
        .append("div")
        .attr("id", "barText")
        .html(function(d) {
          return ["This barchart shows various variables of the Happy Planet ",
                  "Index in years. Inequality-adjusted Life Expectancy is ",
                  "</br>", "adjusted to inequality of that land. If you hover ",
                  "over the bar, you can see the percentage of inequality. In ",
                  "the hover", "</br>", " you can also see the exact number ",
                  "of years of that bar and the average of that ",
                  "variable of all countries with available data."].join('');
        });

    // Define height and width of the plot
    var margin = {top: 50, right: 10, bottom: 50, left: 50};
    var w = 600;
    var h = 350;
    var barPadding = 30;
    var barWidth = (w / 3) - barPadding - margin.right;

    // Getting DOM element
    var bars = d3v5.select("body")
                    .append("svg")
                    .attr("id", "barchart");

    // Set scales for axis
    var yScale = d3v5.scaleLinear()
                    .domain([0, 100])
                    .range([h, 0]);

    var list = ["Average Life Expectancy",
                "Inequality-adjusted Life Expectancy", "Happy Life Years"];

    var xScale = d3v5.scaleBand()
                        .domain(list)
                        .range([0, w]);

    // Getting the axis
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
        .attr("id", "title")
        .attr("x", w / 2 + margin.left)
        .attr("y", h + margin.top + ((4/5) * margin.bottom))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Data from " + dataset["Country"]);

    bars.append("text")
        .attr("x", w / 2 + margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "35px")
        .text("Variables from the Happy Planet Index");

    // Getting the data needed for the bars
    data = [];
    data.push(dataset["Average Life Expectancy"],
              dataset["Inequality-adjusted Life Expectancy"],
              dataset["Happy Life Years"]);

    // Getting the tip
    var tip = d3v5.tip()
              .attr("id", "d3Tip")
              .offset([-10, 0])
              .html(function(d, i) {
                  return "Exact number: <span style='color:orange'>" + d +
                         "</span><br/>Average: " + "<span style='color:orange'>"
                         + averages[i] + "</span></br>Inequality: " +
                         "<span style='color:orange'>" +
                          dataset["Inequality of Outcomes"] + "</span>";
               });
    bars.call(tip);

    // Getting the bars
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
        .attr("stroke", "#E4DBE4")
        .attr("fill", color)
        .on("mouseover", tip.show)
        .on("mouseenter", function(d){
            d3v5.select(this)
            .attr("fill", "orange")
        })
        .on("mouseleave", tip.hide)
        .on("mouseout", function(d){
            d3v5.select(this)
                .attr("fill", color)
        });
};


/**
 * This function updates the initial barChart with new data from the land
 * there is clicked on, if there is data from the Happy Planet Index.
 **/
function updateBarchart(dataset, averages, color){
    // Define height and width of the plot
    var margin = {top: 50, right: 10, bottom: 50, left: 50};
    var w = 600;
    var h = 350;
    var barPadding = 30;
    var barWidth = (w / 3) - barPadding - margin.right;

    // Set scales for axis
    var yScale = d3v5.scaleLinear()
                    .domain([0, 100])
                    .range([h, 0]);

    // Getting the data needed for the bars
    data = [];
    data.push(dataset["Average Life Expectancy"],
              dataset["Inequality-adjusted Life Expectancy"],
              dataset["Happy Life Years"]);

    // Delete all data that needs to be changed
    var deleteTitle = d3v5.select("#title")
                            .remove()
                            .exit();

    // Select barchart to add new data
    var update = d3v5.select("#barchart")

    // Add a new title
    update.append("text")
            .attr("id", "title")
            .attr("x", w / 2 + margin.left)
            .attr("y", h + margin.top + ((4/5) * margin.bottom))
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Data from " + dataset["Country"]);

    // Select bars to append new data
    var newBars = update.selectAll("rect")
                            .data(data)

    // Add a new tip
    var tip = d3v5.tip()
              .attr("id", "d3Tip")
              .offset([-10, 0])
              .html(function(d, i) {
                  return "Exact number: <span style='color:orange'>" + d +
                         "</span><br/>Average: " + "<span style='color:orange'>"
                         + averages[i] + "</span></br>Inequality: " +
                         "<span style='color:orange'>" +
                          dataset["Inequality of Outcomes"] + "</span>";
               });
    newBars.call(tip);

    // Add new bars
    newBars.attr("class", "update")
            .enter()
            .append("rect")
            .attr("class", "enter")
            .attr("x", function(d, i) {
                return (i * (barWidth + barPadding)) +
                        margin.left + barPadding;
            })
            .attr("width", barWidth)
            .attr("stroke", "#E4DBE4")
            .merge(newBars)
                .attr("y", function(d){
                        return yScale(d) + margin.top;
                    })
                .attr("height", function(d){
                        return h - yScale(d);
                    })
                .attr("fill", color)
                .on("mouseover", tip.show)
                .on("mouseenter", function(d, i) {
                    d3v5.select(this)
                    .attr("fill", "orange")
                })
                .on("mouseleave", tip.hide)
                .on("mouseout", function(d, i) {
                    d3v5.select(this)
                        .attr("fill", color)
                });

    newBars.exit()
            .remove();

}
