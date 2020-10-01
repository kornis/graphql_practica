const { users, tasks } = require('../constants');
const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middlewares');

module.exports = { 
    Query: {
    getUsers: () => users,
    getUser: combineResolvers(isAuthenticated, (_, { id }, { email }) => {
        console.log("===", email);
        return users.find(user => user.id === id)
    }),

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
            const newUser = new User({ ...input, password: hashedPassword });
            const result = await newUser.save();
            return result;
        }
        catch(error) {
            console.error(error);
            throw error;
        }
        
    },
    login: async (_, { input }) => {
        try{
            const user = await User.findOne({ email: input.email });
            if (!user){
                throw new Error('Email not found');
            }
            const isPasswordValid = await bcrypt.compare(input.password, user.password);
            if(!isPasswordValid){
                throw new Error('Email or Password is invalid');
            }
            const secret = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1d"});
            return { token };
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
}