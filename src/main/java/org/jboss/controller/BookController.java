package org.jboss.controller;

import org.jboss.model.Book;
import org.jboss.service.BookRegistration;
import org.jboss.service.BookRemover;
import org.jboss.service.BookUpdate;

import javax.annotation.PostConstruct;
import javax.enterprise.inject.Model;
import javax.enterprise.inject.Produces;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.logging.Logger;

/**
 * Created by Anna on 15/11/2016.
 */
@Model
public class BookController {

    @Inject
    private Logger log;

    @Inject
    private FacesContext facesContext;

    @Inject
    private BookRegistration bookRegistration;

    @Inject
    private BookRemover bookRemover;

    @Inject
    private BookUpdate bookUpdate;

    @Produces
    @Named
    private Book newBook;

    private String message;

    @PostConstruct
    public void initNewBook() {
        newBook = new Book();
    }


    public void register() throws Exception {
        try {
            bookRegistration.register(newBook);
            FacesMessage m = new FacesMessage(FacesMessage.SEVERITY_INFO, "Added", "Reg successful");
            facesContext.addMessage(null, m);
            initNewBook();
        }catch (Exception e) {
            String errmsg = getRootMsg(e);
            FacesMessage m = new FacesMessage(FacesMessage.SEVERITY_ERROR, errmsg, "Couldn't add book");
            facesContext.addMessage(null, m);
        }
    }

    private String getRootMsg(Exception e) {
        String errmsg = "Failed, see server.log";
        if (e == null)
            return errmsg;
        Throwable t = e;
        while (t != null) {
            errmsg = t.getLocalizedMessage();
            t = t.getCause();
        }

        return errmsg;
    }

    public void update (long id, Book book) {
        try {
            bookUpdate.updateBook(id, book);
            FacesMessage m = new FacesMessage(FacesMessage.SEVERITY_INFO, "Removed", "Removed");
            facesContext.addMessage(null, m);
        }catch (Exception e) {
            String errmsg = getRootMsg(e);
            FacesMessage m = new FacesMessage(FacesMessage.SEVERITY_ERROR, errmsg, "Couldn't remove book");
            facesContext.addMessage(null, m);
        }
    }

    public void delete (Long id) throws Exception {

        try {
            log.info("here --------------------------------------3");
            bookRemover.remove(id);
            log.info("here --------------------------------------4");
            FacesMessage m = new FacesMessage(FacesMessage.SEVERITY_INFO, "Removed", "Removed");
            log.info("here --------------------------------------5");
            facesContext.addMessage(null, m);
            log.info("here --------------------------------------6");
        }catch (Exception e) {
            String errmsg = getRootMsg(e);
            FacesMessage m = new FacesMessage(FacesMessage.SEVERITY_ERROR, errmsg, "Couldn't remove book");
            facesContext.addMessage(null, m);
        }
    }
}
