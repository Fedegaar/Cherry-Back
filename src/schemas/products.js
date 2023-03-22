const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = 'https://i.ibb.co/Ch2THGz/CHERRY-W-B-CARD.png'
const family = ['Vitamina C', 'Alpine Roses', 'Serum', 'KNB', 'KIKI']
const marks = ['Idraet', 'Lidherma', 'Icono', "Anza"]

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
         },

         image: {
            type: String,
            default: url,
            required: false,
         },
        description: {
            type: String,
            required: false,
        },
        presentation: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        active: {
            type: String,
            enum: family,
            required: true,
        },      
        available:
        {
            type: Boolean,
            required: true,
        },
        mark: {
            type: String,
            enum: marks,
            required: true
        }
    },
    { collection: "products" }
);

module.exports = mongoose.model("Product", productSchema)