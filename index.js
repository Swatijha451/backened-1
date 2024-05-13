const express = require("express");
const app= express();
const port =8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
     id:uuidv4(),
    username:"Swati_jha",
    content:"Am I a fucking loser",
},
{
    id:uuidv4(),
    username:"Sharadha Khapra",
    content:"I am the loser's teacher who is her own age",
},
]
//created route
app.get("/posts",(req,res)=>{
    // res.send("server working well")
    res.render("index.ejs", {posts} )
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id= uuidv4();
    posts.push({id,username,content});
    // res.send("post reqest working");
    res.redirect("/posts");
    
})
app.get("/posts/:id",(req,res) => {
let { id }=req.params;
// console.log(id)
 let post=posts.find((p)=>id === p.id);
//  console.log(post);
 res.render("show.ejs",{ post })
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    res.redirect("/posts");

})
app.get("posts/:id/edit",(req,res) => {
    let {id}=req.params;
    let post= posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.listen (port, ()=>{
    console.log("listening to port: 8080");
});