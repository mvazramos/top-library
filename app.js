let myLibrary=[] // Storage

const form  = document.querySelector("form");

function addNewBook(bookObject){

    const bookDisplay = document.getElementsByClassName("book-display")[0];
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    
    const imageBook = document.createElement("img");
    imageBook.classList.add("cover");
    
    const buttonsBook =  document.createElement("div");
    
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    
    buttonsBook.classList.add("book-buttons");
    editButton.textContent="Edit";
    deleteButton.textContent="Delete";
    
    buttonsBook.appendChild(editButton);
    buttonsBook.appendChild(deleteButton);
    
    
    imageBook.src=bookObject.imgURL;
    
    const bookDescription = document.createElement("div");
    bookDescription.classList.add("book-description");
    const bookList =  document.createElement("ul");
    const titleLi = document.createElement("li");
    const authorLi = document.createElement("li");
    const pagesLi = document.createElement("li");
    const readLi = document.createElement("li");
    
    
    titleLi.textContent=`Title: ${bookObject.title}`;
    authorLi.textContent = `Author: ${bookObject.author}`;
    pagesLi.textContent = `Pages: ${bookObject.pages}`;


    const listElements = [titleLi, authorLi, pagesLi,readLi];

    listElements.forEach(element => {
        bookList.appendChild(element);
    });
    
    const checkDiv =  document.createElement("div");
    const labelCheck = document.createElement("label");
    const inputCheck = document.createElement("input");

    
    inputCheck.type="checkbox";
    labelCheck.textContent="Mark as read: ";
    labelCheck.classList.add("check-container");

    labelCheck.appendChild(inputCheck);
    checkDiv.appendChild(labelCheck);

    
    bookDescription.appendChild(bookList);
    newBook.appendChild(imageBook);
    newBook.appendChild(bookDescription);
    newBook.appendChild(buttonsBook);
    newBook.appendChild(checkDiv);
    bookDisplay.appendChild(newBook);
    
}

function Book(title, author, pages, read, url){

    this.title = title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.imgURL=url;

}

function addBookToLibrary(name, author, pages, read,url) {
    book =  new Book(name,author, pages, read,url);
    myLibrary.push(book);
}

function renderLibrary(myLibrary){
    myLibrary.forEach((e)=>{
        addNewBook(e);
    })   
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData= new FormData(form);

    let objectForm = {};
    formData.forEach(function(value, key){
        objectForm[key] = value;
    });

    
    addBookToLibrary(objectForm.title,objectForm.author,objectForm.pages,objectForm.read, objectForm.imgURL);

    console.log(myLibrary);
    addNewBook(myLibrary[myLibrary.length-1]);
    closeForm()

    form.reset()
})


function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  

function closeForm() {
    document.getElementById("myForm").style.display = "none";

}

addBookToLibrary("1984","George Orwell",328,"Sim", "https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/01/2a34d8_a6741e88335241308890543d203ad89dmv2.jpg?resize=500%2C815&ssl=1")
addBookToLibrary("The Old Man and the Sea","Ernest Hemingway", 127, "Sim","https://kbimages1-a.akamaihd.net/ec4fa901-6bb8-44f2-9aa1-ee8db64aef20/1200/1200/False/old-man-and-the-sea-5.jpg")

renderLibrary(myLibrary=myLibrary);