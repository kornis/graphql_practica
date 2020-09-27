const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
    getTask(id: ID!): Task
    getTasks: [Task!]
}

type User {
    id: ID!
    name: String!
    email: String!
    task: [Task!]
}

type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
}

input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
}


type Mutation {
    createTask(input: createTaskInput): Task,
}

`