import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';

const app = express();

mongoose.connect('mongodb://abdelelbouhy:1031972a@ds257851.mlab.com:57851/abdeltest', {useNewUrlParser: true});
mongoose.connection.once('open', () => console.log('mongoose connected'));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));
app.listen(4000, () => console.log('Running a GraphQL API server at localhost:4000/graphql'));

