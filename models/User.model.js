const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: [true, 'Password is required.'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            trim: true,
            lowercase: true,
            unique: false,
        },
        phone: {
            type: Number,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const User = model('User', userSchema)

module.exports = User