const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items=[];
let workitems=[];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){

  let day = new Date().toLocaleString('en-us', {weekday:'long',day:"numeric",month:"long"});
      res.render("list",{listTitle:day,newItems:items});
});

app.post("/",function(req,res){
  console.log(req.body);
item = req.body.newItem;
if(req.body.button === "Work"){
  workitems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
  res.redirect("/");
}
});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List",newItems:workitems});
});

app.listen(3000,function(){
  console.log("Server started on port 3000.");
});
