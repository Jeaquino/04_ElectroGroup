const { Op, DATE } = require("sequelize");
const db = require("../../database/models");
const apiProductController = {
create: async function (req, res) {
  console.log("body",req.body);
    const { titulo, description, price, brand } = req.body; 
    
    try {
      const product = {
        titulo,
        description,
        brand_id: brand,
        price,
      };

      const producto = await db.Product.create(product);
      
      if (req.files) {
        req.files.forEach( async (file) => {
          await db.Image.create({
            name: file.filename,
            path: null,
            product_id: producto.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      }

      res.status(200).send(producto);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = apiProductController;