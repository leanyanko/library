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
public class BookRemover {
    @Inject
    private Logger log;

    @Inject
    private Event<Book> bookEvent;

    @Inject
    private BookDAO allbooks;

    public void remove(long id) throws Exception {
        allbooks.delete(id);
        //bookEvent.fire(allbooks.getById(id));

    }
}
