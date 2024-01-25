<div align="center">
<img src="https://github.com/primefaces-extensions/faces-intellisense/blob/main/images/icon.png" width="172" height="185">

# Intellisense for Faces
</div>

# Goals
A Visual Studio Code extension that provides diferentes components completion in the HTML, XHTML and JSF. Based on the official Taglib definitions.

# Taglib supported for
* Primefaces (8.x, 10.x, 11.x, 12.x, 13.x)
* Primefaces Extensions (10.x, 11.x, 12.x, 13.x)
* OmniFaces (3.x, 4.x)
* RichFaces (4.5.x)
* JSF (2.1, 2.2)
* Jakarta Server Faces (2.3, 3.0)
* Jakarta Faces 4.0


![](https://github.com/primefaces-extensions/faces-intellisense/blob/main/images/demo-animated.gif)

## Features
* Gives you autocompletion for Html Basic components (<h:).
* Gives you autocompletion for Faces Core components (<f:).
* Gives you autocompletion for Facelets Templating components (<ui:).
* Gives you autocompletion for JSTL core components (<c:).
* Gives you autocompletion for Composite components (<cc:).
* Gives you autocompletion for PrimeFaces components (<p:).
* Gives you autocompletion for PrimeFaces Extensions (<pe:).
* Gives you autocompletion for OmniFaces (<o:).
* Gives you autocompletion for RichFaces components (<r:) and (<a4j:).

* Automatic detection of xmlns (You must include the namespace mandatory).   
    * Html Basic -> "http://java.sun.com/jsf/html" or "http://xmlns.jcp.org/jsf/html" or "jakarta.faces.html"
    * Faces Core -> "http://java.sun.com/jsf/core" or "http://xmlns.jcp.org/jsf/core" or "jakarta.faces.core"
    * JSTL Core -> ="http://xmlns.jcp.org/jsp/jstl/core" or "jakarta.tags.core"
    * Composite Components -> "http://java.sun.com/jsf/composite" or "http://xmlns.jcp.org/jsf/composite" or "jakarta.faces.composite"
    * Facelets Templating -> "http://java.sun.com/jsf/facelets" or "http://xmlns.jcp.org/jsf/facelets" or "jakarta.faces.facelets"
    * PrimeFaces -> "http://primefaces.org/ui"
    * PrimeFaces Extensions -> "http://primefaces.org/ui/extensions"
    * OmniFaces -> "http://omnifaces.org/ui"
    * RichFaces -> "http://richfaces.org/rich"
    * RichFaces A4J -> "http://richfaces.org/a4j"

* You can customize the alias name.
    ```xml
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" 
                xmlns:h="http://java.sun.com/jsf/html"
                xmlns:f="http://java.sun.com/jsf/core" 
                xmlns:cc="http://java.sun.com/jsf/composite" 
                xmlns:p="http://primefaces.org/ui">
                ......
        <!-- Or  -->	
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" 
                xmlns:h="http://java.sun.com/jsf/html"
                xmlns:f="http://java.sun.com/jsf/core" 
                xmlns:composite="http://java.sun.com/jsf/composite" 
                xmlns:pf="http://primefaces.org/ui">
                ......
    ```
* Command to manually re-cache the class definitions used in the autocompletion;
* User Settings.

## Supported Language Modes
* HTML.
* XHTML.
* JSF.
* XML.

## Extended Support for Other Language Modes

It's possible to specify which language modes will have autocompletion. There are five settings for this feature:
* `jsf-primefaces-intellisense.languages` is for language modes based on HTML.


## Contributions
You can request new features and contribute to the extension development on its [repository on GitHub](https://github.com/primefaces-extensions/faces-intellisense/issues). Look for an issue you're interested in working on, comment on it to let me know you're working on it and submit your pull request! :D

## What's new

Check out the [changelog](https://github.com/primefaces-extensions/faces-intellisense/blob/main/CHANGELOG.md) for the current and previous updates.

## Usage
The extension will automatically display the completion options. In case the completion is not showing, you can run the command by pressing `Ctrl+Shift+P`(`Cmd+Shift+P` for Mac) and then typing "JSF and PrimeFaces Cache".

## Special thanks to
* [Per-Steinar Karlsen](https://github.com/per-steinar). 
* [Tito Sanchez](https://github.com/tmsanchez). 


### More User Settings
The extension supports a few user settings, changes to these settings will be automatically recognized and the caching process will be re-executed.


![](https://github.com/primefaces-extensions/faces-intellisense/blob/main/images/cache1-animated.gif)
![](https://github.com/primefaces-extensions/faces-intellisense/blob/main/images/cache2-animated.gif)
