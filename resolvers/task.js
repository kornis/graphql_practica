const { users, tasks } = require('../constants');

module.exports = {
    Query: {
    getTask: (_, { id }) => tasks.find(task => task.id === id),
    getTasks: () => tasks,
    },
Task: {
    user: ( {userId} ) => users.find(user => user.id === userId)
    },

Mutation: {
    createTask: (_, { input } ) => {
        const task = { ...input, id: 123}
        tasks.push(task);
        return task;
    },
}
}