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
| Home (Index) | ![screenshot](documentation/responsiveness/mobile-home.png) | ![screenshot](documentation/responsiveness/tablet-home.png) | ![screenshot](documentation/responsiveness/desktop-home.png) | Works as expected |
| About | ![screenshot](documentation/responsiveness/mobile-about.png) | ![screenshot](documentation/responsiveness/tablet-about.png) | ![screenshot](documentation/responsiveness/desktop-about.png) | Works as expected |
| Personas top | ![screenshot](documentation/responsiveness/mobile-personas-1.png) | ![screenshot](documentation/responsiveness/tablet-personas-1.png) | ![screenshot](documentation/responsiveness/desktop-personas-1.png) | Works as expected |
| Personas bot | ![screenshot](documentation/responsiveness/mobile-personas-2.png) | ![screenshot](documentation/responsiveness/tablet-personas-2.png) | ![screenshot](documentation/responsiveness/desktop-personas-2.png) | Works as expected |
| Journal notes | ![screenshot](documentation/responsiveness/mobile-journal-notes.png) | ![screenshot](documentation/responsiveness/tablet-journal-notes.png) | ![screenshot](documentation/responsiveness/desktop-journal-notes.png) | Works as expected |
| Journal advisor | ![screenshot](documentation/responsiveness/mobile-journal-advisor.png) | ![screenshot](documentation/responsiveness/tablet-journal-advisor.png) | ![screenshot](documentation/responsiveness/desktop-journal-advisor.png) | Works as expected |
| Journal modal | ![screenshot](documentation/responsiveness/mobile-journal-modal.png) | ![screenshot](documentation/responsiveness/tablet-journal-modal.png) | ![screenshot](documentation/responsiveness/desktop-journal-modal.png) | Works as expected |
| Contact | ![screenshot](documentation/responsiveness/mobile-contact.png) | ![screenshot](documentation/responsiveness/tablet-contact.png) | ![screenshot](documentation/responsiveness/desktop-contact.png) | Works as expected |
| Success | ![screenshot](documentation/responsiveness/mobile-success.png) | ![screenshot](documentation/responsiveness/tablet-success.png) | ![screenshot](documentation/responsiveness/desktop-success.png) | Works as expected |
| 404 | ![screenshot](documentation/responsiveness/mobile-404.png) | ![screenshot](documentation/responsiveness/tablet-404.png) | ![screenshot](documentation/responsiveness/desktop-404.png) | Works as expected |


## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues. There are no known issues, and site also behave responsively as expected.

| Page | Chrome | Firefox | Edge | Notes |
| --- | --- | --- | --- | --- |
| Home (Index) | ![screenshot](documentation/browsers/chrome-home.png) | ![screenshot](documentation/browsers/firefox-home.png) | ![screenshot](documentation/browsers/edge-home.png) | Works as expected |
| About | ![screenshot](documentation/browsers/chrome-about.png) | ![screenshot](documentation/browsers/firefox-about.png) | ![screenshot](documentation/browsers/edge-about.png) | Works as expected |
| Personas top | ![screenshot](documentation/browsers/chrome-personas-1.png) | ![screenshot](documentation/browsers/firefox-personas-1.png) | ![screenshot](documentation/browsers/edge-personas-1.png) | Works as expected |
| Personas bot | ![screenshot](documentation/browsers/chrome-personas-2.png) | ![screenshot](documentation/browsers/firefox-personas-2.png) | ![screenshot](documentation/browsers/edge-personas-2.png) | Works as expected |
| Journal notes | ![screenshot](documentation/browsers/chrome-journal-notes.png) | ![screenshot](documentation/browsers/firefox-journal-notes.png) | ![screenshot](documentation/browsers/edge-journal-notes.png) | Works as expected |
| Journal advisor | ![screenshot](documentation/browsers/chrome-journal-advisor.png) | ![screenshot](documentation/browsers/firefox-journal-advisor.png) | ![screenshot](documentation/browsers/edge-journal-advisor.png) | Works as expected |
| Journal modal | ![screenshot](documentation/browsers/chrome-journal-modal.png) | ![screenshot](documentation/browsers/firefox-journal-modal.png) | ![screenshot](documentation/browsers/edge-journal-modal.png) | Works as expected |
| Contact | ![screenshot](documentation/browsers/chrome-contact.png) | ![screenshot](documentation/browsers/firefox-contact.png) | ![screenshot](documentation/browsers/edge-contact.png) | Works as expected |
| Success | ![screenshot](documentation/browsers/chrome-success.png) | ![screenshot](documentation/browsers/firefox-success.png) | ![screenshot](documentation/browsers/edge-success.png) | Works as expected |
| 404 | ![screenshot](documentation/browsers/chrome-404.png) | ![screenshot](documentation/browsers/firefox-404.png) | ![screenshot](documentation/browsers/edge-404.png) | Works as expected |


## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues. I found that there were no major warnings, and the results for both mobile and desktop were very good.

| Page | Mobile | Desktop |
| --- | --- | --- |
| Home (Index) | ![screenshot](documentation/lighthouse/mobile-home.png) | ![screenshot](documentation/lighthouse/desktop-home.png) |
| Journal | ![screenshot](documentation/lighthouse/mobile-journal.png) | ![screenshot](documentation/lighthouse/desktop-journal.png) |
| Contact | ![screenshot](documentation/lighthouse/mobile-contact.png) | ![screenshot](documentation/lighthouse/desktop-contact.png) |
| Success | ![screenshot](documentation/lighthouse/mobile-success.png) | ![screenshot](documentation/lighthouse/desktop-success.png) |
| 404 | ![screenshot](documentation/lighthouse/mobile-404.png) | ![screenshot](documentation/lighthouse/desktop-404.png) |


## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page / Feature | Expectation | Test | Result | Screenshot |
| --- | --- |  --- |  --- |  --- |
| Navbar | Feature is expected to have working and accessible navigation links. | Checked navigation links for functionality and accessibility. | Links are accessible, fully functional, and direct user to expected section. | ![screenshot](documentation/defensive/nav-home.png) ![screenshot](documentation/defensive/nav-journal.png) ![screenshot](documentation/defensive/nav-contact.png) |
| Home CTA buttons | Both buttons are expected to direct the user to the journal page, which is the sites main feature. | Clicked through on both buttons to ensure destination is correct. | Button takes the user to the journal page as expected. | ![screenshot](documentation/defensive/main-cta-1.png) ![screenshot](documentation/defensive/main-cta-2.png) ![screenshot](documentation/defensive/main-cta-destination.png) |
| Journal save button | The user should be able to save their notes using the save button. If the user tries to save a blank note, an error will show to prevent the user from saving blank notes, which will clog up their journal. | Try to save an empty note, and try to save a note with content. | Feature behaves as intended. The user receives an error when they tried to save a blank note, and a success message when their note with content is saved | ![screenshot](documentation/defensive/button-save-error.png) ![screenshot](documentation/defensive/button-save-success.png) |
| Journal override/unsaved changes check | If the user attempts to save over their previous note, or take an action that will discard their changed content (such as creating a new note, opening a different note) then they will receive a prompt to ask them whether they would like to save their changes. | Attempt to create a new note whilst having unsaved changes. | A pop-up window is displayed to the user, giving them the opportunity to save their changes. Clicking save overrides their note and saves their progress. | ![screenshot](documentation/defensive/button-save-override-check.png) ![screenshot](documentation/defensive/button-save-override-success.png) |
| Open saved note | Feature is expected to open any saved note from the modal when the user clicks open note button. | Try to open a saved note from the modal menu | Note is opened successfully and loaded into the interface. | ![screenshot](documentation/defensive/saved-modal-open.png) ![screenshot](documentation/defensive/saved-note-open.png) |
| Delete saved note | Delete button from modal menu is expected to remove the note from saved notes, and into the recycle bin ready to be deleted permanantly or restored | Attempt to delete a note using the delete button. | Note is successfully removed from the saved notes UI and moved into the recycle bin. | ![screenshot](documentation/defensive/saved-modal-open.png) ![screenshot](documentation/defensive/deleted-modal-open.png) ![screenshot](documentation/defensive/deleted-bin-open.png) |
| Restore deleted note from recycle bin | Restoring a note from the recycle bin should remove it from the recycle bin and move it back into the saved notes UI. | Click the restore button on a note in the recycle bin. | Note is correctly removed from the recycle bin and moved back into the saved notes modal. | ![screenshot](documentation/defensive/deleted-bin-open.png) ![screenshot](documentation/defensive/deleted-bin-restored.png) ![screenshot](documentation/defensive/saved-modal-open.png) |
| Fill gaps for missed journaling days with Red Moons | Feature is expected to fill in missed journaling days with a placeholder note, stylised as a 'red moon'. If working correctly, one 'red moon' should be created for each day between any two user created notes. | Create notes with a large gap between dates to check if the fill function works correctly, and across a changing month. | Notes are filled correctly, and accurately calculate the dates even over a changing month. | ![screenshot](documentation/defensive/fill-before.png) ![screenshot](documentation/defensive/fill-after.png) |
| Permanantly delete note | Deleting a note from the recycle bin should permanantly remove it from the recycle bin and saved notes modal, unable to be recovered. | Try to delete a note that is within the recycle bin. | Note is successfully deleted and cannot be recovered. | ![screenshot](documentation/defensive/deleted-bin-open.png) ![screenshot](documentation/defensive/deleted-bin-restored.png) |
| Toggle missed journaling days on/off | Pressing the toggle button should hide and show the 'red moon' notes from the saved notes modal | Click the toggle button to hide and show the 'red moon' notes | Notes are hidden and made visisble in response to the button being clicked. The text within the button also changes to match the corresponding state. This preference is saved when the modal is open/closed, but resets upon refreshing the page. | ![screenshot](documentation/defensive/fill-after.png) ![screenshot](documentation/defensive/fill-before.png) |
| Toggle between notes and advisor | The buttons to toggle between notes journal and advisor chat should change the app to represent the relevant state. | Click the toggle buttons to see if the UI changes to represent either the notes journal or the advisor chat. | Works as expected, changing the app to represent the relevant state. By default, the notes UI is displayed. | ![screenshot](documentation/defensive/toggle-journal-active.png) ![screenshot](documentation/defensive/toggle-advisor-active.png) |
| Send message to advisor | Clicking send message button or pressing enter should submit the message into the chat window, and await a response from the selected advisor. The user should only be able to do so if they submit a message containing content, and with an advisor selected from the cards. | Try to submit a message into the chat. | As expected, the user's message is sent into the chat window. Once submitted, the user is shown a bubble that indicates the Tarot advisor is 'thinking' whilst they wait for a reply. The tarot card also moves to hint that the advisor is still thinking. Once the reply is ready, the 'thinking' bubble is replaced with the advisor's response. | ![screenshot](documentation/defensive/send-chat-message.png) ![screenshot](documentation/defensive/send-chat-mid-reply.png) ![screenshot](documentation/defensive/send-chat-full-reply.png) |
| Can't send empty messages | User should be able to send messages with the send button, or by pressing enter. Messages can only be submitted if they content some content other than white space. | Try to send a blank message, or a message with white space. | Clicking send or pressing enter with either a blank message, or just containing whitespace will not send anything. Nothing happens. | ![screenshot](documentation/defensive/send-chat-empty.png) ![screenshot](documentation/defensive/send-chat-whitespace.png) |
| Check advisor is selected before sending a message | Attempting to send a message in the chat without selecting a tarot persona should not work, as the user has not selected a 'personality' to speak to. Trying to do this should be met with an error message. | Attempt to send a message without selecting a tarot card. | As expected, trying to send a valid message without choosing a card will display an error message. The error message is in red, so that is stands out to the user, and then disappears after a few seconds to avoid clogging up the chat. The user can not try to resend another message until the error disppears, to avoid 'creating' too many error messages at once. | ![screenshot](documentation/defensive/send-chat-no-advisor.png) |
| Can't send infinite messages whilst advisor is in 'thinking' mode | If the app is waiting for a response from the AI advisor, the user should not be able to sumbit any more messages until the advisor has replied. This is to prevent crashing of the website, and prevent a backlog of messages being sent to the LLM engine. | Attempt to submit another message whilst waiting for a reply. | Unable to send a message in any way whilst a response has not been fully received from the WebLLM engine. | ![screenshot](documentation/defensive/send-chat-waiting.png) |
| Can't change advisors whilst advisor is in 'thinking' mode | Similar to above, the user should not be able to change their advisor card whilst they are waiting for a reply message. Switching advisors changes the WebLLM engines prompt and personality, and therefore it is built in a way that the user must wait until the previous advisor is fully finished before switching to another. | Attempt to select another advisor by clicking a new card whilst a reply is in progress. | The user is unable to click the tarot cards whilst a response is in progress. Clicking the card does nothing until the reply is fully received. | ![screenshot](documentation/defensive/send-chat-waiting.png) |
| Contact form required fields | The contact form should only allow submission is the required fields are filled with appropriate content. Each field is required, and the email must contain a valid email address. | Attempt to submit a blank form, or with invalid content. | The form correctly prevents submission until the user enters a name, email in valid format, and a message. Once these requirements are met, the user can press the button and they are redirected to a success page that mimics a successful form submission. | ![screenshot](documentation/defensive/contact-required-name.png) ![screenshot](documentation/defensive/contact-required-email.png) ![screenshot](documentation/defensive/contact-email-formatting.png) ![screenshot](documentation/defensive/contact-required-message.png) ![screenshot](documentation/defensive/contact-full-form.png) ![screenshot](documentation/defensive/contact-form-success.png) |
| 404 page | Feature is expected to display a 404 error page for non-existent pages. | Navigated to an invalid URL, `/test.html` to test error handling. | A custom 404 page was correctly displayed, that allowed the user to navigate back to the home page, or use the nav menu. | ![screenshot](documentation/defensive/error404.png) | 
| Accessible features | Site is expected to use high-contrast colours, correct semantic elements, and appropriate structure to be compatible for screen readers and other accessibility features. | Load site into [WAVE](https://wave.webaim.org/report#/https://sadghoblin.github.io/celestialog-m2/index.html) to ensure that site and its features meet accessibility requirements. | Site scores highly on accessibility using WAVE's report. Switching to reduced motion in dev tools also disables animated features as expected. | ![screenshot](documentation/defensive/wave-home.png) ![screenshot](documentation/defensive/wave-journal.png) ![screenshot](documentation/defensive/wave-reduced-motion.png) |