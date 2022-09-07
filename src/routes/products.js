const mongoose = require('mongoose');
const productSchema = require('../schemas/products');
const { Router } = require('express');
const router = Router();

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

router.get('/products', async (req, res) => {
    try {
        let prod = await productSchema.find()
        res.status(200).json(prod)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;