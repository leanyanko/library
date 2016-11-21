/**
 * Created by Anna on 18/11/2016.
 */
var booksArray = [];
var booksById = {};
var BookId = 0;

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

function updateBooks(book, id) {
    hideInputs();
    booksArray.forEach(function (element, i) {
        if (element.id === id)
            booksArray[i] = book;
    });
    book['id'] = id;
    updateBooksById();
    renderList(booksArray);
}

function createBook(book, id) {
    hideInputs();
    book['id'] = id;
    booksArray.push(book);
    updateBooksById();
    renderList(booksArray);
}