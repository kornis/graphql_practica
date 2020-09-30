const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 3000;
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { connection } = require('./database/util');



//body parser json
app.use(express.json());

//db conn
connection();

//cors
app.use(cors());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:  {name:"hola"}
})

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.use('/', (req, res, next) => {
    res.send({ message: 'Hello' });
});



app.listen(PORT, ()=> {
    console.log(`Server listening on PORT:${PORT}`);
    console.log(`Graphql path at: ${apolloServer.graphqlPath}`)
});
