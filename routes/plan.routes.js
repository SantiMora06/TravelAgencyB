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