const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../data/products.json"),"utf-8")
const products = JSON.parse(json);


const detailcontrollers = {
    productDetail: function (req, res) {
        const id = req.params.id;
        const detalle = products.find(detalle => detalle.id == id)
        res.render("products/productDetail", { title: "productDetail", detalle, products });
    },
    productCart: function (req, res) {
        res.render("products/productCart", { title: "productCart" });
    },
    productcreate: function (req, res) {
        res.render("products/productcreate", { title: "productcreate" });
    },
    dashboard:(req, res) => {
      const propiedades = ["id","nombre","imagen","sticker"];
      console.log(propiedades);
      res.render('products/dashboard', { title: "Dashboard", products, propiedades });
  },
  formCreate:(req, res) => {
    res.render('products/createProduct', { title: "Create Product" });
},

create:(req, res) => {
    const producto = req.body;
    producto.id = products[products.length-1].id + 1;
    products.push(producto);
    console.log(products);
    const json = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname,"../data/products.json"),json,'utf-8')
    res.redirect("/products/dashboard");
},

formUpdate: (req, res) => {
    const {id} = req.params;
    const product = products.find(producto => producto.id == id);
    res.render('products/createProduct', { title: product.nombre, product });
},
update: (req, res) => {
    const {id} = req.params;
    const product = products.find(producto => producto.id == id);
    res.redirect("/products/dashboard");
},
productDelete: (req, res) => {
    const {id} = req.params;
    const product = products.find(producto => producto.id == id);
    res.redirect("/products/dashboard");
},
};

module.exports = detailcontrollers;