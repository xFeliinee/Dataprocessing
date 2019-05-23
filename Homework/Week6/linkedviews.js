/**
 * Name: Feline Benavides
 * Student number: 11035358
 * This files...
**/

// window.onload = function() {
d3v5.json("HPI_data.json").then(function(data) {
    // console.log(data);
    // Object.keys(data).forEach(function(d)
    //     console.log(data[d]["Happy Planet Index"]);
    // })

    // Ik wil de map groter, maar px aanpassen helpt niet?
    var map = new Datamap({
        element: document.getElementById('mapje'),
        data: data,
        projection: 'mercator',
        fills: {
            defaultFill: 'rgba(213,255,116,1.0)' // Any hex, color name or rgb/rgba value
        },
        geographyConfig: {
            highlightFillColor: '#FF8A28',
            highlightBorderColor: 'rgba(177, 168, 161, 1.0)',
            highlightBorderWidth: 2,
            // doet iets
            popupTemplate: function(geography, d) {
                if (d) {
                    return "<b>Land: </b>" + d["Country"] + "<br/>" +
                           "<b>HPI-Rank: </b>" + d["HPIRank"] + "<br/>" +
                           "<b>HPI: </b>" + d["Happy Planet Index"];
                } else {
                    return "<b>Land: </b>" + geography.properties.name
                }
            }
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography, d) {
                if (data[geography.id]) {
                    console.log(data[geography.id]);
                    // roep hier de barchart aan met data
                } else {
                    console.log("Doe niks");
                }
            });
        }
    });
});


// hoveren moet geven: HPI rank en HPI.
// klik op dat land (of rank dus) moet een tweede plot maken
// tweede plot: bar chart met life expectacy and wellbeing voor dat land

/**
 * Discription
 **/
function barChart(dataset){
    // Define height and width of the plot
    var margin = {top: 100, right: 0, bottom: 50, left: 50};
    var w = 1150;
    var h = 350;
    var barPadding = 3;
    var barWidth = (w / dataset.length) - barPadding;

    // Getting DOM element
    var bars = d3.select("svg");

    // yScale
    // xScale

    // Draw axis
    // Set titles to axis
    // Tooltip (werkt overigens ook niet, misschien vanwege gebruik d3v3 en v5?)
    // Create barchart (update op het moment dat er ergens anders op wordt geklikt)

};
