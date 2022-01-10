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

const Job = require('../models/job')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// GET all jobs
router.get('/jobs', requireToken, (req, res, next) => {
    Job.find({})
        .then(foundJobs => {
        res.json(foundJobs)
        })
    .catch(next)
})

// GET one job
router.get('/jobs/:id', requireToken, (req, res, next) => {
    Job.find({ _id: req.params.id })
        .then(foundJob => {
        res.json(foundJob)
        })
    .catch(next)
})

// CREATE a job
router.post('/customers', requireToken, (req, res, next) => {
    Customer.create({
        item: req.body.item,
        media: req.body.media,
        height: req.body.height,
        width: req.body.width,
        quantity: req.body.quantity,
        dueDate: req.body.dueDate,
        notes: req.body.notes,
        customer: req.body.customer
    })
        .then(createdCustomer => {
        res.json(createdCustomer)
        })
    .catch(next)
})

// EDIT a job
router.patch('/jobs/:id', requireToken, (req, res, next) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body.job)
        .then(editedJob => {
        res.json(editedJob)
        })
        .catch(next)
})

// DELETE a job
router.delete('/jobs/:id', requireToken, (req, res, next) => {
    Job.findOneAndDelete({ _id: req.params.id })
        .then(resp => {
        res.json(resp)
        })
        .catch(next)
})

module.exports = router