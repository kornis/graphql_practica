const { users, tasks } = require('../constants');
module.exports = {Query: {
    getUsers: () => users,
    getUser: (_, { id }) => users.find(user => user.id === id),

    },

User: {
    task: ( {id} ) => tasks.filter(task => {
        console.log(id)
        return task.userId === id}) 
},
Mutation: {
    createUser: (_, { input } ) => {
        const user = { ...input, id:123 };
        users.push(user);
        return user;
    }
}
}