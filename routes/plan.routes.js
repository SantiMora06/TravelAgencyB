const Plan = require('../models/Plan.model');


const router = require('express').Router()

router.get('/', (req, res, next) => {
})

router.get("/:planId", (req, res, next) => {
    const { planId } = req.params;
})

router.post("/", (req, res, next) => {
})

router.put("/:planId", (req, res, next) => {
    const { planId } = req.params;
})

router.delete("/:planId", (req, res, next) => {
    const { planId } = req.params;
})

module.exports = router