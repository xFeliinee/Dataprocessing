/**
* Name: Feline Benavides
* Student number: 11035358
* This file does something...
**/

// alles moet nu in functions

window.onload = function() {
    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }


    // Getting die aapies
    var teensInViolentArea = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB11/all?startTime=2010&endTime=2017"
    var teenPregnancies = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB46/all?startTime=1960&endTime=2017"
    var GDP = "https://stats.oecd.org/SDMX-JSON/data/SNA_TABLE1/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+EU28+EU15+OECDE+OECD+OTF+NMEC+ARG+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+ROU+RUS+SAU+ZAF+FRME+DEW.B1_GE.HCPC/all?startTime=2012&endTime=2018&dimensionAtObservation=allDimensions"

    // snippet from minor
    var requests = [d3.json(teensInViolentArea), d3.json(teenPregnancies), d3.json(GDP)];

    Promise.all(requests).then(function(response) {
        var cleanTeenViolent = transformResponse(response[0])
        var cleanTeenPregnancies = transformResponse(response[1])
        var cleanGDP = transformResponse2(response[2])
        console.log(cleanTeenPregnancies);
        scatterPlot(cleanGDP, cleanTeenViolent, cleanTeenPregnancies)
    }).catch(function(e){
        throw(e);
    });

    /*
    * This function does something
    */
    function scatterPlot(xValues, yValues, zValues){
        // Define height and width
        var margin = {top: 50, right: 200, bottom: 50, left: 50};
        let w = 1000;
        let h = 700;
        let plotWidth = 1000 - margin.left - margin.right;
        let plotHeight = 700 - margin.bottom - margin.top;

        // Getting DOM element for chart
        var scatter = d3.select("svg")

        let y = 2012;
        ykeys = Object.keys(yValues);
        let ymin = xmin = zmin = Infinity;
        let ymax = xmax = zmax = -Infinity;
        for (var i = 0; i < ykeys.length; i++) {
            for (var j = 0; j < yValues[ykeys[i]].length; j++) {
                try {
                  xValues[ykeys[i]][j].Datapoint;
                }
                catch(error) {
                  continue;
                }
                if (yValues[ykeys[i]][j].Datapoint == false || xValues[ykeys[i]][j].Datapoint == false) {
                    continue;
                } else {
                    if (yValues[ykeys[i]][j].Datapoint > ymax) {
                        ymax = yValues[ykeys[i]][j].Datapoint;
                    }
                    if (yValues[ykeys[i]][j].Datapoint < ymin) {
                        ymin = yValues[ykeys[i]][j].Datapoint;
                    }
                    if (xValues[ykeys[i]][j].Datapoint > xmax) {
                        xmax = xValues[ykeys[i]][j].Datapoint
                    }
                    if (xValues[ykeys[i]][j].Datapoint < xmin) {
                        xmin = xValues[ykeys[i]][j].Datapoint
                    }
                }
            }
        };


        // making an ordinal scale
        for (var i = 0; i < ykeys.length; i++) {
            for (var j = 0; j < yValues[ykeys[i]].length; j++) {
                try {
                  zValues[ykeys[i]][j].Datapoint;
                }
                catch(error) {
                  continue;
                }
                if (zValues[ykeys[i]][j].Datapoint == false) {
                    continue;
                } else {
                    if (zValues[ykeys[i]][j].Datapoint > zmax) {
                        zmax = zValues[ykeys[i]][j].Datapoint;
                    }
                    if (zValues[ykeys[i]][j].Datapoint < zmin) {
                        zmin = zValues[ykeys[i]][j].Datapoint;
                    }
                }
            }
        };
        var zScale = d3.scaleOrdinal()
                        .domain([zmin, zmax])
                        .range(["#ffeda0", "#feb24c", "#f03b20"]);


        // Set scales for axis
        var yScale = d3.scaleLinear()
                        .domain([ymin, ymax])
                        .range([plotHeight, 0]);

        var xScale = d3.scaleLinear()
                        .domain([xmin, xmax])
                        .range([0, plotWidth]);

        scatter.attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("class", "yAxis")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(d3.axisLeft(yScale));

        scatter.append("g")
                .attr("class", "xAxis")
                .attr("transform", "translate(" + margin.left + "," +
                                    (plotHeight + margin.top) + ")")
                .call(d3.axisBottom(xScale));


        // Set titles to axis
        scatter.append("text")
                .attr("x", ((plotHeight / 2) + margin.top)*-1)
                .attr("y", margin.left / 3)
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .text("Number of teens in a violent area");

        scatter.append("text")
                .attr("x", plotWidth / 2 + margin.left)
                .attr("y", plotHeight + margin.top + ((4/5) * margin.bottom))
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .text("GDP");

        scatter.append("text")
                .attr("x", plotWidth / 2 + margin.left)
                .attr("y", margin.top / 3)
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .text("Grote titel");


        // Getting the tip
        var tip = d3.tip()
                    .attr("class", "d3Tip")
                    .offset([-10, 0])
                    .html(function(d) {
                        return "<b>Country:</b> <span style='color:orange'>" +
                                yValues[d][0].Country + "</span>";
                     });
        scatter.call(tip);


        // Creating dots
        scatter.selectAll("circle")
                .data(ykeys)
                .enter()
                .append("circle")
                .attr("cx", function(d, i){
                    return i*50
                }) //function(d) {
                //     if (xValues[d]) {
                //         xValues[d].forEach(function(e) {
                //             if (e.Year == y){
                //                 // console.log((xScale(e.Datapoint)) + margin.left);
                //                 return (xScale(e.Datapoint)) + margin.left
                //             }
                //         })
                //     }
                // })
                .attr("cy", function(d, i){
                    return i*50
                })
                //function(d) {
                //     if (yValues[d]) {
                //         yValues[d].forEach(function(e) {
                //             if (e.Time == y) {
                //                 // console.log((yScale(e.Datapoint)) + margin.top);
                //                 return h - (yScale(e.Datapoint)) + margin.top
                //             }
                //         })
                //     }
                // })
                .attr("r", 5)
                .attr("fill", function(d) {
                    return zScale(d)
                })
                .on("mouseover", tip.show)
                .on("mouseenter", function(d){
                    d3.select(this)
                    .attr("fill", "black")
                })
                .on("mouseleave", tip.hide)
                .on("mouseout", function(d){
                    d3.select(this)
                        .attr("fill", function(d) {
                            return zScale(d)
                        })
                });

        // scatter.selectAll("legend")
        //         .data(1)
        //         .enter()
        //         .append("legend")
        //         .attr("x", h - margin.right)
        //         .attr("y", margin.top)
        //         .attr("height", plotHeight)
        //         .attr("width", margin.right - 100)
        //         .attr("stroke", "black")
        //         .attr("fill", "white")
        //         .attr("rx", 10)
        //         .attr("ry", 10)
        //         .append("text")
        //                 .text("Legandary");
    };

  console.log('Kakzooi')
};


/********
 * Transforms response of OECD request for teen pregancy rates.
 * https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB46/all?startTime=1960&endTime=2017
 *
 * Also used for transform of response of OECD request for children living in area with high rates of crime and violence.
 * https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB11/all?startTime=2010&endTime=2017
 **/
function transformResponse(data){

    // Save data
    let originalData = data;

    // access data property of the response
    let dataHere = data.dataSets[0].series;

    // access variables in the response and save length for later
    let series = data.structure.dimensions.series;
    let seriesLength = series.length;

    // set up array of variables and array of lengths
    let varArray = [];
    let lenArray = [];

    series.forEach(function(serie){
        varArray.push(serie);
        lenArray.push(serie.values.length);
    });

    // get the time periods in the dataset
    let observation = data.structure.dimensions.observation[0];

    // add time periods to the variables, but since it's not included in the
    // 0:0:0 format it's not included in the array of lengths
    varArray.push(observation);

    // create array with all possible combinations of the 0:0:0 format
    let strings = Object.keys(dataHere);

    // set up output object, an object with each country being a key and an array
    // as value
    let dataObject = {};

    // for each string that we created
    strings.forEach(function(string){
        // for each observation and its index
        observation.values.forEach(function(obs, index){
            let data = dataHere[string].observations[index];
            if (data != undefined){

                // set up temporary object
                let tempObj = {};

                let tempString = string.split(":").slice(0, -1);
                tempString.forEach(function(s, indexi){
                    tempObj[varArray[indexi].name] = varArray[indexi].values[s].name;
                });

                // every datapoint has a time and ofcourse a datapoint
                tempObj["Time"] = obs.name;
                tempObj["Datapoint"] = data[0];
                tempObj["Indicator"] = originalData.structure.dimensions.series[1].values[0].name;

                // Add to total object
                if (dataObject[tempObj["Country"]] == undefined){
                  dataObject[tempObj["Country"]] = [tempObj];
                } else {
                  dataObject[tempObj["Country"]].push(tempObj);
                };
            }
        });
    });

    // return the finished product!
    return dataObject;
};


/********
 * Transforms response of OECD request for GDP.
 * https://stats.oecd.org/SDMX-JSON/data/SNA_TABLE1/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+EU28+EU15+OECDE+OECD+OTF+NMEC+ARG+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+ROU+RUS+SAU+ZAF+FRME+DEW.B1_GE.HCPC/all?startTime=2012&endTime=2018&dimensionAtObservation=allDimensions
 **/
function transformResponse2(data){

    // Save data
    let originalData = data;

    // access data
    let dataHere = data.dataSets[0].observations;

    // access variables in the response and save length for later
    let series = data.structure.dimensions.observation;
    let seriesLength = series.length;

    // get the time periods in the dataset
    let observation = data.structure.dimensions.observation[0];

    // set up array of variables and array of lengths
    let varArray = [];
    let lenArray = [];

    series.forEach(function(serie){
        varArray.push(serie);
        lenArray.push(serie.values.length);
    });

    // add time periods to the variables, but since it's not included in the
    // 0:0:0 format it's not included in the array of lengths
    varArray.push(observation);

    // create array with all possible combinations of the 0:0:0 format
    let strings = Object.keys(dataHere);

    // set up output array, an array of objects, each containing a single datapoint
    // and the descriptors for that datapoint
    let dataObject = {};

    // for each string that we created
    strings.forEach(function(string){
        observation.values.forEach(function(obs, index){
            let data = dataHere[string];
            if (data != undefined){

                // set up temporary object
                let tempObj = {};

                // split string into array of elements seperated by ':'
                let tempString = string.split(":")
                tempString.forEach(function(s, index){
                    tempObj[varArray[index].name] = varArray[index].values[s].name;
                });

                tempObj["Datapoint"] = data[0];

                // Add to total object
                if (dataObject[tempObj["Country"]] == undefined){
                  dataObject[tempObj["Country"]] = [tempObj];
                } else if (dataObject[tempObj["Country"]][dataObject[tempObj["Country"]].length - 1]["Year"] != tempObj["Year"]) {
                    dataObject[tempObj["Country"]].push(tempObj);
                };

            }
        });
    });

    // return the finished product!
    return dataObject;
};
