const Task = require('../database/models/task');
const User = require('../database/models/user');
const { isAuthenticated, isTaskOwner } = require('./middlewares');
const { combineResolvers } = require('graphql-resolvers');
const { base64ToString, stringToBase64 } = require('../helper');


module.exports = {
    Query: {
        getTask:combineResolvers(isAuthenticated, isTaskOwner, async( _,{ id } ) => {
            try{
                const task = await Task.findById(id);
                return task;
            }catch(error){
                console.error(error);
                throw error;
            }
        }),
        getTasks: combineResolvers(isAuthenticated, async (_,{ cursor, limit= 10 },{ loggedInUserId }) => {
            try{
                const query = { user: loggedInUserId };
                if(cursor){
                    query['_id'] = {
                        '$lt': base64ToString(cursor)
                    }
                }
                let tasks = await Task.find(query).sort({_id: -1}).limit(limit + 1);
                console.log("cantidad de tasks",tasks.length)
                const hasNextPage = tasks.length > limit;
                console.log("has next page?", hasNextPage)
                tasks = hasNextPage ? tasks.slice(0, -1) : tasks;
                console.log("has next page?", hasNextPage)
                return {
                    taskFeed: tasks,
                    pageInfo: {
                        nextPageCursor: hasNextPage ? stringToBase64(tasks[tasks.length -1].id ) : null,
                        hasNextPage
                    }
                }
            }catch(error){
                console.error(error);
                throw error;
            }
        }),
    },
    Task: {
        user: async (parent, _, { loaders }) => {
            try{
                const user = await loaders.user.load(parent.user.toString());
                return user;
            }catch(error){
                console.error(error);
                throw error;
            }
        }
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
        updateTask: combineResolvers(isAuthenticated, isTaskOwner, async (_, { id, input }) =>{
            try{
                const task = await Task.findByIdAndUpdate(id, { ...input }, { new: true });
                return task;
            }catch(error){
                console.error(error);
                throw error;
            }
        }),
        deleteTask: combineResolvers(isAuthenticated, isTaskOwner, async(_, { id }, { loggedInUserId }) => {
            try{
                const task = await Task.findByIdAndDelete(id);
                await User.findByIdAndUpdate({ _id: loggedInUserId }, { $pull: { tasks: task.id }});
                return task;
            }catch(error){
                console.error(error)
                throw error;
            }
        })
    }
}