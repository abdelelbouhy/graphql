import Koa  from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import mongoose from 'mongoose';
import schema from './schema';

const app = new Koa();
const router = new Router();

mongoose.connect('mongodb://abdelelbouhy:1031972a@ds257851.mlab.com:57851/abdeltest', {useNewUrlParser: true});
mongoose.connection.once('open', () => console.log('mongoose connected'));

router.all('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log('Running a GraphQL API server at localhost:4000/graphql'));

