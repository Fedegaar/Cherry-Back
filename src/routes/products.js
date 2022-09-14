const mongoose = require('mongoose');
const productSchema = require('../schemas/products');
const { Router } = require('express');
const router = Router();


//RUTA POST PARA CREAR UN PRODUCTO
router.post('/new', (req, res) => {
    const {name, image, description, presentation, price, actives} = req.body

    try {        
        const newProduct = new productSchema({
            name,
            image,
            description,
            presentation,
            price,
            actives,
        })
        const savedProduct = newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
        
    }
})

//RUTA GET PARA OBTENER TODOS LOS PRODUCTOS
router.get('/products', async (req, res) => {
    try {
        let prod = await productSchema.find()
        res.status(200).json(prod)
    } catch (error) {
        console.log(error)
    }
})


//RUTA POST PARA OBTENER UN PRODUCTO ESPECIFICO CON EL ID
router.get('/products/:id', async (req, res) => {
    const {id} = req.params
    let prod 
    if(id){
    try {
        prod = await productSchema.find({_id: id})
        res.status(200).json(prod)
        console.log("ESTE ES EL PRODUCTO", prod)
    } catch (error) {
        console.log(error)
    }} else{
        console.log("PRODUCT NOT FOUND")
    }
})

// RUTA GET PARA BUSCAR PRODUCTOS POR NOMBRE
router.get("/productsByName/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.query;
    try {
      const search = await productSchema.find({
        _id: id,
        name: new RegExp(name.toLowerCase(), "i"),
      });
      res.status(200).json(search);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  });

// RUTA PUT PARA MODIFICAR DATOS DE UN PRODUCTO

router.put("/products-change/:id", async (req, res) => {
    const { id } = req.params;
    const { name, image, description, presentation, price, actives } = req.body;
  
    productSchema
      .updateOne({ _id: id }, { $set: { name, image, description, presentation, price, actives } })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: error }));
  });

// RUTA DELETE PARA ELIMINAR UN PRODUCTO

router.delete("/products-delete/:id", async (req, res) => {
    const { id } = req.params;

    productSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
      });

  
module.exports = router;