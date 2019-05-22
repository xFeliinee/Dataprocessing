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
        fills: {
            defaultFill: 'rgba(213,255,116,1.0)' // Any hex, color name or rgb/rgba value
        },
        geographyConfig: {
            hideAntarctica: false,
            hideHawaiiAndAlaska : false,
            highlightFillColor: '#FF8A28',
            highlightBorderColor: 'rgba(255, 255, 255, 1.0)',
            highlightBorderWidth: 3,
            // doet iets
            popupTemplate: function(geography, d) {
                // console.log(geography.properties.name);
                // console.log(data[geography.properties.name]["Happy Planet Index"]);
                // console.log(data);

                // Misschien hier een functie schrijven die checkt of de waarde true is, anders alleen land teruggeeft?
                return "<b>Land: </b>" + geography.properties.name + "<br/>" +
                       "<b>HPI-Rank: </b>" + data[geography.properties.name]["HPIRank"] + "<br/>" +
                       "<b>HPI: </b>" + data[geography.properties.name]["Happy Planet Index"];
            // Je wilt dat hij toch properties.name gaat onthouden en die in bar chart gooit bij on click
            },
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