const mongoose = require('mongoose');
const productSchema = require('../schemas/products');
const { Router } = require('express');
const router = Router();


//RUTA POST PARA CREAR UN PRODUCTO
router.post('/new', (req, res) => {
    const { name, image, description, presentation, price, active, available } = req.body

    try {
        const newProduct = new productSchema({
            name,
            image,
            description,
            presentation,
            price,
            active,
            available,
        })
        const savedProduct = newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(400).json(error)
        console.log(error)

    }
})

//RUTA GET PARA OBTENER TODOS LOS PRODUCTOS
router.get('/allproducts', async (req, res) => {
    try {
        let prod = await productSchema.find()
        res.status(200).json(prod)
    } catch (error) {
        console.log(error)
    }
})


//RUTA POST PARA OBTENER UN PRODUCTO ESPECIFICO CON EL ID
router.get('/product/:id', async (req, res) => {
    const { id } = req.params
    let prod
    try {
        prod = await productSchema.find({ _id: id })
        res.status(200).json(prod)
        console.log("ESTE ES EL PRODUCTO", prod)
    } catch (error) {
        console.log(error)
    }
})

// RUTA GET PARA BUSCAR PRODUCTOS POR NOMBRE
router.get("/search/", async (req, res) => {
    // const { id } = req.params;
    const { name } = req.query;
    // if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    try {
        const search = await productSchema.find({
            name: new RegExp(name.toLowerCase(), "i"),
        });
        res.status(200).json(search);
        console.log(search, "soy search")
    } catch (error) {
        res.status(404).json({ message: error });
        console.log(error, "soy el error")
    }
});

// RUTA PUT PARA MODIFICAR DATOS DE UN PRODUCTO

router.put("/updateprod/:id", async (req, res) => {
    const { id } = req.params;
    const { name, image, description, presentation, price, active, available } = req.body;

    productSchema
        .updateOne({ _id: id }, { $set: { name, image, description, presentation, price, active, available } })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: error }));
});

// RUTA DELETE PARA ELIMINAR UN PRODUCTO

router.delete("/deleteprod/:id", async (req, res) => {
    const { id } = req.params;

    productSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router;