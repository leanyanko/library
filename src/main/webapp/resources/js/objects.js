/**
 * Created by Anna on 18/11/2016.
 */
function showEditForm(id) {
    var book = booksById[id];
    if(!book) {
        return;
    }
    hideSucsess();
    hideAddButton();
    $('#registration').removeClass('no-display');
    $('#registration > h2').text('Edit book');
    $('#submitAction').prop('value', 'Save');
    $('#nameField').val(book.name);
    $('#authorField').val(book.author);
    $('#dateField').val((new Date(book.date)).toLocaleDateString());

    actionForButton = 'save_' + id;
}

function hideSucsess() {
    $('#addsuccess').addClass('no-display');

}

function hideAddButton() {
    $('#add').addClass('no-display');
}

function hideInputs() {
    $('#addsuccess').removeClass('no-display');
    $('#registration').addClass('no-display');
    $('#addsuccess').hide(6000);
    $('#add').removeClass('no-display');
}

function showRegistrationForm() {
    $('#submitAction').attr('value','Add');
    $('#registration > h2').text('Add new book');

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

function renderList(type) {
    var bookList = booksArray;

    var listAll = $('#attach');

    listAll.empty();

    var header = $('#toBigClone').clone();
    header.attr('id', 'header');
    header.addClass('tablehead');
    header.addClass('pink');
    header.append($('<div class=\"col-sm-3\">Name</div>'));
    header.append($('<div class="col-sm-3">Author</div>'));
    header.append($('<div class="col-sm-3">Date</div>'));
    header.append($('<div class="col-sm-3">Delete</div>'));

    listAll.append(header);

    var i = 0;
    console.log('size ' + bookList.length);

    bookList.forEach(function (book, i) {

        if (type === 'public' && !book.private || type === 'private' && book.private || type === 'all') {

            var bigRow = $('#toBigClone').clone();
            bigRow.attr('id', 'raw_' + book.id);

            var bookName = $('#toClone').clone();
            bookName.attr('id', 'name_' + book.id);

            bigRow.click(function () {
                actionForButton = 'save_' + book.id;
                showEditForm(book.id);
            });

            if (i % 2 === 0)
                bigRow.addClass('blue');
            else
                bigRow.addClass('pink');

            bookName.append(book.name);
            bigRow.append(bookName);

            var bookAuthor = $('#toClone').clone();
            bookAuthor.attr('id', 'author_' + book.id);
            bookAuthor.append(book.author);
            bigRow.append(bookAuthor);

            var bookDate = $('#toClone').clone();
            var d = new Date(book.date).toLocaleDateString()
            bookDate.attr('id', 'date_' + book.id);
            bookDate.append(d);
            bigRow.append(bookDate);

            var bookAction = $('#toClone').clone();
            bookAction.attr('id', 'delete_' + book.id);
            var deleteButton = $("<button class=\"btn btn-default delete\">Delete</button>");

            deleteButton.click(function (e) {
                e.stopPropagation();
                deleteRequest(book.id);
                hideInputs();
            });
            bookAction.append(deleteButton);
            bigRow.append(bookAction);
            listAll.append(bigRow);
        }

        }
    );
    //console.log('rendered ' + type);
}

function actionChoise() {
    var book = validateFields();
    if (actionForButton === 'add') {
        createRequest(book);
    }
    else {
        var id = actionForButton.replace('save_', '');
        updateRequest(book, parseInt(id) );
    }
}

function changeList(type) {
    if (type === 'public') {
        $('changeAll').removeClass('active');
        $('changePrivate').removeClass('active');
        $('changePublic').addClass('active');
    }
    else if (type === 'private') {
        $('changeAll').removeClass('active');
        $('changePrivate').addClass('active');
        $('changePublic').removeClass('active');
    }
    else if (type === 'all') {
        $('changeAll').addClass('active');
        $('changePrivate').removeClass('active');
        $('changePublic').removeClass('active');
    }
    console.log(type);
    renderList(type);
}