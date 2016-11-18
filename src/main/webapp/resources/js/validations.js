/**
 * Created by Anna on 18/11/2016.
 */
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
    if(!validateForNull(value, containerId, 'Field must not be empty'))
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

// function validateAll() {
//     var name = document.getElementById('nameField').value;
//     var author = document.getElementById('authorField').value;
//     var rawDate = document.getElementById('dateField').value;
//     if (!validate(name, 'registerFormBookName', 'shortString')
//         | !validate(author, 'registerFormBookAuthor', 'shortString')
//         | !validate(rawDate, 'registerFormBookDate', 'date'))
//         $('#submit').onclick='validateAll()';
//     else {
//         var date = (new Date(rawDate)).toISOString();
//     }
// }

function bookObject(name, author, date) {
    var book = {};
    book['name'] = name;
    book['author'] = author;
    book['date'] = date;
    if (actionForButton == 'add') {
        book['id'] = id++;
    }
    else {
        var bookId = actionForButton.replace('save_', '');
        book['id'] = parseInt(bookId);
    }
    return book;
}

function validateFields() {
    var name = $('#nameField').val();
    var author = $('#authorField').val();
    var rawDate = $('#dateField').val();

    if (!validate(name, 'registerFormBookName', 'shortString')
        | !validate(author, 'registerFormBookAuthor', 'shortString')
        | !validate(rawDate, 'registerFormBookDate', 'date'))
        return null;

    var date = (new Date(rawDate)).toISOString();

    return bookObject(name, author, date);
}