/**
 * Created by Anna on 18/11/2016.
 */
//$getScript('data.js');
function showEditForm(id) {
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
    actionForButton = 'save_' + id;
}

function showRegistrationForm() {
    $('#registration > h2').text('Add new book');
    $('#registration > button').text('Add');
    $('#registration').removeClass('no-display');
    $('#add').addClass('no-display');
    $('#dateField').val(date());
    $('#nameField').val('How to understand your cat');
    $('#authorField').val('William Golding');
    actionForButton = 'add';
}

$(document).ready(
    $( function() {
        $( "#dateField" ).datepicker();

        $.getJSON(url, onBookListSuccess);

    } )
);

function date() {
    return (new Date()).toLocaleDateString();
}

var actionForButton = 'add';
function renderList(bookList) {
    var listAll = $('#attach');
    listAll.empty();

    bookList.forEach(function (book, i) {
            var bigRaw = $('#toBigClone').clone();
            bigRaw.attr('id', 'raw_' + book.id);
            var bookName = $('#toClone').clone();
            bookName.attr('id', 'name_' + book.id);

            bigRaw.click(function () {
                actionForButton = 'save_' + book.id;
                showEditForm(book.id);
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

function actionChoise() {
    if (actionForButton === 'add') {
        createBook();
    }
    else {
        updateRequest(parseInt(actionForButton.replace('save_', '')));
    }

}