let myLibrary; 
const DEFAULT_LIB = [
  {
    "author": "JK Rowling",
    "title": "Chamber of Secrets",
    "numPages": 438,
    "read":false
  },
  {
    "author": "JK Rowling",
    "title": "Prisoner of Azkaban",
    "numPages": 359,
    "read":true
  },
  {
    "title": "Alice in Wonderland",
    "author": "Lewis Caroll",
    "numPages": 659,
    "read":true
  },
  { 
    "title": "Lord of the Rings", 
    "author": "Tolkien", 
    "numPages": 834,
    read: false },

]

const container = document.querySelector("#mainContainer")
const form = document.querySelector('form');
form.addEventListener('submit', addBookToLibrary);
const sortButton = document.querySelector(".sortButton");
sortButton.addEventListener('click', sortBooks)

class Book {
  constructor(title, author, numPages) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = false;
  }
}

function addBookToLibrary(event) {
  // do stuff here
  closeForm();
  event.preventDefault();
  const data = new FormData(event.target);
  const newBook = new Book(data.get("title"), data.get("author"), data.get("numPages"))
  myLibrary.push(newBook)
  console.log(myLibrary)
  updateLibraryInStorage();
  displayBooks()
  form.reset()
}

function getLibraryFromStorage(){
  // Adding a new book is the action that creates the local storage item
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    // if there is no new book added, then load the default library 
    myLibrary = DEFAULT_LIB;
  }
}

// This function is called when we add our first new book (it then creates a localstorage item)
// and every time we add a new book subsequently 
function updateLibraryInStorage(){
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function deleteBook(indexToDelete){
  myLibrary.splice(indexToDelete,1);
  updateLibraryInStorage();
  displayBooks()
}

function toggleRead(indexToToggle){
  // change array
  myLibrary[indexToToggle]['read']=!myLibrary[indexToToggle]['read']

  updateLibraryInStorage();
  displayBooks()
}

function sortBooks(){
  myLibrary.sort((a,b)=>{
  let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

  if (fa < fb) {
      return -1;
  }
  if (fa > fb) {
      return 1;
  }
  return 0;
  })
  updateLibraryInStorage();
  displayBooks()
}

function displayBooks(){
    getLibraryFromStorage();
    const list = document.getElementById("mainContainer");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }  
    for(const book of myLibrary){
      const content = document.createElement('div');
      content.classList.add('card');

      const title = document.createElement("b")
      title.textContent= "Title: "+book["title"];

      const author = document.createElement("p")
      author.textContent= "Author: " + book["author"];

      const numPages = document.createElement("p")
      numPages.textContent= "Number of Pages: "+ book["numPages"];

      // const read = document.createElement("p")
      // read.textContent= (book["read"])? "Read": "Not Read";    
      const buttonDiv = document.createElement("div")
      buttonDiv.classList.add("buttonDiv")

      const statusButton = document.createElement("button")
      statusButton.textContent=(book["read"])? "Read": "Not Read"
      statusButton.classList.add('genButton')
      statusButton.addEventListener('click',()=>{
        currentTitle = book["title"]
        console.log(currentTitle)
        console.log("toggling "+myLibrary.findIndex(book=>book["title"]==currentTitle))
        toggleRead(myLibrary.findIndex(book=>book["title"]==currentTitle))
      })

      const delButton = document.createElement("p")
      delButton.textContent="Delete"
      delButton.classList.add('delButton')
      delButton.addEventListener('click',()=>{
        currentTitle = book["title"]
        console.log("deleting "+myLibrary.findIndex(book=>book["title"]==currentTitle))
        deleteBook(myLibrary.findIndex(book=>book["title"]==currentTitle))
      })
      

      container.appendChild(content)
      content.appendChild(title)
      content.appendChild(author)
      content.appendChild(numPages)
      // content.appendChild(read)
      content.append(buttonDiv)
      buttonDiv.appendChild(statusButton)
      buttonDiv.appendChild(delButton)
    }

}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

window.onload = function() {
  displayBooks();

};
