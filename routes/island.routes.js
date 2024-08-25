const Island = require('../models/Islands.model');


const router = require('express').Router()

router.get('/', async (req, res, next) => {
    try {
        const getIslands = await Plan.find();
        res.status(200).json(getIslands)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener las islas' });
    }
})

router.get("/:islandId", async (req, res, next) => {
    const { islandId } = req.params;
    try {
        const getSingleIsland = await Plan.findById(islandId);
        if (!getSingleIsland) {
            return res.status(404).json({ message: "Isla no encontrada" })
        }
        res.status(200).json(getSingleIsland)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener unas islas' });
    }
})

router.get("/price/:price", async (req, res, next) => {
    const { price } = req.params

    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
        return res.status(400).json({ message: "El parámetro `precio` debe ser un número válido" });
    }

    try {
        const data = await Plan.find({ price: { $lte: numericPrice } })
        if (data.length === 0) {
            return res.status(404).json({ message: `No encontramos islas por el importe de ${price}€ o inferior` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Islas no disponibles por el precio" })
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
            return res.status(404).json({ message: `No se han encontrado islas por ${days} días o menos` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Islas no disponibles por los días" })
    }
})

router.get("/name", async (req, res, next) => {
    const { name } = req.query
    if (!name) {
        return res.status(400).json({ message: "El parametro `nombre` debe ser provisto" });
    }
    try {
        const data = await Plan.find({ name: { $regex: new RegExp(name, 'i') } })
        if (data.length === 0) {
            return res.status(404).json({ message: `${name} no encontrado` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Islas no disponibles por los días" })
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
        const data = await Plan.find(query);
        if (data.length === 0) {
            return res.status(404).json({ message: "No islands found for the given criteria" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Error retrieving islands" });
    }
});


router.post("/", async (req, res, next) => {
    try {
        const postPlan = await Plan.create(req.body);
        res.status(201).json(postPlan)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al postear una islas" })
    }
})

router.put("/:islandId", async (req, res, next) => {
    const { islandId } = req.params;
    try {
        const editIsland = await Plan.findByIdAndUpdate(
            islandId,
            req.body,
            { new: true } // Esta opción asegura que se devuelva el plan actualizado
        );
        if (!editIsland) {
            return res.status(404).json({ message: "Isla no editado" })
        }
        res.status(200).json(editIsland)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al editar la isla' });
    }
})

router.delete("/:islandId", async (req, res, next) => {
    const { islandId } = req.params;
    try {
        const deleteIsland = await Plan.findByIdAndDelete(islandId)
        if (!deleteIsland) {
            return res.status(404).json({ message: "Isla no encontrada" });
        }
        res.status(200).json({ message: "Isla eliminado con exito", island: deleteIsland })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al eliminar la isla" })
    }
})

module.exports = router