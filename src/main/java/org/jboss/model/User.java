package org.jboss.model;

import javax.xml.bind.annotation.XmlRootElement;
import java.security.Principal;

/**
 * Created by Anna on 15/11/2016.
 */
@XmlRootElement
public class User implements Principal{
    private String id;


    private String name;
    private String userPassword;
    private String role;

    public User() {}

    public User(User user) {
        this.setName(user.getName());
        this.setUserPassword(user.getUserPassword());
        this.setRole(user.getRole());
    }
    // Getters and setters boilerplate code...


    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
