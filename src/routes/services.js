const mongoose = require('mongoose');
const serviceSchema = require('../schemas/services');
const { Router } = require('express');
const router = Router();


//RUTA POST PARA CREAR UN SERVICIO
router.post('/create', (req, res) => {
    const { name, image, description, type, duration, price } = req.body

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
        console.log("SOY EL ERROR",error)

    }
})

//RUTA GET PARA OBTENER TODOS LOS SERVICIOS
router.get('/allservices', async (req, res) => {
    try {
        let serv = await serviceSchema.find()
        res.status(200).json(serv)
    } catch (error) {
        console.log("ACA TOY",error)
    }
})


//RUTA POST PARA OBTENER UN SERVICIO ESPECIFICO CON EL ID
router.get('/service/:id', async (req, res) => {
    const { id } = req.params
    let serv
    try {
        serv = await serviceSchema.findById({ _id: id })
        res.status(200).json(serv)
        console.log("ESTE ES EL SERVICIO", serv)
    } catch (error) {
        console.log(error)
    }
})

// // RUTA GET PARA BUSCAR SERVICIOS POR NOMBRE
// router.get("/search/", async (req, res) => {
//     // const { id } = req.params;
//     const { name } = req.query;
//     // if( !mongoose.Types.ObjectId.isValid(id) ) return false;
//     try {
//         const search = await productSchema.find({
//             name: new RegExp(name.toLowerCase(), "i"),
//         });
//         res.status(200).json(search);
//         console.log(search, "soy search")
//     } catch (error) {
//         res.status(404).json({ message: error });
//         console.log(error, "soy el error")
//     }
// });

// RUTA PUT PARA MODIFICAR DATOS DE UN SERVICIO

router.put("/updateserv/:id", async (req, res) => {
    const { id } = req.params;
    const { name, image, description, type, duration, price } = req.body;

    productSchema
        .updateOne({ _id: id }, { $set: { name, image, description, type, duration, price } })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: error }));
});

// RUTA DELETE PARA ELIMINAR UN SERVICIO

router.delete("/deleteserv/:id", async (req, res) => {
    const { id } = req.params;

    serviceSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router;