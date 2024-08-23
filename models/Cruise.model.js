const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const cruiseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Image is required.'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
        },
        sea: {
            type: String,
            enum: ["Atlantic", "Pacific-Indic", "Mediterranean", "America", "Africa"]
        },
        price: {
            type: Number,
            required: [true, 'Price is required.'],
        },
        days: {
            type: Number,
            required: [true, 'Days are required.'],
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const Cruise = model('Cruise', cruiseSchema)
module.exports = Cruise
