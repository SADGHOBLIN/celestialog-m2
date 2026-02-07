# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.


## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File | URL | Screenshot | Notes |
| --- | --- | --- | --- | --- |
| root | [404.html](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/404.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://sadghoblin.github.io/celestialog-m2/404.html) | ![screenshot](documentation/validation/html-404.png) | No warnings / errors |
| root | [contact.html](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/contact.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://sadghoblin.github.io/celestialog-m2/contact.html) | ![screenshot](documentation/validation/html-contact.png) | No warnings / errors |
| root | [index.html](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/index.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://sadghoblin.github.io/celestialog-m2/index.html) | ![screenshot](documentation/validation/html-index.png) | No warnings / errors |
| root | [journal.html](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/journal.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://sadghoblin.github.io/celestialog-m2/journal.html) | ![screenshot](documentation/validation/html-journal.png) | No warnings / errors |
| root | [success.html](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/success.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://sadghoblin.github.io/celestialog-m2/success.html) | ![screenshot](documentation/validation/html-success.png) | No warnings / errors |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate my CSS files.

| Directory | File | URL | Screenshot | Notes |
| --- | --- | --- | --- | --- |
| assets/css | [style.css](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/assets/css/style.css) | [CSS Validator](https://jigsaw.w3.org/css-validator/validator?uri=https://sadghoblin.github.io/celestialog-m2) | ![screenshot](documentation/validation/css-style.png) | No errors, and warnings only relate to custom css properties and vendor-prefixed features which are used to ensure cross-browser compatibility |

### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

| Directory | File | URL | Screenshot | Notes |
| --- | --- | --- | --- | --- |
| assets/js | [advisor.js](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/assets/js/advisor.js) | n/a | ![screenshot](documentation/validation/js-advisor.png) | This project uses ES11 features and assumes a modern JS environment where these features are supported. The JSHint warnings are therefore acceptable |
| assets/js | [moon.js](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/assets/js/moon.js) | n/a | ![screenshot](documentation/validation/js-moon.png) | This project uses ES11 features and assumes a modern JS environment where these features are supported. The JSHint warnings are therefore acceptable |
| assets/js | [notes.js](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/assets/js/notes.js) | n/a | ![screenshot](documentation/validation/js-notes.png) | No warnings / errors |
| assets/js | [script.js](https://github.com/SADGHOBLIN/celestialog-m2/blob/main/assets/js/script.js) | n/a | ![screenshot](documentation/validation/js-script.png) ![screenshot](documentation/validation/js-script-module.png) | JSHint does not reliably support top-level `await`, but this is acceptable for use in modern browsers where the javascript script contains `type="module"`, and therefore not invalid |


## Responsiveness

I've tested my deployed project to check for responsiveness issues across mobile, tablet, and desktop screen sizes. There were no major issues found and everything works as intended.

| Page / Section | Mobile | Tablet | Desktop | Notes |
| --- | --- | --- | --- | --- |
| Home | ![screenshot](documentation/responsiveness/mobile-home.png) | ![screenshot](documentation/responsiveness/tablet-home.png) | ![screenshot](documentation/responsiveness/desktop-home.png) | Works as expected |
| About | ![screenshot](documentation/responsiveness/mobile-about.png) | ![screenshot](documentation/responsiveness/tablet-about.png) | ![screenshot](documentation/responsiveness/desktop-about.png) | Works as expected |
| Personas top | ![screenshot](documentation/responsiveness/mobile-personas-1.png) | ![screenshot](documentation/responsiveness/tablet-personas-1.png) | ![screenshot](documentation/responsiveness/desktop-personas-1.png) | Works as expected |
| Personas bot | ![screenshot](documentation/responsiveness/mobile-personas-2.png) | ![screenshot](documentation/responsiveness/tablet-personas-2.png) | ![screenshot](documentation/responsiveness/desktop-personas-2.png) | Works as expected |
| Journal notes | ![screenshot](documentation/responsiveness/mobile-journal-notes.png) | ![screenshot](documentation/responsiveness/tablet-journal-notes.png) | ![screenshot](documentation/responsiveness/desktop-journal-notes.png) | Works as expected |
| Journal advisor | ![screenshot](documentation/responsiveness/mobile-journal-advisor.png) | ![screenshot](documentation/responsiveness/tablet-journal-advisor.png) | ![screenshot](documentation/responsiveness/desktop-journal-advisor.png) | Works as expected |
| Journal modal | ![screenshot](documentation/responsiveness/mobile-journal-modal.png) | ![screenshot](documentation/responsiveness/tablet-journal-modal.png) | ![screenshot](documentation/responsiveness/desktop-journal-modal.png) | Works as expected |
| Contact | ![screenshot](documentation/responsiveness/mobile-contact.png) | ![screenshot](documentation/responsiveness/tablet-contact.png) | ![screenshot](documentation/responsiveness/desktop-contact.png) | Works as expected |
| Success | ![screenshot](documentation/responsiveness/mobile-success.png) | ![screenshot](documentation/responsiveness/tablet-success.png) | ![screenshot](documentation/responsiveness/desktop-success.png) | Works as expected |
| 404 | ![screenshot](documentation/responsiveness/mobile-404.png) | ![screenshot](documentation/responsiveness/tablet-404.png) | ![screenshot](documentation/responsiveness/desktop-404.png) | Works as expected |