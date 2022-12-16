import products from "../schemas/products";
import services from "../schemas/services";

export const addProduct = (req, res) => {
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
}

export const addService = (req, res) => {
    const {name, image, description, type, duration, price} = req.body

    try {        
        const newService = new serviceSchema({
            name,
            image,
            description,
            type,
            duration,
            price,
        })
        const savedService = newService.save();
        res.status(200).json(savedService)
    } catch (error) {
        res.status(400).json(error)
        console.log(error)        
    }
}