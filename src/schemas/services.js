const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = 'https://i.ibb.co/Ch2THGz/CHERRY-W-B-CARD.png'

const serviceSchema = new Schema(
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
        duration: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { collection: "services" }
);

module.exports = mongoose.model("Service", productSchema)