const { GraphQLString, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema } = require('graphql')
const Customer = require('../app/models/customer')
const Project = require('../app/models/project')
const Job = require('../app/models/job')

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
      _id: { type: GraphQLID },
      company: { type: GraphQLString },
      contact: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
})
  
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      jobs: { type: new GraphQLList(JobType) },
      dueDate: { type: GraphQLString },
      customer: { type: CustomerType },
    }),
})

const JobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        _id: { type: GraphQLID },
        item: { type: GraphQLString },
        media: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        quantity: { type: GraphQLString },
        dueDate: { type: GraphQLString },
        notes: { type: GraphQLString },
        customer: { type: CustomerType },

    })
})

// The root provides a resolver function for each API endpoint
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
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
              return Project.find({})  
            }
        },
        project: {
            type: ProjectType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, { _id }) {
                return Project.findById({_id})
            }
        }
    },
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
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
                dueDate: { type: GraphQLString },
                customer: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Project.create({
                    name: args.name,
                    dueDate: args.date,
                    customer: args.customer
                })
            }
        },
        createJob: {
            type: JobType,
            args: {
                item: { type: GraphQLString },
                media: { type: GraphQLString },
                height: { type: GraphQLString },
                width: { type: GraphQLString },
                quantity: { type: GraphQLString },
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
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})