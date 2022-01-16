const { GraphQLString, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLFloat } = require('graphql')
const Customer = require('../customer')
const Project = require('../project')
const Job = require('../job')

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
      _id: { type: GraphQLID },
      company: { type: GraphQLString },
      contactName: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
})
  
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      customer: { type: CustomerType },
      jobs: { type: new GraphQLList(JobType) },
      dueDate: { type: GraphQLString },
    }),
})

const JobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        _id: { type: GraphQLID },
        item: { type: GraphQLString },
        media: { type: GraphQLString },
        height: { type: GraphQLFloat },
        width: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        dueDate: { type: GraphQLString },
        notes: { type: GraphQLString },
        customer: { type: CustomerType },

    })
})

// The root provides a resolver function for each API endpoint
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // MAIN READS (all of type, one by ID)
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                return Customer.find({})
            }
        },
        customer: {
            type: CustomerType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, { _id }) {
                return Customer.findById(_id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
              return Project.find({}).populate('customer')  
            }
        },
        project: {
            type: ProjectType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, { _id }) {
                return Project.findById(_id)
            }
        },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return Job.find({}).populate('customer')
            }
        },
        job: {
            type: JobType,
            resolve(parent, { _id }) {
                return Job.findById(_id)
            }
        }
    },
})

// All possible data mutations: Creates, edits and deletes
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // CREATIONS
        createCustomer: {
            type: CustomerType,
            args: {
                company: { type: GraphQLString },
                contactName: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Customer.create({
                    company: args.company,
                    contactName: args.contactName,
                    email: args.email,
                    phone: args.phone
                })
            }
        },
        createProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLString },
                customer: { type: GraphQLID },
                notes: {type: GraphQLString},
                dueDate: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Project.create({
                    name: args.name,
                    customer: args.customer,
                    notes: args.notes,
                    dueDate: args.dueDate
                })
            }
        },
        createJob: {
            type: JobType,
            args: {
                item: { type: GraphQLString },
                media: { type: GraphQLString },
                height: { type: GraphQLFloat },
                width: { type: GraphQLFloat },
                quantity: { type: GraphQLInt },
                dueDate: { type: GraphQLString },
                notes: { type: GraphQLString },
                customer: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Job.create({
                    item: args.item,
                    media: args.media,
                    height: args.height,
                    width: args.width,
                    quantity: args.quantity,
                    dueDate: args.dueDate,
                    notes: args.notes,
                    customer: args.customer
                })
            }
        },
        // DELETIONS
        deleteCustomer: {
            type: CustomerType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, { _id }) {
                return Customer.findByIdAndDelete(_id)
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, { _id }) {
                return Project.findByIdAndDelete(_id)
            }
        },
        deleteJob: {
            type: JobType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, { _id }) {
                return Job.findByIdAndDelete(_id)
            }
        },
        // UPDATES
        editCustomer: {
            type: CustomerType,
            args: {
                _id: { type: GraphQLID },
                company: { type: GraphQLString },
                contactName: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Customer.findByIdAndUpdate({ _id: args._id }, {
                    company: args.company,
                    contactName: args.contactName,
                    email: args.email,
                    phone: args.phone
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})