const mongoose = require('mongoose')
const job = require('./job')
const customer = require('./customer')
const projectJobSchema = require('./projectJob')

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
			// required: true,
		},
		jobs: [projectJobSchema]
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Project', projectSchema)