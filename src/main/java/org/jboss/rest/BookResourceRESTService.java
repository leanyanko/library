package org.jboss.rest;

import org.jboss.data.PublicRepository;
import org.jboss.model.Book;
import org.jboss.service.BookRegistration;
import org.jboss.service.BookRemover;
import org.jboss.service.BookUpdate;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.*;
import java.util.logging.Logger;


@Path("/books")
@RequestScoped
public class BookResourceRESTService {

    @Inject
    private Logger log;

    @Inject
    private Validator validator;

    @Inject
    private PublicRepository pubRepository;

    @Inject
    BookRegistration registration;

    @Inject
    BookRemover removeBook;

    @Inject
    BookUpdate updateBook;

    @Context
    SecurityContext securityContext;

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public void moveToAnotherRepository(long id) {
        Book book = pubRepository.findById(id);
        //validateBookAccess(book);
        pubRepository.moveRepository(book);

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> listAllBooks() {
        if (securityContext.isUserInRole("private"))
            return pubRepository.findAllByName();
        return pubRepository.findPublicByName();
    }

    @GET
    @Path("/{id:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Book lookupBookById(@PathParam("id") long id) {
        Book book = pubRepository.findById(id);

        if (book == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return book;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Book createBook(Book book) {
        Response.ResponseBuilder builder = null;
        try {
            validateBook(book);
            registration.register(book);
            builder = Response.ok();
        } catch (ConstraintViolationException ce) {
            builder = createViolationResponse(ce.getConstraintViolations());
        } catch (Exception e) {
            Map<String, String> responseObj = new HashMap<>();
            responseObj.put("error", e.getMessage());
            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }
        log.info(builder.toString());
        return book;
    }



    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBook(@PathParam("id") long id, Book book) {

        Response.ResponseBuilder builder = null;
        try {
            updateBook.updateBook(id, book);
            builder = Response.ok();
        } catch (ConstraintViolationException ce) {
            builder = createViolationResponse(ce.getConstraintViolations());
        } catch (Exception e) {
            Map<String, String> responseObj = new HashMap<>();
            responseObj.put("error", e.getMessage());
            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }
        return builder.build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeBook(@PathParam("id") long id) {
        Response.ResponseBuilder builder = null;
        try {
            removeBook.remove(id);
            builder = Response.ok();
        } catch (ConstraintViolationException ce) {
            log.info(ce.getLocalizedMessage());
            log.info(ce.getMessage());

            builder = createViolationResponse(ce.getConstraintViolations());
        } catch (Exception e) {
            Map<String, String> responseObj = new HashMap<>();

            String a = e.getLocalizedMessage() + " ; " + e.getMessage() + " ; " + e.toString();

            log.info(e.getLocalizedMessage());
            log.info(e.getMessage());
            log.info(e.toString());

            responseObj.put("error", a);
            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }
        return builder.build();
    }


    private void validateBook(Book book) throws ConstraintViolationException, ValidationException {

        Set<ConstraintViolation<Book>> violations = validator.validate(book);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(new HashSet<>(violations));
        }
    }


    private Response.ResponseBuilder createViolationResponse(Set<ConstraintViolation<?>> violations) {
        log.fine("Validation completed. violations found: " + violations.size());


        Map<String, String> responseObj = new HashMap<>();

        for (ConstraintViolation<?> violation : violations) {
            responseObj.put(violation.getPropertyPath().toString(), violation.getMessage());
        }

        return Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
    }

}
