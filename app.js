const bookDisplay = document.getElementsByClassName("book-display")[0]; // Container for Books
const form  = document.querySelector("form");

let myLibrary=[] // Storage

// Generic Book class, with a counter;
class Book {
    static count=0;
    constructor(title, author, pages, read, url){
        this.id=++Book.count;
        this.title = title;
        this.author=author;
        this.pages=pages;
        this.read=read;
        this.imgURL=url;

    }
}

function addBookElement(bookObject){

    //new Book div
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    
    // add image element for book cover
    const imageBook = document.createElement("img");
    imageBook.classList.add("cover");
    
    //add buttons div container
    const buttonsBook =  document.createElement("div");
    
    //create buttons
    
    const deleteButton = document.createElement("button");
    
    //create book description div 
    const bookDescription = document.createElement("div");
    bookDescription.classList.add("book-description");

    //book description elements
    const bookList =  document.createElement("ul");
    const titleLi = document.createElement("li");
    const authorLi = document.createElement("li");
    const pagesLi = document.createElement("li");
    const readLi = document.createElement("li");
    
    // populate book description elements
    titleLi.textContent=`Title: ${bookObject.title}`;
    authorLi.textContent = `Author: ${bookObject.author}`;
    pagesLi.textContent = `Pages: ${bookObject.pages}`;
    imageBook.src=bookObject.imgURL;

    // buttons container
    buttonsBook.classList.add("book-buttons");

    // delete button image
    const deleteButtonImage=document.createElement("img");
    deleteButtonImage.src="./assets/bin.png";

    deleteButtonImage.id=`${bookObject.title}`;
    newBook.id = `${bookObject.title}`;

    deleteButtonImage.addEventListener("click",(e)=>{
        let id=e.target.id;

        function checkIndex(e){
            return e.title===id;
        }
        
        let index = myLibrary.findIndex(checkIndex);
        myLibrary.splice(index,1);
        
        const element =  document.getElementById(id);
        element.remove();

    });


    const listElements = [titleLi, authorLi, pagesLi,readLi];

    listElements.forEach(element => {
        bookList.appendChild(element);
    });
    
    const checkDiv =  document.createElement("div");
    const labelCheck = document.createElement("label");
    const inputCheck = document.createElement("input");

    deleteButton.appendChild(deleteButtonImage);
    buttonsBook.appendChild(deleteButton);

    inputCheck.type="checkbox";
    inputCheck.checked=bookObject.read;
    labelCheck.textContent="Mark as read: ";
    labelCheck.classList.add("check-container");

    inputCheck.addEventListener("change", (e)=>{
        /* 
            functionality to change status in object 
        */
        let status = e.target.checked;
        myLibrary.forEach((e)=>{
            if(bookObject.id===e.id){
                e.read=status;
            }
        });
    })

    labelCheck.appendChild(inputCheck);
    checkDiv.appendChild(labelCheck);

    bookDescription.appendChild(bookList);
    newBook.appendChild(buttonsBook);
    newBook.appendChild(imageBook);
    newBook.appendChild(bookDescription);
    newBook.appendChild(checkDiv);
    bookDisplay.appendChild(newBook);
    
}


function renderLibrary(myLibrary){
    myLibrary.forEach((book)=>{
        addBookElement(book);
    })   
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData= new FormData(form);

    let objectForm = {};
    formData.forEach(function(value, key){
        objectForm[key] = value;
    });

    let book =new Book(objectForm.title,objectForm.author,objectForm.pages,objectForm.read, objectForm.imgURL);
    myLibrary.push(book);

    addBookElement(book); 
    closeForm()

    form.reset()
})


function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  

function closeForm() {
    document.getElementById("myForm").style.display = "none";

}

let examples = [
    new Book("1984","George Orwell",328,false, "https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/01/2a34d8_a6741e88335241308890543d203ad89dmv2.jpg?resize=500%2C815&ssl=1"),
    new Book("The Old Man and the Sea","Ernest Hemingway", 127, false,"https://kbimages1-a.akamaihd.net/ec4fa901-6bb8-44f2-9aa1-ee8db64aef20/1200/1200/False/old-man-and-the-sea-5.jpg"),
    new Book("Abraço","José Luís Peixoto", 664, true,"https://img.wook.pt/images/abraco-jose-luis-peixoto/MXwxMTUxOTMyM3w3MDkwNTI1fDEzODM1ODEyODYwMDB8d2VicA==/550x")
];

examples.forEach(e=>{
    myLibrary.push(e);
})

renderLibrary(myLibrary);




