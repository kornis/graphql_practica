const { gql } = require('apollo-server-express')

module.exports = gql`
extend type Query {
    getUsers: [User!]
    getUser(id: ID!): User
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


extend type Mutation {
    createUser(input: createUserInput): User,
}
`