const { users, tasks } = require('../constants');
const Task = require('../database/models/task');
const User = require('../database/models/user');
const { isAuthenticated } = require('./middlewares');
const { combineResolvers } = require('graphql-resolvers');

module.exports = {
    Query: {
    getTask: (_, { id }) => tasks.find(task => task.id === id),
    getTasks: () => tasks,
    },
Task: {
    user: ( {userId} ) => users.find(user => user.id === userId)
    },

Mutation: {
    createTask: combineResolvers(isAuthenticated, async(_, { input }, { email } ) => {
        try{
            const user = await User.findOne({ email })
            const task = new Task({ ...input, user: user.id });
            const result = await task.save();
            console.log(user.email);
            user.tasks.push(result.id);
            await user.save();
            return result;
        }catch(error){
            console.error(error);
            throw error;
        }
    }),
}
}