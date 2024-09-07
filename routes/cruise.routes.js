const Cruise = require('../models/Cruise.model');


const router = require('express').Router()

router.get('/', async (req, res, next) => {
    try {
        const getCruises = await Cruise.find();
        res.status(200).json(getCruises)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener los cruceros' });
    }
})

router.get("/:cruiseId", async (req, res, next) => {
    const { cruiseId } = req.params;
    try {
        const getSingleCruise = await Cruise.findById(cruiseId);
        if (!getSingleCruise) {
            return res.status(404).json({ message: "Crucero no encontrado" })
        }
        res.status(200).json(getSingleCruise)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener un crucero' });
    }
})

router.get("/price/:price", async (req, res, next) => {
    const { price } = req.params

    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
        return res.status(400).json({ message: "El parámetro `precio` debe ser un número válido" });
    }

    try {
        const data = await Cruise.find({ price: { $lte: numericPrice } })
        if (data.length === 0) {
            return res.status(404).json({ message: `No encontramos planes por el importe de ${price}€ o inferior` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Cruceros no disponibles por el precio" })
    }
})

router.get("/days/:days", async (req, res, next) => {
    const { days } = req.params

    const numericDays = Number(days);
    if (isNaN(numericDays)) {
        return res.status(400).json({ message: "El parámetro `days` debe ser un número válido" });
    }
    try {
        const data = await Plan.find({ days: { $lte: numericDays } })
        if (data.length === 0) {
            return res.status(404).json({ message: `No se han encontrado cruceros por ${days} días o menos` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Cruceros no disponibles por los días" })
    }
})

router.get("/name", async (req, res, next) => {
    const { name } = req.query
    if (!name) {
        return res.status(400).json({ message: "El parametro `nombre` debe ser provisto" });
    }
    try {
        const data = await Cruise.find({ name: { $regex: new RegExp(name, 'i') } })
        if (data.length === 0) {
            return res.status(404).json({ message: `${name} no encontrado` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Cruceros no disponibles por los días" })
    }
})

router.get("/filter", async (req, res, next) => {
    const { days, price } = req.query;

    const query = {};

    if (days) {
        query.days = { $lte: Number(days) }; // Less than or equal to
    }

    if (price) {
        query.price = { $lte: Number(price) }; // Less than or equal to
    }

    try {
        const data = await Cruise.find(query);
        if (data.length === 0) {
            return res.status(404).json({ message: "No cruises found for the given criteria" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Error retrieving cruises" });
    }
});


router.post("/", async (req, res, next) => {
    try {
        const postCruise = await Cruise.create(req.body);
        res.status(201).json(postCruise)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al postear un Cruise" })
    }
})

router.put("/:cruiseId", async (req, res, next) => {
    const { cruiseId } = req.params;
    try {
        const editCruise = await Cruise.findByIdAndUpdate(
            cruiseId,
            req.body,
            { new: true } // Esta opción asegura que se devuelva el Cruise actualizado
        );
        if (!editCruise) {
            return res.status(404).json({ message: "crucero no editado" })
        }
        res.status(200).json(editCruise)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al editar el crucero' });
    }
})

router.delete("/:cruiseId", async (req, res, next) => {
    const { cruiseId } = req.params;
    try {
        const deleteCruise = await Cruise.findByIdAndDelete(cruiseId)
        if (!deleteCruise) {
            return res.status(404).json({ message: "Crucero no encontrado" });
        }
        res.status(200).json({ message: "Cruise eliminado con exito", cruise: deleteCruise })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al eliminar el crucero" })
    }
})

module.exports = router