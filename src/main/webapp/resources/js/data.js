/**
 * Created by Anna on 18/11/2016.
 */
var booksArray = [];
var booksById = {};
var id = 0;

function createState(bookList){
    booksArray = bookList;
    updateBooksById();
}

function updateBooksById() {
    booksById = {};
    booksArray.map(function (book) { booksById[book.id] = book});
}

function deleteBook(id) {
    booksArray = booksArray.filter(function (book) { return book.id !== id; });
    updateBooksById();
    renderList(booksArray);
}

function updateBooks(book) {
  //  validateFields();
    booksArray.forEach(function (element, i) {
        if (element.id === book.id)
            booksArray[i] = book;
    });
    updateBooksById();
    renderList(booksArray);
}

function createBook() {
    showRegistrationForm();
    var book = validateFields();
    booksArray.push(book);
    updateBooksById();
    createRequest(validateFields(book));
    renderList(booksArray);
}