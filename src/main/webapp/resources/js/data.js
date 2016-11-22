/**
 * Created by Anna on 18/11/2016.
 */
var booksArray = [];
var booksById = {};

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
    renderList('all');
}

function updateBooks(book, id, private) {
    hideInputs();
    booksArray.forEach(function (element, i) {
        if (element.id === id)
            booksArray[i] = book;
    });
    book['id'] = id;
    book['private'] = private;
    updateBooksById();
    renderList('all');
}

function createBook(book, id, private) {
    hideInputs();
    book['id'] = id;
    book['isPrivate'] = private;
    booksArray.push(book);
    updateBooksById();
    renderList('all');
}