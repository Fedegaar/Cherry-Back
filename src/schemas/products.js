const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
         },

         image: {
             type: String,
             required: true,
         },
        description: {
            type: String,
            required: false,
        },
        presentation: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: false,
        },
        actives: {
            type: String,
            required: true,
        },
    },
    { collection: "products" }
);

module.exports = mongoose.model("Product", productSchema)