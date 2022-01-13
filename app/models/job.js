const { Decimal128, ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const customer = require('./customer')

const jobSchema = new mongoose.Schema(
	{
		item: {
			type: String,
			required: true
		},
		media: {
			type: String,
			required: true,
		},
		height: {
			type: Decimal128,
			required: true
        },
        width: {
			type: Decimal128,
			required: true
		},
        quantity: {
            type: Number,
            required: true
        },
        dueDate: {
			type: Date,
			required: true,
        },
        notes: String,
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: customer
        }
	},
	{
		timestamps: true,
		// toObject: {
		// 	// remove `hashedPassword` field when we call `.toObject`
		// 	transform: (_doc, user) => {
		// 		delete user.hashedPassword
		// 		return user
		// 	},
		// },
	}
)

module.exports = mongoose.model('Job', jobSchema)