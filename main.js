var express = require("express"); // express is the webserver
var path    = require("path");
var filesys = require("fs");

// create an instance of express app - webserver
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/images" , express.static(path.join(__dirname, "images")));
app.use("/picture", function(req, res){
    //hardcode filename
    //var imagefilnameArr = ["pic01.jpg", "pic02.jpg", "pic03.jpg", "pic04.jpg", "pic05.jpg", "pic06.jpg"];
    
    //lists down the content of the directory and make it into array
    var imagefilnameArr = filesys.readdirSync('./images/');
    var randImgIdx      = Math.floor(Math.random() * imagefilnameArr.length);
    var imgfilename     = imagefilnameArr[randImgIdx];

    //resp.type("text/html"); //Representation of the resource
    //resp.send("<img src='/images/" + imgfilename + "'>");

    res.type("image/jpeg");
    res.sendFile(__dirname + "/images/" + imgfilename);
});

app.use(function(req, res) {
    res.status(440);
    res.send("error file not found");
});

/*
// process is a speacial node predefine variable 
for(var i=0; i<process.argv.length; i++) {
    console.info("argv[%d] : %s, type >>> %s", i, process.argv[i], typeof process.argv[i]);
}
*/
//console.info(">>> app port: %s", process.env.APP_PORT);
app.set("port",  parseInt(process.argv[2]) ||  parseInt(process.env.APP_PORT) || 3000);  
app.listen(app.get("port"), function() {
    console.info("Application started at %s is listening to port %d", new Date(), app.get("port"));
});


