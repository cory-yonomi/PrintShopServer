const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			unique: true,
		},
		contactName: {
			type: String,
			required: true,
		},
        email: {
            type: String,
            required: true,
        },
        phone: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Customer', customerSchema)