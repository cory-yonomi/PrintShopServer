const { Decimal128, ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const customer = require('./customer')
const project = require('./project')

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
		},
		// project: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: project
		// },
		location: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Job', jobSchema)