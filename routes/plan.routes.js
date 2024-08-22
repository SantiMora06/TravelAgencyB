const Plan = require('../models/Plan.model');


const router = require('express').Router()

router.get('/', async (req, res, next) => {
    try {
        const getPlans = await Plan.find();
        res.status(200).json(getPlans)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener los planes' });
    }
})

router.get("/:planId", async (req, res, next) => {
    const { planId } = req.params;
    try {
        const getSinglePlan = await Plan.findById(planId);
        if (!getSinglePlan) {
            return res.status(404).json({ message: "Plan no encontrado" })
        }
        res.status(200).json(getSinglePlan)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener un plan' });
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
            return res.status(404).json({ message: `No encontramos planes por el importe de ${price}€ o inferior` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Planes no disponibles por el precio" })
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
            return res.status(404).json({ message: `No se han encontrado planes por ${days} días o menos` })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Planes no disponibles por los días" })
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
        res.status(500).json({ message: "Planes no disponibles por los días" })
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
            return res.status(404).json({ message: "No plans found for the given criteria" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Error retrieving plans" });
    }
});


router.post("/", async (req, res, next) => {
    try {
        const postPlan = await Plan.create(req.body);
        res.status(201).json(postPlan)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al postear un plan" })
    }
})

router.put("/:planId", async (req, res, next) => {
    const { planId } = req.params;
    try {
        const editPlan = await Plan.findByIdAndUpdate(
            planId,
            req.body,
            { new: true } // Esta opción asegura que se devuelva el plan actualizado
        );
        if (!editPlan) {
            return res.status(404).json({ message: "Plan no editado" })
        }
        res.status(200).json(editPlan)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al editar el plan' });
    }
})

router.delete("/:planId", async (req, res, next) => {
    const { planId } = req.params;
    try {
        const deletePlan = await Plan.findByIdAndDelete(planId)
        if (!deletePlan) {
            return res.status(404).json({ message: "Plan no encontrado" });
        }
        res.status(200).json({ message: "Plan eliminado con exito", plan: deletePlan })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al eliminar el plan" })
    }
})

module.exports = router