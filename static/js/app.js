

//query the server to read in the data

function init() {
    var dropdownMenu = d3.select("#selDataset");
    //Append the dropdown with sample IDs
    d3.json("data/samples.json").then( (data) => {
        var names = data.names
        names.forEach( name => {dropdownMenu.append("option").text(name).property("value", name)});
        // console.log(data)
        meta(names[0])
        });
    
    };
    
    init()



//Populating the metatdata of the patient selected in the dropdown menu
function meta(sample) {
    d3.json("data/samples.json").then( (data) => {

        var meta = data.metadata
        var patientmeta = meta.filter(row => row.id == sample)
        var patientinfo = patientmeta[0]
    
        var demo = d3.select("#sample-metadata")
        //clear the demo table
        demo.html("")
        //append the table with patient data
        Object.entries(patientinfo).forEach(([key,value]) => {demo.append("h6").text(`${key}: ${value}`) });


        //Create a bar chart
        var results = data.samples.filter(row => row.id == patientinfo.id)
        //Get sample values
        var values = results[0]
        var otu_id = values.otu_ids;
        var labels = values.otu_labels;
        var sample_values = values.sample_values;
        
        var yticks = otu_id.slice(0,10).map(otu => `OTU ${otu}` ).reverse()


        //Trace 1 for the bar graph
        var trace1 = {
            type: "bar",
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var data = [trace1]

        var layout ={
            title: "Bacteria OTUs"
        };

        Plotly.newPlot("bar", data, layout);


        //Create a bubble chart
        var trace1 = {
            x: otu_id,
            y: sample_values,
            mode: 'markers',
            marker: {
                color: otu_id,
                size: sample_values
            }
        };

        var data = [trace1];

        var layout = {
            showlegend: false,
            xaxis: {
                title: {
                  text: 'OTU ID'
                },
              },
            yaxis: {
            title: {
                text: 'Sample Values'
            },
            },
        };

        Plotly.newPlot('bubble', data, layout)

        
    });
};

function optionChanged(sample) {
    meta(sample);
};



