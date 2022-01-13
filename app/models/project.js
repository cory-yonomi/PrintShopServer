const mongoose = require('mongoose')
const job = require('./job')
const customer = require('./customer')

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: customer
		},
		jobs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: job
        }],
        notes: String,
        dueDate: {
			type: Date,
			required: true,
        },
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

module.exports = mongoose.model('Project', projectSchema)