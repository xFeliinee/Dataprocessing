/**
 * Name: Feline Benavides
 * Student number: 11035358
 * This files...
**/

// Voor de data, mag ik bijvoorbeeld HPI pakken en dan een deel in een scatter
// plot zetten en bijvoorbeeld GDP op een map plotten?

// var basic_choropleth = new Datamap({
//   element: document.getElementById("basic_choropleth"),
//   projection: 'mercator',
//   fills: {
//     defaultFill: "#ABDDA4",
//     authorHasTraveledTo: "#fa0fa0"
//   },
//   data: {
//     USA: { fillKey: "authorHasTraveledTo" },
//     JPN: { fillKey: "authorHasTraveledTo" },
//     ITA: { fillKey: "authorHasTraveledTo" },
//     CRI: { fillKey: "authorHasTraveledTo" },
//     KOR: { fillKey: "authorHasTraveledTo" },
//     DEU: { fillKey: "authorHasTraveledTo" },
//   }
// });
//
// var colors = d3.scale.category10();
//
// window.setInterval(function() {
//   basic_choropleth.updateChoropleth({
//     USA: colors(Math.random() * 10),
//     RUS: colors(Math.random() * 100),
//     AUS: { fillKey: 'authorHasTraveledTo' },
//     BRA: colors(Math.random() * 50),
//     CAN: colors(Math.random() * 50),
//     ZAF: colors(Math.random() * 50),
//     IND: colors(Math.random() * 50),
//   });
// }, 2000);

var map = new Datamap({
    element: document.getElementById('mapje'),
    fills: {
        defaultFill: 'rgba(213,255,116,1.0)' // Any hex, color name or rgb/rgba value
    }
    geographyConfig: {
       dataUrl: null, // If not null, datamaps will fetch the map JSON (currently only supports topojson)
       hideAntarctica: true,
       hideHawaiiAndAlaska : false,
       borderWidth: 1,
       borderOpacity: 1,
       borderColor: '#FDFDFD',
       popupTemplate: function(geography, data) { // This function should just return a string
         return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + geography.properties.name + '&lt;/strong&gt;&lt;/div&gt;';
       },
       popupOnHover: true, // True to show the popup while hovering
       highlightOnHover: true,
       highlightFillColor: '#000000',
       highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
       highlightBorderWidth: 2,
       highlightBorderOpacity: 1
   }
});
