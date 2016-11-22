package org.jboss.data;

import org.jboss.model.Book;

/**
 * Created by Anna on 15/11/2016.
 */
public interface Repository {
    public Book findById(Long id);
}
