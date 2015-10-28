var http = require("http");

var server = new http.Server();

server.on("request", function(req, res) {

    console.log("Request made");

    console.log(req.url);

    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Hi there</h1><p>from the server...</p>");

});

server.listen(3000, function() {
    console.log("Server is running on http://localhost:3000");
});