package org.jboss.autentification;


import javax.annotation.Priority;
import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * Created by Anna on 15/11/2016.
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class SecurityFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Context
    private SecurityContext sc;

    @Resource SessionContext ctx;

    @Inject
    private Logger log;

    @Override
    public void filter(ContainerRequestContext context) throws IOException {
        log.info("here");
                RolesAllowed annotation = resourceInfo
                .getResourceMethod() // or getResourceMethod(), I've used both
                .getAnnotation(RolesAllowed.class);

        context.

        if (annotation != null) {
            String[] sdf = annotation.permissions();
            if (sdf != null && sdf.length > 0)
                log.info("role1:" + sdf[0]);
        }
        // here we have access to headers:
//        String authorizationHeader = context.getHeaderString("Authorization");
//
//        // and, thanks to injected resourceInfo, to annotations:
//        RolesAllowed annotation = resourceInfo
//                .getResourceClass() // or getResourceMethod(), I've used both
//                .getAnnotation(RolesAllowed.class);
//        // and, finally, to the roles (after a null-check)
//        String[] roles = annotation.permission();
//
//        // then you can authenticate and authorize everything on your own using any method (I’ve used Basic Auth and JWT)
//        // and, if something fails, you can abort the request:
//        if (!isAuthenticated) {
//            context.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
//        } else if (!isAuthorized) {
//            context.abortWith(Response.status(Response.Status.FORBIDDEN).build());
//        }
    }

}
