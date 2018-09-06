const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: 'variables.env'});

const Recipe = require('./models/Recipe');
const User = require('./models/User');


// Bringing GraphQL middlewares
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const {typeDefs} = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

// Connect to Mongo DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connected');
})
.catch(err=> {
    console.error(err);
})

const PORT = process.env.PORT || 5000 ;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));


// Set up JWT authentication middleware
app.use( async (req, res, next) => {
    const token = req.headers["authorization"];

    if( token !== "null"){
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser ;
        } catch( err) {
            console.error( err);
        }
    }
    next();
}) ;

// Create GraphQL Application
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'})) ;

// Connect Schemas with GraphQL
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress( ({ currentUser }) => ({
        schema,
        context: {
            Recipe,
            User,
            currentUser,
        }
    }))
);

app.listen(PORT, ()=> {
    console.log('Server listening on port', PORT);
})

