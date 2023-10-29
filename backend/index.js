import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './schema/pracSchema.js';
import  schemaTwo  from './schema/pracTwoSchema.js';
import bookschema from './schema/bookSchema.js';
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cors from 'cors'

import { createData ,deleteAllBooks, deleteAllAuthors, deleteAllData } from './dataFunctions.js';


const app = express();
app.use(cors())

dotenv.config()


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


// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {

    // Example usage of the delete functions:

  // deleteAllBooks().then((message) => {
  //   console.log(message);
  // }).catch((error) => {
  //   console.error(error);
  // });

  // deleteAllAuthors().then((message) => {
  //   console.log(message);
  // }).catch((error) => {
  //   console.error(error);
  // });

  // deleteAllData().then((message) => {
  //   console.log(message);
  // }).catch((error) => {
  //   console.error(error);
  // });


  // ADD data function
  // await createData(); // Insert the data

  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

}).catch((error) => console.log(`${error} did not connect`));