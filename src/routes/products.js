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

module.exports = router;