package org.jboss.data;

import org.jboss.model.Book;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.event.Reception;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by Anna on 15/11/2016.
 */
@RequestScoped
public class ListOfBooksPublic implements ListOfBooks{

    @Inject
    private PublicRepository publicRepository;

    @Inject
    private Logger log;

    private List<Book> books;

    @Produces
    @Named
    public List<Book> getBooks() {
        return books;
    }

    public void onBookListChanged(@Observes(notifyObserver = Reception.IF_EXISTS) final Book book) {
        retrieveBooksByName();
    }

    @PostConstruct
    public void retrieveBooksByName() {
        books =  publicRepository.findAllByName();
    }
}
