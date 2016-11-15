package org.jboss.autentification;

import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

/**
 * Created by Anna on 15/11/2016.
 */
public class SecurityContextImpl implements SecurityContext {
    private final User user;

    public SecurityContextImpl(User user) {
        //System.out.println("SecurityContext created : " + user.getFirstName());
        this.user = user;
    }

    public Principal getUserPrincipal() {
        return user;
    }

    public boolean isUserInRole(String role) {
        System.out.println("Checking access rights : " + role + " / " + this.user.getRole());
        return user.getRole().equalsIgnoreCase(role);
    }

    public boolean isSecure() {
        return false;
    }

    public String getAuthenticationScheme() {
        return SecurityContext.BASIC_AUTH;
    }
}
}
