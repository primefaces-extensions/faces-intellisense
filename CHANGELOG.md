### 1.8.0(Apr 14, 2023)
* The source code was refactored and simplified.
* Several properties were created to configure the versions of the taglibs:
    * PrimeFaces (`jsf-primefaces-intellisense.primeVersion`)
        * `primefaces-8.0.0`
        * `primefaces-10.0.0`
        * `primefaces-11.0.0`
        * `primefaces-12.0.0`
    * PrimeFaces Extensions (`jsf-primefaces-intellisense.primeExtVersion`)
        * `primefaces-extensions-10.0.0"`
        * `primefaces-extensions-11.0.0"`
        * `primefaces-extensions-12.0.0"`
        * `primefaces-extensions-12.0.6`
    * OmniFaces (`jsf-primefaces-intellisense.omniVersion`)
        * `omnifaces-3.0`
        * `omnifaces-4.0`
    * RichFaces (`jsf-primefaces-intellisense.richVersion`)
        * `richfaces-4.5.1`
    * Faces (`jsf-primefaces-intellisense.facesVersion`)
        * `java-server-faces(1.0 - 2.2)`
        * `jakarta-server-faces(2.3 - 3.0)`
        * `jakarta-faces-4.0`

### 1.7.0(Apr 11, 2023)
* Add support for Jakarta Faces 4.0. (`jsf-primefaces-intellisense.facesVersion`)
* Add support for Jakarta Server Faces 2.3 and 3.0 (`jsf-primefaces-intellisense.facesVersion`)

### 1.6.0(Mar 20, 2023)
* Add support for Primefaces 12 Tag Library. (`jsf-primefaces-intellisense.primeVersion`)
* Fix support for Primefaces 11 Tag Library.
* Dependency Update.
* Change in the activation event, to improve performance
* Code cleanup and refactor.

### 1.5.1(Jun 09, 2022)
* The detail is included in the completion element.
* Correction in suggestions.
    
### 1.5.0(Jun 06, 2022)
* Add support for Primefaces 11 Tag Library.
* Add new XML namespace domain for JSF 2.2.
    * Html Basic -> "http://xmlns.jcp.org/jsf/html"
    * Faces Core -> "http://xmlns.jcp.org/jsf/core"
    * Composite Components -> "http://xmlns.jcp.org/jsf/composite"
    * Facelets Templating -> "http://xmlns.jcp.org/jsf/facelets"
    
### 1.4.0(May 03, 2022)
* Code cleanup and refactor to simplify adding new xmlns.
* Source code documentation.
* Special thank section is added in the readme file.

### 1.3.0(May 01, 2022)
* Add support for OmniFaces 3.x Tag Library.
    *  o tags ([OmniFaces](http://omnifaces.org/ui))
* Add support for PrimeFaces Extensions 10.0 Tag Library
    *  pe tags ([PrimeFaces Extensions](http://primefaces.org/ui/extensions))    
* Component loading is optimized.


### 1.2.0(Apr 30, 2022)
* Add support for Richfaces 4.5 Tag Library
    *  r tags ([Richfaces](https://richfaces.jboss.org/docs))
    *  a4j tags ([Richfaces](https://richfaces.jboss.org/docs))

### 1.0.1(Apr 25, 2022)
* Add support for all JavaServer Faces 2.1 Facelets Tag Library
    *  h tags ([Html Basic](https://docs.oracle.com/javaee/7/javaserver-faces-2-2/vdldocs-facelets/h/tld-frame.html))
    *  f tags ([Faces Core](https://docs.oracle.com/javaee/7/javaserver-faces-2-2/vdldocs-facelets/f/tld-frame.html))
    *  c tags ([JSTL core](https://docs.oracle.com/javaee/7/javaserver-faces-2-2/vdldocs-facelets/c/tld-frame.html))
    *  cc tags ([Composite Components](https://docs.oracle.com/javaee/7/javaserver-faces-2-2/vdldocs-facelets/cc/tld-frame.html))
    *  ui tags ([Facelets Templating](https://docs.oracle.com/javaee/7/javaserver-faces-2-2/vdldocs-facelets/ui/tld-frame.html))

* Automatic detection of xmlns and aliases (You can customize the alias)
    * xmlns:p="http://primefaces.org/ui"
    * xmlns:f="http://java.sun.com/jsf/core"
    * xmlns:h="http://java.sun.com/jsf/html"
    * xmlns:c="http://xmlns.jcp.org/jsp/jstl/core"
    * xmlns:cc="http://java.sun.com/jsf/composite"
    * xmlns:ui="http://java.sun.com/jsf/facelets"

### 1.0.0(Apr 23, 2022)
* Add support for PrimeFaces 8 y 10 Tag Library
    *  p tags ([PrimeFaces](http://primefaces.org/ui))