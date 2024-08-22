const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const planSchema = new Schema(
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
    category: {
      type: String,
      enum: ["Exotic", "Adventure", "Luxury", "Offer"],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
    },
    days: {
      type: Number,
      required: [true, 'Days are required.'],
    },
    isCruise: {
      type: Boolean,
      required: [true, "isCruise is required"],
      default: false
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Plan = model('Plan', planSchema)

module.exports = Plan
