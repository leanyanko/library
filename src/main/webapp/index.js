var url = 'http://localhost:8081/library/rest/books/';

$(document).ready(
    $( function() {
        $( "#dateField" ).datepicker();

        $.getJSON(url, onBookListSuccess);

    } )
);

function date() {
    return (new Date()).toLocaleDateString();
}

function renderList(bookList) {
    var listDiv = $('#listBooksNames');
    listDiv.empty();

    var listAu = $('#listBooksAuthor');
    listAu.empty();

    var listDates = $('#listBooksDate');
    listDates.empty();

    var liDel = $('#listBooksDelete');
    liDel.empty();

    var listAll = $('#attach');
    listAll.empty();

    bookList.forEach(function (book, i) {
            var bigRaw = $('#toBigClone').clone();
            bigRaw.attr('id', 'raw_' + book.id);
            var bookName = $('#toClone').clone();
            bookName.attr('id', 'name_' + book.id);

            bigRaw.click(function () {
                 updateRequest(book.id);
            })

            bookName.append(book.name);
            bigRaw.append(bookName);

            var bookAuthor = $('#toClone').clone();
            bookAuthor.attr('id', 'author_' + book.id);
            bookAuthor.append(book.author);
            bigRaw.append(bookAuthor);

            var bookDate = $('#toClone').clone();
            var d = new Date(book.date).toLocaleDateString()
            bookDate.attr('id', 'date_'+ book.id);
            bookDate.append(d);
            bigRaw.append(bookDate);

            var bookAction = $('#toClone').clone();
            bookAction.attr('id', 'delete_' + book.id);
            var act = "<button class=\"delete\" onclick=\"deleteRequest("+book.id+")\">Delete("+book.id+")</button>";

            bookAction.append(act);
            bigRaw.append(bookAction);
            listAll.append(bigRaw);
        }
    );
}

function showReg() {
    $('#registration').removeClass('no-display');
    $('#add').addClass('no-display');
    $('#dateField').val(date());
    $('#nameField').val('How to understand your cat');
    $('#authorField').val('William Golding')
    $('#submit').onclick='validateAll()';
}

function validateForNull(value, containerId, msg) {
    var alert = $('#' + containerId + ' .alert');
    alert.text(msg)
    if (value == '') {
        $('#submit').onclick='validateAll()';
        alert.removeClass('no-display');
        return false;
    }
    else {
        alert.addClass('no-display');
        $('#submit').onclick = 'validateAll()';
        return true;
    }
}

function validate(value, containerId, type) {
    if(!  validateForNull(value, containerId, 'Field must not be empty'))
        return false;
    if (type == 'shortString') {
        var re = /[0-9<>()\[\]\\.,;:@\^@!#$%&?{}*]+/;
        if (re.test(value)) {
            $('#submit').onclick = 'validateAll()';
            alert = $('#' + containerId + ' .alert');
            alert.removeClass('no-display');
            alert.text('Must not contain numbers and symbols');
            return false;
        }
    }
    return true;
}

function validateAll() {
    var name = document.getElementById('nameField').value;
    var author = document.getElementById('authorField').value;
    var rawDate = document.getElementById('dateField').value;
    if (!validate(document.getElementById('nameField').value, 'registerFormBookName', 'shortString')
        | !validate(author, 'registerFormBookAuthor', 'shortString')
        | !validate(rawDate, 'registerFormBookDate', 'date'))
        $('#submit').onclick='validateAll()';
    else {
        var date = (new Date(rawDate)).toISOString();
        var book = {};
        book['name'] = name;
        book['author'] = author;
        book['date'] = date;
        book['id'] = id++;
        createRequest(book);
    }
}
// REST API Requests
// ====================================================================
function updateRequest(id) {
    var book = booksById[id];
    if(!book) {
        return;
    }
    $('#addsuccess').addClass('no-display');
    $('#registration').removeClass('no-display');
    $('#registration > h2').text('Edit book');
    $('#registration > button').text('Save');
    $('#nameField').val(book.name);
    $('#authorField').val(book.author);
    $('#dateField').val((new Date(book.date)).toLocaleDateString());
    book.name = $('#nameField').val();
    book.author = $('#authorField').val();
    book.date = (new Date($('#dateField').val())).toISOString();

//    var fun = 'save(' + book + ', ' + book.id + ')';
    $('#submit').click(function(g) {
        console.log(g);
        save(book, id);
    });
}

function save(book, id) {
    var urlToSave = url + id;
    console.log(urlToSave);
    $.ajax({
        url : urlToSave,
        type: 'PUT',
        success: function () {
            console.log('success: Put');
            $('#addsuccess').removeClass('no-display');
            $('#registration').addClass('no-display');

            updateBooksById();
            renderList(booksArray);
        },
        data: JSON.stringify(book),
        contentType: 'application/json; charset=utf-8'
    })
}

function createRequest(book) {
    $.ajax({
            url: url,
            type: 'POST',
            success: function () {
                console.log('success: Post');
                console.log(book.id);
                booksArray.push(book);
                updateBooksById();
                $('#addsuccess').removeClass('no-display');
                $('#registration').addClass('no-display');
                renderList(booksArray);
            },
            data: JSON.stringify(book),
            contentType: 'application/json; charset=utf-8'
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





// State manipulations
// ====================================================================
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

