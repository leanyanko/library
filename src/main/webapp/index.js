var booksArray = [];
var booksById = {};
var url = 'http://localhost:8081/library/rest/books/';

$(document).ready(
    $( function() {
        $( "#dateField" ).datepicker();

        $( "#target" ).select(function() {
            alert( "Handler for .select() called." );
        });

        $.getJSON(url, onBookListSuccess);
    } )
);

function action(div, i) {
    var divid = div.id;
    var value = $('#'+ divid +' > select').val();

    if (value == 'delete')
        deleteB(i);
    else if (value == 'edit')
        updateBook(divid, i);
    else if(value == 'move')
        moveBook(i);
}

function updateBook(divId, i) {

    var book = booksById[i];

    if(!book) {
        return;
    }

    console.log(book.name);
    var nameId = book.name + book.id;
    console.log(nameId);
    var divNameId = ($('#'+book.name + book.id)).html('<input type="text"' +
                                                        'name="name"' +
                                                        'id="' + nameId + 'edit' + '"' +
                                                        'value="' + book.name + '"' +
                                                        'onblur="validate(this.value, \'registerFormBookName\', \'shortString\')"' +
                                                        'onchange="validate(this.value, \'registerFormBookName\', \'shortString\')" />');
}




 function autorize() {
     userName = $('#logInUser').val();
     userPassword = $('#logInPassword').val();
     console.log(userPassword);



    $.ajax
    ({
        type: "GET",
        url: url,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', autentification(userName,userPassword));
        },
        data: '{"username": "' + userName + '", "password" : "' + userPassword + '"}',
        success: function (){
            console.log(data);
        }
    });
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

    switch (type) {
        case 'shortString':
            var re = /[0-9<>()\[\]\\.,;:\s@\^\s@!#$%&?{}*]+/;
            if (re.test(value)) {
                $('#submit').onclick='validateAll()';
                alert = $('#' + containerId + ' .alert');
                alert.removeClass('no-display');
                alert.text('Must not contain numbers and symbols');
                return false;
            }
            break;
        case 'date' :

            break;
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

        register(book);
    }
}

function register(book) {

    $.ajax({
            url: url,
            type: 'POST',
            success: function () {
                console.log('success: Post');
                $.getJSON(url, onBookListSuccess);
                document.getElementById('nameField').value='';
                document.getElementById('authorField').value='';
            },
            data: JSON.stringify(book),
            contentType: 'application/json; charset=utf-8'
        }
    )
}

function deleteB(i) {
    var urlToDel = url + i;
    $.ajax({
        url: urlToDel,
        type: 'DELETE',
        success: function() {
            console.log('success: Delete');
            $.getJSON('http://localhost:8081/library/rest/books/', onBookListSuccess);
        }
    });
}

function onBookListSuccess(bookList) {

    booksArray = bookList;
    booksById = {};
    bookList.map(function (book) { booksById[book.id] = book});
    console.log(booksArray);
    console.log(booksById);

    renderList(booksArray);
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
        var bookName = $('#toClone').clone();
            bookName.id = book.name + book.id;
            bookName.append(book.name);
            listAll.append(bookName);
            console.log(book.name);
            console.log(bookName.id);

        var bookAuthor = $('#toClone').clone();
            bookAuthor.id = book.author + book.id;
            bookAuthor.append(book.author);
            listAll.append(bookAuthor);

        var bookDate = $('#toClone').clone();
            var d = new Date(book.date).toLocaleDateString()
            bookDate.id = 'date'+ book.id;
            bookDate.append(d);
            listAll.append(bookDate);

        var booAction = $('#toClone').clone();
            booAction.id = 'action' + book.id;
            var act = "<select name=\"actionForm\">" +
                "<option value=\"delete\" selected>Delete</option>" +
                "<option value=\"edit\">Edit</option>" +
                "<option value=\"move\">Move</option>" +
                "</select>" +
                "<input type=\"submit\" value=\"Confirm\" onclick=\"action(" + booAction.id + ", " + book.id + ")\">";

        booAction.innerHTML = act;
        listAll.append(booAction);
        }
    );
}


