const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const planRoutes = require("./plan.routes")
router.use("/plan", planRoutes)

const cruiseRoutes = require("./cruise.routes")
router.use("/cruise", cruiseRoutes)

const islandRoutes = require("./island.routes")
router.use("/island", islandRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

module.exports = router
