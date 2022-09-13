import products from "../schemas/products";

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