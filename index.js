import Koa  from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import mongoose from 'mongoose';
import schema from './schema';
import serve from 'koa-static';
import views from 'koa-views';
import path from 'path';

const app = new Koa();
const router = new Router();

app.use(views(path.resolve(__dirname, './views'), {
    map: {
        hbs: 'handlebars',
    },
    extension: 'hbs',
    options: {
        partials: {
            Header: './partials/header',
        }
    }
}));

app.use(serve('./images'));

mongoose.connect('mongodb://abdelelbouhy:1031972a@ds257851.mlab.com:57851/abdeltest', {useNewUrlParser: true});
mongoose.connection.once('open', () => console.log('mongoose connected'));

router.all('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

router.get('/test', async (ctx) => {
    await ctx.render('index', {
        title: 'London School of Digital Marketing | Home',
        header: 'this is header'
    });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log('Running a GraphQL API server at localhost:4000/graphql'));

