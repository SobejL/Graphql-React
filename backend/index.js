import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './schema/pracSchema.js';
import  schemaTwo  from './schema/pracTwoSchema.js';
import bookschema from './schema/bookSchema.js';

const app = express();


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(
  "/graphqlTwo",
  graphqlHTTP({
    schema: schemaTwo,
    graphiql: true,
  })
)

app.use('/graphqlThree', graphqlHTTP({
  schema: bookschema,
  graphiql: true,
}));




app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});
