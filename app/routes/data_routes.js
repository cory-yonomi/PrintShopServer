const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10
const Customer = require('../models/customer')
// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const Job = require('../models/job')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Customer {
        _id: String
        company: String
        contactName: String
        email: String
        phone: String
    }

    input CustomerInput {
        _id: String
        company: String
        contactName: String
        email: String
        phone: String
    }
    
    input JobInput {
        _id: String
        item: String
        media: String
        height: Float
        width: Float
        quantity: Int
        dueDate: String
        notes: String
        customer: CustomerInput
    }

    type Job {
        _id: String
        item: String
        media: String
        height: Float
        width: Float
        quantity: Int
        dueDate: String
        notes: String
        customer: Customer
    }

    type Project {
        _id: String
        name: String
        jobs: [Job]
        notes: String
        dueDate: String
        customer: Customer
    }

    type Query {
        customers: [Customer]
        customer(company: String): Customer
        jobs: [Job]
  }

  type Mutation {
      createJob(input: JobInput): Job
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
    customers: () => {
        return Customer.find({})
    },
    customer: (args) => {
        console.log(args)
         return Customer.findOne({company: args.company})    
    },
    jobs: () => {
        return Job.find({})
    },
    createJob: (args) => {
        console.log(args)
        return Job.create(args.input).then(foundCustomer => {
            foundCustomer.height = Number(foundCustomer.height)
            foundCustomer.width = Number(foundCustomer.width)
            console.log(foundCustomer)
        })
    }
}

router.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}))

module.exports = router