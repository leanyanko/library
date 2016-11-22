/**
 * Created by Anna on 18/11/2016.
 */
function validateForNull(value, containerId, msg) {
    var alertVar = $('#' + containerId);
    alertVar.text(msg)
    if (value == '') {
        alertVar.removeClass('no-display');
        return false;
    }
    alertVar.addClass('no-display');
    return true;

}

function validate(value, containerId, type) {
    if(!validateForNull(value, containerId, 'Field must not be empty'))
        return false;
    if (type == 'shortString') {
        var re = /[0-9<>()\[\]\\.,;:@\^@!#$%&?{}*]+/;
        if (re.test(value)) {
            console.log(value);
            var alertField = $('#' + containerId);

            console.log(containerId);
            alertField.removeClass('no-display');
            alertField.text('Must not contain numbers and symbols');
            return false;
        }
    }
    return true;
}

function validateFields() {
    var name = $('#nameField').val();
    var author = $('#authorField').val();
    var rawDate = $('#dateField').val();
    var private = $('#private').prop('checked');

    if (!validate(name, 'nameAlert', 'shortString')
        | !validate(author, 'authorAlert', 'shortString')
        | !validate(rawDate, 'dateAlert', 'date'))
        return null;

    var date = (new Date(rawDate)).toISOString();

    return bookObject(name, author, date, private);
}


function bookObject(name, author, date, private) {
    var book = {};
    book['name'] = name;
    book['author'] = author;
    book['date'] = date;
    book['private'] = private;
    return book;
}
