/**
 * Created by Anna on 18/11/2016.
 */
var url = 'http://localhost:8081/library/rest/books/';

function updateRequest(id) {
   // showEditForm(id);
    var book =validateFields();
    if (book ==null) return;
    var urlToSave = url + id;
    console.log(urlToSave);
    $.ajax({
        url : urlToSave,
        type: 'PUT',
        success: function () {
            console.log('success: Put');
            hideInputs();
            // $('#addsuccess').removeClass('no-display');
            // $('#registration').addClass('no-display');
            // $('#addsuccess').hide(6000);
            // $('#add').removeClass('no-display');
            updateBooks(book)
        },
        data: JSON.stringify(book),
        contentType: 'application/json; charset=utf-8'
    })
}

function createRequest(book) {
    if (book == null) return;

    $.ajax({
        url: url,
        type: 'POST',
        success: function (response) {
            console.log('success: Post');
            createBook(book, response.id);
            // hideInputs();
            // book['id'] = response.id;
            // booksArray.push(book);
            // updateBooksById();
            // renderList(booksArray);
        },
        fail: function (e) {
            console.log(e);
        },
            data: JSON.stringify(book),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }
    )
}

function deleteRequest(id) {
    var urlToDel = url + id;
    $.ajax({
        url: urlToDel,
        type: 'DELETE',
        success: function() {
            console.log('success: Delete');
            deleteBook(id);
        }
    });
}

function onBookListSuccess(bookList) {
    createState(bookList);
    renderList(booksArray);
}