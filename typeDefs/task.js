const { gql } = require('apollo-server-express');

module.exports = gql`
extend type Query {
    getTask(id: ID!): Task
    getTasks(cursor: String, limit: Int): TaskFeed!
}

type TaskFeed {
    taskFeed: [Task!]
    pageInfo: PageInfo!
}

type PageInfo {
    nextPageCursor: String
    hasNextPage: Boolean
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
}

input updateTaskInput {
    name: String!
    completed: Boolean!
}

extend type Mutation {
    createTask(input: createTaskInput): Task,
    updateTask(id: ID!, input: updateTaskInput): Task,
    deleteTask(id: ID!): Task,
}



`