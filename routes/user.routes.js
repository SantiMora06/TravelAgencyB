const User = require('../models/User.model')
const router = require('express').Router()


router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params
    try {
        const getUser = await User.findById(userId)
        if (!getUser) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        res.status(200).json(getUser)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al obtener usuario" })
    }
});

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

// Update a user by ID
router.put('/:userId', async (req, res, next) => {
    delete req.body.passwordHash;
    const { userId } = req.params
    try {
        const editUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
        if (!editUser) {
            res.status(404).json({ message: "Usuario no encontrado" })
        }

        res.status(200).json(editUser)
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: "Error al editar usuario" })
    }
})

// Delete a user by ID
router.delete('/:userId', async (req, res, next) => {
    const { userId } = req.params
    try {
        const editUser = await User.findByIdAndDelete(userId)
        if (!editUser) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        res.status(200).json({ message: "Usuario eliminado con exito" })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "Error al eliminar usuario" })
    }
});

module.exports = router;