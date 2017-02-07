var express = require("express");
var path    = require("path");

// create an instance of express app
var app = express();

app.use(express.static(path.join(__dirname + "/public")));
app.use("/images", express.static(path.join(__dirname + "/images")));

app.use("/picture", function(req, resp){
    var imagefilnameArr = ["pic01.jpg", "pic02.jpg", "pic03.jpg", "pic04.jpg", "pic05.jpg", "pic06.jpg"];

    var randImgIdx = Math.floor(Math.random() * imagefilnameArr.length);

    var imgfilename = imagefilnameArr[randImgIdx];

//    resp.type("text/html"); //Representation of the resource
//    resp.send("<img src='/images/" + imgfilename + "'>");

      resp.type("image/jpeg");
      resp.sendfile(__dirname + "/images/" + imgfilename);
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
    console.info("Application is listening to port "+ app.get("port"));
});

