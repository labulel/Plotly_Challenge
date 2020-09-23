

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
});
};

function optionChanged(sample) {
    meta(sample);


//Create bar chart
function barchart(sample) {
    d3.json("data/samples.json").then( (data) => { 
        var values = data.samples
        var patientvalues = values.sample_values.sort((a,b) => a-b)
        console.log(patientvalues)        

    })

};


};



