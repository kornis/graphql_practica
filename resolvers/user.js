const User = require('../database/models/user');
const Task = require('../database/models/task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middlewares');

module.exports = { 
    Query: {
    getUser: combineResolvers(isAuthenticated, async (_,__, { email }) => {
        try{
            const user = await User.findOne({ email });
            if(!user){
                throw new Error("User not found!");
            }
            return user;
        }catch(error)
        {
            console.error(error);
            throw error;
        }
    }),

    },

User: {
    task: async ( {id} ) => {
        try{
            const tasks = await Task.find({ user:id });
            return tasks;
        }catch(error){
            console.error(error);
            throw error;
        }
    } 
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