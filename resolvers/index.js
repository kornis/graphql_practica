const { GraphQLDateTime } = require('graphql-iso-date');
const user = require('./user');
const task = require('./task');
const customDateScalarResolver = {
    Date: GraphQLDateTime
}

module.exports = [user, task, customDateScalarResolver];