/**
 * Created by Anna on 18/11/2016.
 */
var booksArray = [];
var booksById = {};
var tab = 'all';
function createState(bookList){
    booksArray = bookList;
    changeList(tab);
    updateBooksById();
}

function updateBooksById() {
    booksById = {};
    booksArray.map(function (book) { booksById[book.id] = book});

}

function deleteBook(id) {
    booksArray = booksArray.filter(function (book) { return book.id !== id; });
    updateBooksById();
    changeList(tab);
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
    changeList(tab);
}

function createBook(book, id, private) {
    hideInputs();
    book['id'] = id;
    book['isPrivate'] = private;
    booksArray.push(book);
    updateBooksById();
    changeList(tab);
}