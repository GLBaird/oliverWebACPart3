// load modules
var fs = require("fs");

var data = "Hi there,\nI am a text file and will be saved!\nLeon";
var path = "./output.txt";

for(var i=0; i<process.argv.length; i++) {
    var current = process.argv[i];
    var next = process.argv[i+1];

    if (current == "-o" || current == "-filename" && typeof next === "string") {
        path = next;
    }
}

fs.writeFileSync(path, data);

if (fs.existsSync(path)) {
    console.log("The file has been created");
} else {
    console.log("There has been an error writing the file.");
}