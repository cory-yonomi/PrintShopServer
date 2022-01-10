const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')

// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const Customer = require('../models/customer')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// GET ALL customers
router.get('/customers', requireToken, (req, res, next) => {
    Customer.find({})
        .then(foundCustomers => {
        res.json(foundCustomers)
        })
    .catch(next)
})

// GET one customer
router.get('/customers/:id', requireToken, (req, res, next) => {
    Customer.find({ _id: req.params.id })
        .then(foundCustomer => {
        res.json(foundCustomer)
        })
    .catch(next)
})

// CREATE new customer
router.post('/customers', requireToken, (req, res, next) => {
    Customer.create({
        company: req.body.company,
        contactName: req.body.contactName,
        email: req.body.email,
        phone: req.body.phone
    })
        .then(createdCustomer => {
        res.json(createdCustomer)
        })
    .catch(next)
})

// EDIT existing customer
router.patch('/customers/:id', requireToken, (req, res, next) => {
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body.customer)
        .then(editedCustomer => {
        res.json(editedCustomer)
        })
        .catch(next)
})

// DELETE a customer
router.delete('/customers/:id', requireToken, (req, res, next) => {
    Customer.findOneAndDelete({ _id: req.params.id })
        .then(resp => {
        res.json(resp)
        })
        .catch(next)
})

module.exports = router