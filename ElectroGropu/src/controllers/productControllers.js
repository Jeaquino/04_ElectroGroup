const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const detailcontrollers = {
  productDetail: function (req, res) {
    const { id } = req.params;
    db.Product.findByPk(id, {
      include: [
        {
          association: "Images",
        },
      ],
    })
      .then((products) => {
        // const productsRandom = () => {
        //     const indiceAleatorio = [];
        //     const cantidad = 3;
        //     for (let i = 0; i < cantidad; i++) {
        //         const productAleatorio = Math.floor(Math.random() * products.length);
        //         indiceAleatorio.push(products[productAleatorio]);
        //     }
        //     return indiceAleatorio;
        // };

        // const productRandom = productsRandom();

        res.render("products/productDetail", {
          title: "asda",
          products,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // revisar
  productCart: function (req, res) {
    res.render("products/productCart", {
      title: "productCart",
      usuario: req.session.user,
    });
  },

  productcreate: async function (req, res) {
    res.render("products/productcreate", { title: "productcreate" });
  },

  dashboard: (req, res) => {
    db.Product.findAll({
      include: [
        {
          association: "Images",
        },
      ],
      where: {
        id: { [Op.ne]: req.session.user.id },
      },
    })
      .then((products) => {
        
        res.render("products/dashboard", {
          title: "Dashboard",
          products,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  formCreate: async (req, res) => {

    const brands =  await db.Brand.findAll();

    console.log("brands",brands);

    res.render("products/createProduct", {
      title: "Create Product",
      usuario: req.session.user,
      brands
    });
  },

  formEdit: (req, res) => {
    const { id } = req.params;
    db.Product.findByPk(id,{
      include:[{
        association:"brands"
      }
   ]
    })

      .then((product) => {
        console.log("ESTE ES EL PRODUCTO DEL FORM EDIT: ", product);
        res.render("products/editProduct", {
          title: db.Product.titulo,
          product,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  create: async function (req, res) {
    const { titulo, description, price, brand } = req.body;
   
    try {
      const brands = await db.Brand.create({
        name: brand,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const descript = await db.Description.create({
        name: description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const product = {
        titulo,
        description_id: descript.id,
        brand_id: brands.id,
        price,
      };
      const productos = await db.Product.create(product);
      
      if (req.files) {
        await db.Image.create({
          name: req.files[0].filename,
          path: null,
          product_id: productos.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      const imagenproduct = await db.Product.findByPk(productos.id, {
        include: [{ association: "Images" }],
      });

      res.redirect("/products/dashboard");
    } catch (error) {
      console.error(error);
    }
  },

  products: (req, res) => {
    db.Product.findAll({
      include: {
        association: "Images",
      },
    })
      .then((products) => {
        res.render("products/productsGeneral", {
          title: "ElectroGroup",
          products,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  formUpdate: (req, res) => {
    const { id } = req.params;

    db.Products.findByPk(id)
      .then((product) => {
        res.render("products/createProduct", {
          title: product.nombre,
          product,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  destroy:  async (req, res) => {
    const { id } = req.params;
  
    
    await db.Image.destroy({
      where: { product_id: id },
    });
  
    
    await db.Product.destroy({
      where: { id },
    });
  
    res.redirect("/products/dashboard");
  },

  
  editProduct: (req, res) => {
    const { id } = req.params;
    
    const {titulo,brand,description,image,price} = req.body;
      db.Product.update({
        titulo,
        brand,
        price,
        description,
        createdAt:new Date,
        updatedAt:new Date
    },
    {
      where:{id}
    })
      .then((resp)=>{
        db.Image.update({
          name: req.files ? req.files[0].filename: image,
          path:null,
          product_id: resp.id,
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          where:{product_id: id}
        })
        })
    .then(()=>{
    res.redirect("/products/dashboard")
      //res.redirect(`/products/productDetail/${id}`)
    })
    .catch(error=> console.log(error));
    }

    }
module.exports = detailcontrollers;
