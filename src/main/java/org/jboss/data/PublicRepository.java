package org.jboss.data;

import org.jboss.datasource.BookDAO;
import org.jboss.model.Book;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

/**
 * Created by Anna on 15/11/2016.
 */
@ApplicationScoped
public class PublicRepository implements Repository {

    @Inject
    private BookDAO allbooks;

    public Book findById(Long id) {
        return allbooks.getById(id);
    }

    public List<Book> findAllByName() {
        return allbooks.nameOrder();
    }
    public List<Book> findPublicByName() { return allbooks.namePublicOrder();}
    public void moveRepository(Book book) {
        if (book.isPrivate())
            book.setPrivate(false);
        else
            book.setPrivate(true);
    }
}
