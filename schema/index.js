import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} from 'graphql';
import Book from '../models/book';
import Author from '../models/author';



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent) {
                // return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent) {
                // return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return _.find(books, {id: args.id});
            }
        },

        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return _.find(authors, {id: args.id})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mautation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLString}
            },
            resolve(parent, args) {
                const author = new Author({
                    name: args.name,
                    age: args.age
                });

                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLString}
            },
            resolve(parent, args) {
                const book = new Author({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save();
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
