const express = require("express");
const app =express()
const path = require("path");
const PORT = 3030;



app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/login.html"))
});

app.get("/productcart", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/productCart.html"))
});

app.get("/productDetail", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/productDetail.html"))
});

app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/register.html"))
});

app.use(express.static("public"));

app.listen(PORT,() => {
    console.log("Servidor Corriendo en el puerto" + " " + PORT)
});