package org.jboss.autentification;

import java.lang.annotation.*;

/**
 * Created by Anna on 15/11/2016.
 */
@Inherited
@Target( {ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RolesAllowed {
    String[] permissions();
}
