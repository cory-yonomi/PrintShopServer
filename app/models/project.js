const mongoose = require('mongoose')
const job = require('./job')

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		jobs: [{
            type: ObjectId,
            ref: job
        }],
        notes: String,
        dueDate: {
			type: Date,
			required: true,
        },
        customer: {
            type: ObjectId,
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

module.exports = mongoose.model('Project', projectSchema)