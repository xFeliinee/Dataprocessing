/*
Name: Feline Benavides
Student number: 11035358
Purpose of this file:
*/

// Loading the data, snippet from minor programming
var fileName = "KNMI_data.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        console.log(JSON.parse(txtFile.responseText));
    }
}
txtFile.open("GET", fileName);
txtFile.send();

// Transforming the data (if necessary)

// Plotting a line chart with JavaScript. Do not use any external libraries!
