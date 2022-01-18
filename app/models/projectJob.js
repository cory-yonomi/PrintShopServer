const { Decimal128, ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const projectJobSchema = new mongoose.Schema(
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
        notes: String,
		location: String
	},
	{
		timestamps: true
	}
)

module.exports = projectJobSchema