const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
    getTask(id: ID!): Task
    getTasks: [Task!]
}



input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
}


extend type Mutation {
    createTask(input: createTaskInput): Task,
}

`