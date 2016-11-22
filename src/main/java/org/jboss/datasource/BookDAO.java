package org.jboss.datasource;

import org.jboss.model.Book;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by Anna on 15/11/2016.
 */
@Stateless
public class BookDAO {

    @Inject
    private Logger log;

    private Long id = 0L;

    private static Map<Long, Book> allbooks = new HashMap <Long, Book>();

    public void addBook(Book book) {
        book.setId(id++);
        allbooks.put(book.getId(), book);
    }

    public List<Book> nameOrder() {
        List<Book> list = new ArrayList<>();
        for (Book b: allbooks.values())
            list.add(b);
        return list;
    }

    public List<Book> namePublicOrder() {
        List<Book> list = new ArrayList<>();
        for (Book b: allbooks.values()) {
            if (!b.isPrivate())
                list.add(b);
        }
        return list;
    }

    public Book delete(Long id) {
        log.info("Deleting" + allbooks.get(id).getName());
        return allbooks.remove(id);
    }

    public Book getById (Long id) {
        return allbooks.get(id);
    }
}
