const { users, tasks } = require('../constants');
const User = require('../database/models/user');
const bcrypt = require('bcrypt');

module.exports = { 
    Query: {
    getUsers: () => users,
    getUser: (_, { id }) => users.find(user => user.id === id),

    },

User: {
    task: ( {id} ) => tasks.filter(task => {
        console.log(id)
        return task.userId === id}) 
},
Mutation: {
    createUser: async (_, { input } ) => {
        try{
            const user = await User.findOne({ email: input.email });
            if(user) {
                throw new Error("email already in use");
            }
            const hashedPassword = bcrypt.hashSync(input.password, 12);
            const newUser = new User({ ...input, hashedPassword });
            const result = await newUser.save();
            return result;
        }
        catch(error) {
            console.error(error);
            throw error;
        }
        
    }
}
}