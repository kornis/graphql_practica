const { gql } = require('apollo-server-express')

module.exports = gql`
extend type Query {
    getUser: User
}

type User {
    id: ID!
    name: String!
    email: String!
    task: [Task!]
    updatedAt: Date!
    createdAt: Date!
}



input createUserInput {
    email: String!
    name: String!
    password: String!
}

input loginInput {
    email: String!
    password: String!
}

type Token {
    token: String!
}

extend type Mutation {
    createUser(input: createUserInput): User,
    login(input: loginInput): Token
}

`