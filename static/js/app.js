

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
        var values = results[0].sample_values
        var top10 = values.slice(0,10)
        //Get sample otu ids
        var otus = results[0].otu_ids
        var otuids = otus.slice(0,10)
        //Get sample otu 
        var labels = results[0].otu_labels
        var otulabels = labels.slice(0,10)
        // console.log(top10)
        // console.log(otuids)
        // console.log(otulabels)
        // console.log(results[0])
        
        //Trace 1 for the bar graph
        var trace1 = {
            type: "bar",
            x: top10,
            y: otuids,
            text: otulabels
        }

        var data = [trace1]

        var layout ={
            title: "Bacteria OTUs"
        };

        Plotly.newPlot("bar", data, layout);



        




   


    });
};

function optionChanged(sample) {
    meta(sample);
};



