import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

// Passing variables with mutation to query
const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const GET_SINGLE_BOOK = gql`
query GetBook($id: ID){
    book(id: $id) {
        id
        name
        genre
        author {
            id
            name
            age
            books {
                name
                id
            }
        }
    }
}
`;

// const GET_SINGLE_BOOK = gql`
// query GetBook($id: String){
//     book(id: $id) {
//         id
//         name
//         genre
//         author {
//             id
//             name
//             age
//             books {
//                 name
//                 id
//             }
//         }
//     }
// }
// `;


export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_SINGLE_BOOK };
