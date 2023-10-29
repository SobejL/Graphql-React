import AddBook from "../components/AddBook"
import BookList from "../components/BookList"

// `app/page.js` is the UI for the `/` URL
export default function Page() {
  return (
    
    <div id="main">
    <h1>Sabri's Reading List</h1>
    <BookList />
    <AddBook />
    </div>
    
  )
}
