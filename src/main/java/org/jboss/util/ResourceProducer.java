package org.jboss.util;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.faces.context.FacesContext;
import java.util.logging.Logger;

/**
 * Created by Anna on 12/11/2016.
 */
public class ResourceProducer {
//    @Produces
//    @PersistenceContext
//    private EntityManager em;

    @Produces
    private Logger produceLog(InjectionPoint injectionPoint) {
        return Logger.getLogger(injectionPoint.getMember().getDeclaringClass().getName());
    }

    @Produces
    @RequestScoped
    public FacesContext produceFace() {
        return FacesContext.getCurrentInstance();
    }
}
