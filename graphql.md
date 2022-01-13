const schema = buildSchema(`
    type Customer {
        _id: String
        company: String
        contactName: String
        email: String
        phone: String
    }

    input CustomerInput {
        company: String
        contactName: String
        email: String
        phone: String
    }
    
    input JobInput {
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
      createCustomer(input: CustomerInput): Customer
  }
`)