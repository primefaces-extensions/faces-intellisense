<div align="center">
<img src="https://raw.githubusercontent.com/primefaces-extensions/faces-intellisense/main/images/jakarta.png" height="70"><img src="https://raw.githubusercontent.com/primefaces-extensions/faces-intellisense/main/images/plus-sign.png" height="70" ><img src="https://raw.githubusercontent.com/primefaces-extensions/faces-intellisense/main/images/vscode.png" height="70" >

# VS Code Intellisense for Jakarta Faces
</div>


[![Version](https://vsmarketplacebadges.dev/version/FlipWarthog.faces-intellisense.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=FlipWarthog.faces-intellisense)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Installs](https://vsmarketplacebadges.dev/installs-short/FlipWarthog.faces-intellisense.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=FlipWarthog.faces-intellisense)
[![Discord Chat](https://img.shields.io/discord/557940238991753223.svg?color=7289da&label=chat&logo=discord&style=for-the-badge)](https://discord.gg/gzKFYnpmCY)

A Visual Studio Code extension that provides component completion in the HTML, XHTML and JSF. Based on the official Taglib definitions.

# Taglib supported for
* Primefaces (8.x, 10.x, 11.x, 12.x, 13.x, 14.x, 15.x)
* Primefaces Extensions (10.x, 11.x, 12.x, 13.x, 14.x, 15.x)
* OmniFaces (3.x, 4.x)
* RichFaces (4.5.x)
* JSF (2.1, 2.2, 2.3)
* Jakarta Faces (4.0, 5.0)


![](https://raw.githubusercontent.com/primefaces-extensions/faces-intellisense/main/images/demo-animated.gif)

## Features

* Automatic detection of xmlns (You must include the namespace mandatory).   
    * Html Basic -> `http://java.sun.com/jsf/html` or `http://xmlns.jcp.org/jsf/html` or `jakarta.faces.html`
    * Faces Core -> `http://java.sun.com/jsf/core` or `http://xmlns.jcp.org/jsf/core` or `jakarta.faces.core`
    * JSTL Core -> `http://xmlns.jcp.org/jsp/jstl/core` or `jakarta.tags.core`
    * Composite Components -> `http://java.sun.com/jsf/composite` or `http://xmlns.jcp.org/jsf/composite` or `jakarta.faces.composite`
    * Facelets Templating -> `http://java.sun.com/jsf/facelets` or `http://xmlns.jcp.org/jsf/facelets` or `jakarta.faces.facelets`
    * PrimeFaces -> `http://primefaces.org/ui` or `primefaces`
    * PrimeFaces Extensions -> `http://primefaces.org/ui/extensions` or `primefaces.extensions`
    * OmniFaces -> `http://omnifaces.org/ui` or `omnifaces.ui`
    * RichFaces -> `http://richfaces.org/rich`
    * RichFaces A4J -> `http://richfaces.org/a4j`

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
* HTML
* XHTML
* JSF
* XML

## Extended Support for Other Language Modes

It's possible to specify which language modes will have autocompletion. There are five settings for this feature:
* `faces-intellisense.languages` is for language modes based on HTML.

## What's new

Check out the [changelog](https://github.com/primefaces-extensions/faces-intellisense/blob/main/CHANGELOG.md) for the current and previous updates.

## Usage
The extension will automatically display the completion options. In case the completion is not showing, you can run the command by pressing <kbd>Ctrl+Shift+P</kbd> (<kbd>Cmd+Shift+P</kbd> for Mac) and then typing "Faces Cache".

### More User Settings
The extension supports a few user settings, changes to these settings will be automatically recognized and the caching process will be re-executed.


![](https://raw.githubusercontent.com/primefaces-extensions/faces-intellisense/main/images/cache1-animated.gif)
![](https://raw.githubusercontent.com/primefaces-extensions/faces-intellisense/main/images/cache2-animated.gif)

## Generate Tag Libraries

To generate or update tag libraries you can do the following:

1. Navigate to `\generator`.
2. Run `npm install`
3. Run `npm run start` to generate new code.

To add a new library or update just edit `\generator\src\index.ts` and run `npm run start`.

## Contributions
You can request new features and contribute to the extension development on its [repository on GitHub](https://github.com/primefaces-extensions/faces-intellisense/issues). Look for an issue you're interested in working on, comment on it to let me know you're working on it and submit your pull request! :D

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/per-steinar"><img src="https://avatars.githubusercontent.com/u/25014042?v=4?s=100" width="100px;" alt="Per-Steinar Karlsen"/><br /><sub><b>Per-Steinar Karlsen</b></sub></a><br /><a href="https://github.com/primefaces-extensions/faces-intellisense/commits?author=per-steinar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tmsanchezdev.blogspot.com/"><img src="https://avatars.githubusercontent.com/u/486370?v=4?s=100" width="100px;" alt="Tito Sanchez"/><br /><sub><b>Tito Sanchez</b></sub></a><br /><a href="https://github.com/primefaces-extensions/faces-intellisense/commits?author=tmsanchez" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/leosj29"><img src="https://avatars.githubusercontent.com/u/2030440?v=4?s=100" width="100px;" alt="Leonardo SJ"/><br /><sub><b>Leonardo SJ</b></sub></a><br /><a href="https://github.com/primefaces-extensions/faces-intellisense/commits?author=leosj29" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FlipWarthog"><img src="https://avatars.githubusercontent.com/u/83613837?v=4?s=100" width="100px;" alt="FlipWarthog"/><br /><sub><b>FlipWarthog</b></sub></a><br /><a href="#maintenance-FlipWarthog" title="Maintenance">🚧</a> <a href="https://github.com/primefaces-extensions/faces-intellisense/commits?author=FlipWarthog" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://melloware.com"><img src="https://avatars.githubusercontent.com/u/4399574?v=4?s=100" width="100px;" alt="Melloware"/><br /><sub><b>Melloware</b></sub></a><br /><a href="https://github.com/primefaces-extensions/faces-intellisense/commits?author=melloware" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DebasishWe"><img src="https://avatars.githubusercontent.com/u/125366228?v=4?s=100" width="100px;" alt="DebasishWe"/><br /><sub><b>DebasishWe</b></sub></a><br /><a href="#userTesting-DebasishWe" title="User Testing">📓</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jeffbrower.com"><img src="https://avatars.githubusercontent.com/u/19825556?v=4?s=100" width="100px;" alt="Jeff Brower"/><br /><sub><b>Jeff Brower</b></sub></a><br /><a href="https://github.com/primefaces-extensions/faces-intellisense/issues?q=author%3Ajbrower2" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
