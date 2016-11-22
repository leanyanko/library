package org.jboss.service;

import org.jboss.datasource.BookDAO;
import org.jboss.model.Book;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import java.util.logging.Logger;

/**
 * Created by Anna on 15/11/2016.
 */
@Stateless
public class BookUpdate {
    @Inject
    private Logger log;

    @Inject
    private Event<Book> bookEvent;

    @Inject
    private BookDAO allbooks;

    public void updateBook(Long id, Book book) throws Exception {
        Book upBook = allbooks.getById(id);
        if (book.getName() != null)
            upBook.setName(book.getName());
        if (book.getAuthor() != null)
            upBook.setAuthor(book.getAuthor());
        if (book.getDate() != null)
            upBook.setDate(book.getDate());
        upBook.setPrivate(book.isPrivate());
        bookEvent.fire(allbooks.getById(id));
    }
}
