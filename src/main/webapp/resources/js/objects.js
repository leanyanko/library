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
    $('#submit').prop('value', 'Save');
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
   // hideAddButton();
    $('#add').removeClass('no-display');
}

function showRegistrationForm() {
    $('#submit').attr('value','Add');
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

function renderList(bookList) {
    var listAll = $('#attach');
//    var listAll = $('#cl');

    listAll.empty();
//    listAll.append($('#cl'));

    var header = $('#toBigClone').clone();
    header.attr('id', 'header');
    header.addClass('tablehead');
    header.addClass('pink');
    header.append($('<div class=\"col-sm-3\">Name</div>'));
    header.append($('<div class="col-sm-3">Author</div>'));
    header.append($('<div class="col-sm-3">Date</div>'));
    header.append($('<div class="col-sm-3"><button class="delete">Delete</button></div>'));

    listAll.append(header);

    var max = -1;
    var i = 0;
    bookList.forEach(function (book, i) {
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
            bookDate.attr('id', 'date_'+ book.id);
            bookDate.append(d);
            bigRow.append(bookDate);

            var bookAction = $('#toClone').clone();
            bookAction.attr('id', 'delete_' + book.id);
            var deleteButton = $("<button class=\"delete\">Delete("+book.id+")</button>");

            deleteButton.click(function (e){
                console.log('deleteRequest');
                e.stopPropagation();
                deleteRequest(book.id);
                hideInputs();
            });
            bookAction.append(deleteButton);
            bigRow.append(bookAction);
            listAll.append(bigRow);

        if (max < book.id)
            max = book.id;
       // BookId = book.id;
        }
    );
    console.log('BookId ' + BookId);
    if (max + 1 > BookId)
        BookId = max + 1;
    console.log('max ' + max);
//    console.log(BookId);
}

function actionChoise() {
    if (actionForButton === 'add') {
     //   showRegistrationForm();
        createBook();
    }
    else {
        updateRequest(parseInt(actionForButton.replace('save_', '')));
    }

}