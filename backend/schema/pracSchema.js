import { buildSchema } from 'graphql';
import crypto from 'crypto';

// Define the GraphQL schema
// 1. input MessageInput is the content that will go into the database
// 2. type Message is the message inputted
// 3. type Query filters through the database for the message in type Message
// 4. type Mutation is the post function and update function and posts tp type Message
const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// Message class for representing messages
class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Simulated database for storing messages
const fakeDatabase = {};

// Define the resolver functions
const root = {
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`No message exists with id ${id}`);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }) => {
    // Create a random ID for the message
    const id = crypto.randomBytes(10).toString('hex');
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDatabase[id]) {
      throw new Error(`No message exists with id ${id}`);
    }
    // Replace the old data with the new data
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

// input into url graphlQL query

// mutation {
//   createMessage(input: {
//     author: "andy",
//     content: "hope is a good thing",
//   }) {
//     id
//   }
// }

export { schema, root };
