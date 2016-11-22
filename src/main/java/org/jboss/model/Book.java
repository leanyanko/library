package org.jboss.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by Anna on 15/11/2016.
 */
@SuppressWarnings("serial")
@Entity
@XmlRootElement
public class Book implements Serializable{

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 1, max = 60)
    private String name;

    @NotNull
    @Size(min = 1, max = 60)
    @Pattern(regexp = "[^0-9]*", message = "Must not contain numbers")
    private String author;

    @NotNull
    private Date date;

    @NotNull
    private boolean isPrivate = false;


    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public Date getDate() {
        return date;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAuthor(String author) {
        this.author = author;
    }


    public void setDate(Date date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}

