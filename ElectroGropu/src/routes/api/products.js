const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {create} = require("../../controllers/api/products.js")
const formatosAdmitidos = ['image/jpeg', 'image/png', 'image/gif','image/jpg','image/webp'];

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log("file", file);
    cb(null,path.join(__dirname,'../../../public/img/products'))
    },
    filename: (req,file,cb) =>{
    let newFile = "image-"+ Date.now()+ path.extname(file.originalname);
    cb(null,newFile)
    }
})

const upLoad = multer({storage});

router

.post('/create', upLoad.array('images',5), create)



module.exports = router