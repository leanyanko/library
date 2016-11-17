var userName;
var userPassword;
var request ;//= new XMLHttpRequest();

var url = 'http://localhost:8081/library/rest/books/';

$(document).ready(
    $( function() {
        $( "#dateField" ).datepicker();

        $( "#target" ).select(function() {
            alert( "Handler for .select() called." );
        });

        $.getJSON(url, onBookListSuccess);
        userName = 'public';
        userPassword = 'user';
        request = new XMLHttpRequest();
    } )
);


function autentification(user, password) {
    var tok = user + ':' + password;
   // var hash = Base64.encode(tok);
    var hash = btoa(tok);
    return "Basic " + hash;
}

function setAuthHeader(xhr){
    var creds = userName + ':' + userPassword;
    var basicScheme = btoa(creds);
    var hashStr = "Basic "+basicScheme;
    xhr.setRequestHeader('Authorization', basicScheme);
}

function action(value, i) {
    console.log('value ' + value + ' i ' + i);
    if (value == 'delete')
        deleteB(i);
}




 function autorize() {
     userName = $('#logInUser').val();
     userPassword = $('#logInPassword').val();
     console.log(userPassword);

     // $.get('url',
     //     beforeSend: setAuthHeader(xdr),
     //     function (data) {
     //         console.log(data);
     //     });


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
            //    document.getElementById('datepicker').value = null;
            },
            data: JSON.stringify(book),
            contentType: 'application/json; charset=utf-8'
        }
    )
}

function getById(i) {

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
            var bookName = document.getElementById('toClone').cloneNode(false);
            bookName.id = book.id + book.name;
            bookName.append(book.name);
            listAll.append(bookName);

            var bookAuthor = document.getElementById('toClone').cloneNode(false);
            bookAuthor.id = book.id + book.author;
            bookAuthor.append(book.author);
            listAll.append(bookAuthor);

            var bookDate = document.getElementById('toClone').cloneNode(false);
            var d = new Date(book.date).toLocaleDateString()
            bookDate.id = book.id + d;
            bookDate.append(d);
            listAll.append(bookDate);

            // var bookDelete = document.getElementById('toClone').cloneNode(false);
            // bookDelete.id = book.id + 'delete';
            // var del = "<button class=\"delete\" onclick=\"deleteB("+book.id+")\">Delete("+book.id+")</button>";
            // // bookDelete.append(del);
            // bookDelete.innerHTML = del;
            // listAll.append(bookDelete);

        var booAction = document.getElementById('toClone').cloneNode(false);
        booAction.id = book.id + 'action';
        var i = booAction.id;
        var act = "<select name=\"actionForm\">" +
            "<option value=\"delete\" selected>Delete</option>" +
            "<option value=\"edit\">Edit</option>" +
            "<option value=\"move\">Move</option>" +
            "</select>" +
            "<input type=\"submit\" value=\"Confirm\" onclick=\"action(" + $('#i').find(select)+ ".val, " + book.id + ")\">";
        console.log(act);
        // bookDelete.append(del);
        booAction.innerHTML = act;
        listAll.append(booAction);
        }
    );

}


