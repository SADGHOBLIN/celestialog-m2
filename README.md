# celestialog


## Project Rationale:
Developer: Matt McCarthy ([SADGHOBLIN](https://www.github.com/SADGHOBLIN))

Live site can be viewed here: [celestialog | Journaling App](https://sadghoblin.github.io/celestialog-m2/)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/SADGHOBLIN/celestialog-m2)](https://www.github.com/SADGHOBLIN/celestialog-m2/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/SADGHOBLIN/celestialog-m2)](https://www.github.com/SADGHOBLIN/celestialog-m2/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/SADGHOBLIN/celestialog-m2)](https://www.github.com/SADGHOBLIN/celestialog-m2)
[![badge](https://img.shields.io/badge/deployment-GitHub_Pages-purple)](https://sadghoblin.github.io/celestialog-m2)


**Celestialog** is a journaling web application built primarily with HTML, CSS, and JavaScript, designed to explore how interactive systems and narrative framing can encourage a more consistent and meaningful journaling practice.

Whilst traditional journaling tools or apps tend to focus on minimalism and self discipline, **Celestialog** introduces optional narrative-driven features that aim to support reflection, curiousity, and emotional engagement in an user's journaling practice through the **Tarot Advisor** system.

The target audience consists of users who actively journal, but are **looking to find a more expressive way of writing**. The project also aims to **support users who are new to journaling** - particularly those who have **struggled to maintain consistency**, or may have not yet found a work that works for them. 

Thematically, the moon phase data in **Celstialog** reinforces the push for consistency, framing the user to *journal under the gaze of the moon*. Since the **majority of people journal early morning or late evening**, the lunar cycle provides a **natural and symbolic backdrop for reflection**.

The app currently focuses on *dark mode*, targetting users who journal at night time. Further development plans include the introduction of a *day mode toggle* with a *sun tracker* to better support users who prefer to journal in the morning.

Two core experiemental features define the experience:
- The ***Tarot Card Advisor*** system adds a narrative experience for the user, allowing them converse, ask questions, and seek guidance from one of the AI adviors with personalities inspired by Tarot Card archetypes.
- The ***Red Moon*** system gently introduces accountability for missed journaling days. Rather than punishing the user, missed entries are representing symbolically, encouraging awareness and consistency.

However, these unique features are **optional** and more casual visitors to the website are able to access a thematic, lightweight, and private journaling space that stores their notes data locally. The *Advisor* system only draws resources when engaged with, and the *Red Moons* can be disabled at any time. 

**Celestialog** acts as a prototype for future development, with the aim of building a consistent user base to source valuable feedback for further iterations. Potential extentions include a richer pool of Tarot Advisors, more distinct and developed AI personas, optional cloud-based storage for access across multiple devices, expanded visual illustration work, ambient sound or music, and deeper personalisation features.

![screenshot](documentation/visual-design/site-responsive-mockups.png)

source: [celestialog-m2 amiresponsive](https://fireship.dev/amiresponsive?url=https://sadghoblin.github.io/celestialog-m2/)

---


## UX
### The 5 Planes of UX

#### 1. Strategy

**Purpose**:
> *A mystical and atmospheric journaling tool, where users can write, reflect, and consult archetypal advisors - all privately, locally, and without accounts.*

- Create an immersive and atmospheric journaling experience for users.
- Offer users the means to reflect on their day with environmental context, such as *moon phases* and *day-time, night-time themes*.
- Allow users to interact with *persona-based advisors* for guidance or inspiration in their journaling.

**Primary User Needs**:
- Create notes and journal entries that can be saved, edited, and deleted.
- Accessible in browser, without requiring sign-ups or cloud storage, making it a private experience for the user.
- Tools that support creativity, immersion, and introspection through dialouge with the self.

**Primary User Profiles**:
- The *Moon Gazer*:
> *"Those who may find comfort in immersing themselves in the astrological to empower their journaling. They find inspiration and meaning through understanding the phases of the moon."* 

- The *Playful Explorer*:
> *"Keen, and drawn to the interactive advisor personas, they find magic through world-building in dialogue to explore their inner thoughts and ideas."*

- The *Reflective Writer*:
> *"A thoughtful soul looking for a quiet, personal space to explore their emotions and experiences. They do not necessarily seek the guidance of advisors, but are grateful for the option."*

**Business Goals**:
- Create a unique, story-driven journaling experience that distinguishes itself thematically from other generic note-taking / wellness apps.
- Improve user retention by offerring an engaging USP to accompany standard journaling / note-taking tools.
- Build a scalable framework and prototype, that allows for further development into future features or products: *tarot-like decks, physical books, persona packs, and interactive fiction*.

#### 2. Scope

**Features**:
- (see a breakdown here: [Features](#features))

**Content Requirements**:
- Responsive site that works across all devices and common browsers.
- Functional journal with features to write, edit, and delete entries.
- Interact with an advisor about journaling, with the option to select from multiple personas.
- Moon information displayed to the user is clear, accurate, and up to date.
- Onboarding text containing brief instructions to get the user set-up and accustomed to features.
- Unified and coherent theme to set the appropriate tone for an immersive feeling app.

#### 3. Structure

**Information Architecture**:
- **Navigation menu**:
    - Accessible links in the navbar to relevant sections: Home, About, Contact.
- **Information layout**:
    - Structure of main website features arranged in order of priority: *Journal > Advisor chat > Persona selection > Moon information.*
- **Hierarchy**:
    - Easy to understand navigation bar.
    - Main content features, structured appropriately.
    - Clear call-to-action buttons.
    - Contact information in footer, with prominent placement of social media links.

**User Flow**:
- Flowchart diagram to illustrate the primary user flow through the main content features.
```mermaid
flowchart TD
    A{{Celestialog}} --> Aa[[Home Page]]
    Aa --> B{Journaling Interface}

    B --> Ba{{Display Moon}}
    Ba --> Bb[Change between day / night mode]

    B --> C(New User)
    C --> Ca[Create first note / entry]
    Ca --> Cb([Note is pre-populated with help instructions])

    B --> D(Existing User)
    D --> Da[Add note] & Db[Edit note] & Dc[Delete note]

    B --> E{Advisor chat}
    E --> Eb[User selects from different advisor personas]
    E --> Ea[User input to send message to advisor]

    Ea --> Fa{{Local AI model from WebLLM}}
    Da & Db & Dc --> F[(Saved in Local Storage)]

    Fa --> Fb([Feedback response to user])
    Fb --> E
    Fa <--> F
```
- Users may also navigate to additional About, Contact pages to further learn about the website, or contact the developer.

#### 4. Skeleton

**Wireframes**:
- (see illustrations here: [Wireframes](#wireframes))

#### 5. Surface

**Visual Design Elements**:
- [Colours](#colour-scheme) (see below)
- [Typography](#typography) (see below)
- [Imagery](#imagery) (see below)

### Colour Scheme:

I used [coolors.co](https://coolors.co/161519-834feb-63519f-dcd4ee-e8c643) to generate my colour palette.

[Realtime Colours](https://www.realtimecolors.com/?colors=dcd4ee-161519-9924dd-63519f-c4cd26&fonts=DM%20Sans-DM%20Sans) was a useful tool for exploring ideas and visualising the colour palette in a mockup form.

- `#161519` Onyx - background colour
- `#834feb` Majorelle Blue - primary theme colour, CTA buttons
- `#63519F` Dusty Grape - semi-transparent, muted surface colour, used to build UI
- `#dcd4ee` Lavender - primary text colour
- `#e8c643` Tuscan Sun - primary accent colour, used for key UI moments

![screenshot](documentation/visual-design/colour-palette.png)

The rationale for this colour scheme was to enhance the narrative theme of the website: a *dark-mode feel* to mimic the ambience of journaling under the moon.
Purples are a popular choice for dark-mode themes, and align with the *mysticism* of the Tarot Card inspired aesthetic.

Both the purple UI and warm lavender text colour are easy on the eye and reduce eye strain, especially in low-light conditions - making the choices perfect for late-night journaling.

The vibrant *Tuscan Sun* yellow adds a touch of *brilliance* for key features and user moments. The Tarot persona cards light up when selected, enhancing the tactility of user interaction and complimenting the purples used in the main UI.

### Typography:

Fonts were sourced from [Google Fonts](https://fonts.google.com/), with the primary goal of utilising a clean and readable font.

- [DM Sans](https://fonts.google.com/specimen/DM+Sans/) is a popular sans serif font that is particularly effective at smaller sizes, but also adaptable for clean headings.
![screenshot](documentation/visual-design/font-sample-dmsans.png)

- [Inknut Antiqua](https://fonts.google.com/specimen/Inknut+Antiqua) is an interesting antiqua font that is designed to mimic handwriting styles that were common in the 15th and 16th centuries. This compliments the feel of mysticism and tarot-inspired themes and makes for a striking title font that resonates with traditional methods of pen and paper journaling.
![screenshot](documentation/visual-design/font-sample-inknutantiqua.png)

- [Google Fonts Icons](https://fonts.google.com/icons) were also used throughout the site, such as in lists and buttons.

### Imagery:

A range of imagery was used throughout the site to compliment the website's design elements.

The main illustrations are the Tarot cards that represent the various AI chat personas. These are adaptations of the classic [Rider-Waite-Smith tarot](https://steve-p.org/cards/RWSa.html) cards, which are instantly recognisable. Not only are these designs now in the public domain and free to use, but capture a user's attention through their in-built symbolism.

Because of this, I am able to creatively adapt their artwork to match my app and create a recognisable look, but also able to take advantage of any in-built preconceptions that a user has, allowing the cards to, somewhat, 'speak for themselves'.

Tarot Advisor Cards, with golden alt versions
![screenshot](documentation/visual-design/tarot-illustrations.png)

Alongide the tarot cards, another key feature of **Celestialog** is the moon phase tracker. The moon phases are one of the identifying components of the user's saved notes, therefore I wanted to create an image for each phase by hand, so that the art style closely aligned with the tarot cards.

Moon Phase Icons
![screenshot](documentation/visual-design/moon-illustrations.png)

---


## Wireframes

To follow best practice, wireframes were constructed for mobile, tablet, and desktop. [Figma](https://figma.com/) was used to design the wireframes for this site, and the full file can be viewed [in the browser, here](https://www.figma.com/design/N0rk5xWMFahP6trWY6VegF/celestialog-wireframes?node-id=0-1&t=Mc1hnYq4OYLsRT0t-1).

| Page | Wireframe - desktop, tablet, mobile |
| --- | --- |
| index.html | ![screenshot](documentation/wireframes/home-1.png) ![screenshot](documentation/wireframes/home-2.png) ![screenshot](documentation/wireframes/home-3.png)|
| journal.html | ![screenshot](documentation/wireframes/journal-1.png) ![screenshot](documentation/wireframes/journal-2.png) ![screenshot](documentation/wireframes/journal-3.png) |
| about.html | ![screenshot](documentation/wireframes/about.png) |
| contact.html | ![screenshot](documentation/wireframes/contact.png) |
---


## User Stories
- A list of user stories can be found on this [Project's Board](https://github.com/users/SADGHOBLIN/projects/4/views/1), which was used to track development progress, using [MoSCoW Prioritisation](#moscow-prioritsation).
- **Acceptance criteria** and **tasks** for each can user story can be found by following the project board link.
- More information regarding the [Agile Development Process](#agile-development-process) that was used for this project can be found later in the document.

| User Story & Classification | Project Board Link | Description |
| --- | --- | --- |
| #1: ![badge](https://img.shields.io/badge/must_have-b60205) | [Intuitive navigation and responsive design](https://github.com/SADGHOBLIN/celestialog-m2/issues/1) | As a first-time visitor, I should be able to quickly and easily navigate through the website without much guidance. The design and layout of information should infer where I need to go next, and how. I expect the website to respond according to my screen-size, or type of device, whilst still providing a quality experience. |
| #2: ![badge](https://img.shields.io/badge/must_have-b60205) | [Create and save journal entries](https://github.com/SADGHOBLIN/celestialog-m2/issues/2) | As a first-time user, I expect to be able to create a new note / entry on my device of choice. I should be able to save the entry so that I can come to view it at a later date. |
| #3: ![badge](https://img.shields.io/badge/must_have-b60205) | [Edit and delete journal entries](https://github.com/SADGHOBLIN/celestialog-m2/issues/3) | As a returning user to the website, I would like to be able to make edits to my notes, or delete unwanted entries. This would help keep my notes organised. |
| #4: ![badge](https://img.shields.io/badge/must_have-b60205) | [Moon tracker information](https://github.com/SADGHOBLIN/celestialog-m2/issues/4) | As a moon-gazer, I want to be able to see the current phase that the moon is in, along with other information about the night's moon. Understanding the phase of the moon may add an unseen level of atmosphere to my journaling experience, allowing me to feel more connected to my writing. |
| #5: ![badge](https://img.shields.io/badge/must_have-b60205) | [About and help sections](https://github.com/SADGHOBLIN/celestialog-m2/issues/5) | As a new user, I want to be able to find out more information about the website and its purpose. This would help me better understand how it may be of use to me, and allow me to better immerse myself in the experience. A tutorial / help section would be useful in helping me understand how to use specific features. |
| #6: ![badge](https://img.shields.io/badge/should_have-1d76db) | [Contact section](https://github.com/SADGHOBLIN/celestialog-m2/issues/6) | As a user, I would like to be able to get in contact with the developer in case I have any questions about the website, or I spot a problem that I would like to report. It would be helpful to have various means of contacting the developer, so that I can use the one that best suits my preference. |
| #7: ![badge](https://img.shields.io/badge/should_have-1d76db) | [Chat with journal planning advisor](https://github.com/SADGHOBLIN/celestialog-m2/issues/7) | As someone new to journaling, I would find it helpful to have access to some prompts to help me start writing. This would make me feel more immersed in the process, reduce hesitation and friction, and provide a better experience for someone new to journaling. |
| #8: ![badge](https://img.shields.io/badge/should_have-1d76db) | [Add advisor personas](https://github.com/SADGHOBLIN/celestialog-m2/issues/8) | As a frequent user, I would like to further indulge in immersive features - I would like to chat with different advisor personas that are thematically relevant to the site's mood and tone. This would provide a more enriching user experience by adding an additional layer to the site's core functionality that would keep me coming back. |
| #9: ![badge](https://img.shields.io/badge/could_have-0e8a16) | [Light theme mode with a todo list](https://github.com/SADGHOBLIN/celestialog-m2/issues/9) | As a frequent user who has enjoyed using the website for its moon and journaling features, I would like if I could also use it for 'day-time' features, such as making specific todo lists and task tracking. This could elevate the website from being solely a 'night-time' companion, to a full-day companion that allows me to keep track of my notes, lists, and journal in one place - with the additional advisor functionality. |
| #10: ![badge](https://img.shields.io/badge/could_have-0e8a16) | [Error pages](https://github.com/SADGHOBLIN/celestialog-m2/issues/10) | As a user, I want to be notified of any errors that prevent me from using or accessing the website. I should then be able to direct myself easily back to the home page so that I can continue using the site. |
---


## Features

- ### Existing Features:

| Feature | Notes | Screenshot |
| --- | --- | --- |
| Navbar | Simple navigation menu with the aim of keeping the focus on the main journaling app. Fully responsive across all screen sizes and available on all web pages. Provides links to the home page, journal page, and contact page, and allows the user to navigate the site without needing their browser buttons. | ![screenshot](documentation/features/navbar.png) |
| Home page | Contains an animated logo in the landing section and a main CTA button to direct the user to the main journal page. Acts as a lightweight landing page, with the rationale that returning users would like to get back to the journal app as efficiently as possible. Leads into the About section, should the user wish to learn more before progressing to the app. | ![screenshot](documentation/features/home-page-cta.png) |
| About section | Gentle introduction to the site, briefly highlighting the key features and primary purpose of the app. Main user flow is displayed in a simple list, as to not deter the user from trying to learn more about the site's purpose through long paragraphs. | ![screenshot](documentation/features/about.png) |
| Narrative about section | Introduces tarot card personas to the user in more detail, exploring the narrative framing of the site and the purpose of the tarot card personas. | ![screenshot](documentation/features/narrative-about.png) |
| Journal app | Main journaling space for the user, allowing them to create, save, edit, and delete notes. Responsive across all screen sizes, and amends layout to allow for a more pleasant user experience on different devices. | ![screenshot](documentation/features/journal-app.png) |
| App buttons | For the notetaking functionality: save, create new, view notes, view recycle bin. Save button is the primary button and therefore given more space and a more dominant colour. | ![screenshot](documentation/features/note-buttons.png) | 
| Save note function | Ability to save notes, with a 'note saved!' notification to give visual feedback to the user. Notes are saved to local storage and accessible offline. Note content data is tied to a title, the moon phase, moon illustration - represented with an icon - and date of creation. Traditional note taking apps tend to contain simple information, like the date and time, and Celestialog aims to add another narrative layer to connect the user to their notes. | ![screenshot](documentation/features/save-note.png) |
| View saved notes | Allows users to open saved notes, or delete them by moving them to the recycle bin. These notes are displayed in a pop up modal, allowing the user to quickly open and close the modal when needed, offering a seamless experience with writing notes. | ![screenshot](documentation/features/saved-notes.png) |
| Red Moon notes | Indicates to the user missed journaling days, and this feature can be toggled on/off based on user preference. These 'red moons' act as a gentle accountability reminder for the user and encourages them to write every day. This reminder is stylised as 'red moons' to contribute to the site's overall thematic narrative. Users are able to go back and add content to these notes, to make up for missed days, but are still saved as a 'red moon'. | ![screenshot](documentation/features/red-moons.png) |
| Recycle bin | Allows user to recover deleted notes, in case they accidently delete a note. Once the user deletes them from the recycle bin, they are gone permanantly - this mimics the recycle bin system found on computers and mobile, allowing the user to handle their notes in a familar way. | ![screenshot](documentation/features/recycle-bin.png) |
| Chat advisor | AI Chat window, with tarot archetype inspired personalities, styled thematically to integrate with the site's brand and narrative. The user can select a persona, and write to the AI advisor in a chat window, similar to tools like ChatGPT or messaging apps. This makes the system familiar and intuitive to use. | ![screenshot](documentation/features/chat-advisor.png) |
| Chat help commands | The chat window contains hints and help for the user, integrated into the experience, and in a different colours to the regular advisor messages as to easily distinguish the difference between the various message types. Allows users to learn how to use the chat whilst asking for help/prompts. Reminds users to select a persona before continuing, and provides instructions and guidance if asked for. Hints and help disappear once the user sends a message, preventing instructions from clogging up the chat window. The hints are subtle, as to not hinder an experienced user of the site, but also noticeable for new users who may need some guidance. | ![screenshot](documentation/features/help-commands-1.png) ![screenshot](documentation/features/help-commands-2.png) ![screenshot](documentation/features/help-commands-3.png) ![screenshot](documentation/features/help-commands-4.png) |
| Tarot card personas | A satisfying way to choose from various chat personalities which provide different response styles to user messages. Responsive to hovering and clicking, providing a satifying user experience. The cards change colour, to clearly indicate when they have been selected, and have motion effects to indicate that the user is waiting for a response. | ![screenshot](documentation/features/tarot-cards.png) |
| Moon data | Displays the daily moon information to the user, tailored to their IP location. Shows today's moon phase, with an image, today's date, and the time that the moon is visible. This information is also then injected into the user's saved notes for the specific date they created it. The data is refreshed every 12 hours, and a copy is stored in local storage as to not continually pull API information, and so that users are unaffected if they temporaily go offline. | ![screenshot](documentation/features/moon-data.png) |
| Contact page | Allows user to send a message, or email the developer with feedback, bugs, or other content. | ![screenshot](documentation/features/contact.png) |
| Success page | Indicates to user that the form was submitted, and allows them to return to the home page without needing to use browser buttons - actual form submission are out of the scope of this project. | ![screenshot](documentation/features/success.png) |
| Error 404 page | Informs user that something has gone wrong, and allows them to return to the home page without the need for browser buttons. | ![screenshot](documentation/features/error404.png) |

- ### Future Features:

- **Full Tarot deck of personas**: The site currently only has 3 unique advisor personalities. I would like to eventually create a fully illustrated deck, to provide a more robust experience. This opens up opportunities for monetisation in the future, as well as user-submitted designs, and more uniquely personalised experiences for users.

- **Refined LLM prompts**: Each tarot archetype personality uses a system prompt to dictate its personality. Future development could lead to a more powerful and refined language model that is better tailored to providing journaling guidance and prompts to the user, customised to the needs of the celestialog app.

- **Sun mode**: As previously mentioned, users will journal mostly in the early mornings or late evenings. Celestialog currently focuses on night-time writers, and a cohesive sun-mode that could be toggled on will certainly expand the user base for the website. The aim would be to provide a full overhaul of the website that can be toggled between **sun-mode** and **moon-mode**, complete with sun tracking information, similar to the current moon tracker.

- **Full ambient experience**: The vision is for celestialog to provide a rich, ambient experience to the user. Music and sound play a huge part in cultivating a rich atmosphere, and future development should include optional music that help curate an inspiring place for journaling.

- **Cloud-based storage option**: Currently, a nice feature about celestialog is that users do not have to sign in with their email, or worry about their data being shared - both their notes and LLM are essentially all local. However, some users may benefit from the option to save their notes in the cloud, so that they have a back-up, and can access their notes across various devices of their choosing.

---


## Tools & Technologies

 Tool / Tech | Use |
| --- | --- |
| [![badge](https://img.shields.io/badge/Markdown_Builder-grey?logo=markdown&logoColor=000000)](https://markdown.2bn.dev) | Generate README and TESTING templates |
| [![badge](https://img.shields.io/badge/Git-grey?logo=git&logoColor=F05032)](https://git-scm.com) | Version control (`git add`, `git commit`, `git push`) |
| [![badge](https://img.shields.io/badge/GitHub-grey?logo=github&logoColor=181717)](https://github.com) | Secure online code storage |
| [![badge](https://img.shields.io/badge/VSCode-grey?logo=htmx&logoColor=007ACC)](https://code.visualstudio.com) | Local IDE for development |
| [![badge](https://img.shields.io/badge/HTML-grey?logo=html5&logoColor=E34F26)](https://en.wikipedia.org/wiki/HTML) | Main site content and layout |
| [![badge](https://img.shields.io/badge/CSS-grey?logo=css&logoColor=1572B6)](https://en.wikipedia.org/wiki/CSS) | Design and layout |
| [![badge](https://img.shields.io/badge/JavaScript-grey?logo=javascript&logoColor=F7DF1E)](https://www.javascript.com) | User interaction on the site |
| [![badge](https://img.shields.io/badge/GitHub_Pages-grey?logo=githubpages&logoColor=222222)](https://pages.github.com) | Hosting the deployed front-end site |
| [![badge](https://img.shields.io/badge/Figma-grey?logo=figma&logoColor=F24E1E)](https://www.figma.com) | Creating wireframes |
| [![badge](https://img.shields.io/badge/ChatGPT-grey?logo=googlemessages&logoColor=75A99C)](https://chat.openai.com) | Help debug, troubleshoot, and explain things |
| [![badge](https://img.shields.io/badge/W3Schools-grey?logo=w3schools&logoColor=04AA6D)](https://www.w3schools.com) | Tutorials/Reference Guide |
| [![badge](https://img.shields.io/badge/favicon.io-grey?logo=fi&logoColor=209CEE)](https://favicon.io) | Generating the favicon |
| [![badge](https://img.shields.io/badge/Adobe_PhotoShop-grey?logo=phpstorm&logoColor=blue)](https://www.adobe.com/uk/products/photoshop.html) | Creating tarot and moon illustrations |
| [![badge](https://img.shields.io/badge/Adobe_Illustrator-grey?logo=instapaper&logoColor=orange)](https://www.adobe.com/uk/products/illustrator.html) | Creating moon symbols |
| [![badge](https://img.shields.io/badge/Google_Fonts-grey?logo=googlefonts&logoColor=green)](https://fonts.google.com/) | Fonts and icons |
| [![badge](https://img.shields.io/badge/WebLLM-grey?logo=ollama&logoColor=yellow)](https://webllm.mlc.ai/) | Local LLM engine for chat advisor functionality |
| [![badge](https://img.shields.io/badge/ipGeolocation.io-grey?logo=pinboard&logoColor=purple)](https://ipgeolocation.io/astronomy-api.html) | Astronomy API for moon data information |

---


## Agile Development Process
> [!NOTE]
> TODO: Under development
- ### GitHub Projects:
- ### GitHub Issues:
- ### MoSCoW Priorisation:
--- 


## Testing
> [!IMPORTANT]
> For all testing, please refer to the [TESTING.md](TESTING.md) file.
---


## Deployment
> [!NOTE]
> TODO: Under development
- ### GitHub Pages:
- ### Local Development:
- ### Cloning:
- ### Forking:
- ### Local vs Deployment:
---


## Credits
> [!NOTE]
> TODO: Under development
- ### Content:

| Source | Notes |
| --- | --- |
| [IPGeolocation.io](https://ipgeolocation.io/astronomy-api.html) | Astronomy API used to import data about moon phases and times. The [documentation](https://ipgeolocation.io/astronomy-api.html#documentation-overview) helped with setting up the API. |
| [WebLLM](https://webllm.mlc.ai/docs/) | WebLLM's In-browser language models were used to set up the advisor chat system. Their [github](https://github.com/mlc-ai/web-llm) helped with the set up and implementation of the engine, and the website primarily utilises `Llama 3.2 3B`. |
| [OpenAI Documentation](https://platform.openai.com/docs/api-reference/chat/create) | Documentation from Open AI helped improve understanding of how to 'talk' to the language models. |
| [ChatGPT](https://chatgpt.com/) | Used for debugging, help with code logic, and understanding of concepts. |
| [ITower's YouTube Video](https://www.youtube.com/watch?v=TNM2nHnCyCg) | '*Build a notes app with HTML CSS JavaScript*' video from ITower was used as the primary building block and inspiration for this website. This provided a structural foundation for the website's primary note-taking feature.
| [w3schools - JavaScript Dates](https://www.w3schools.com/js/js_dates.asp) | Helped build understanding of JS date objects, which are used as a method of identifying user notes through a unqiue timestamp ID. |
| [Mozilla JavaScript docs - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) | Provided useful reference to various array methods that were used to access, manipulate, and transform array data. Great for handling the user notes data. |
| [Sentry.io - JavaScript Answers](https://sentry.io/answers/remove-specific-item-from-array/) | More help on understanding use cases for various array methods, contributing to the finding of the solution for 'back-filling missed journaling days, as seen in my code. |
| [Mozilla JavaScript docs - Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) | Again, useful documentation. Used when realising that my code was getting too complicated for a single file, and helped with rebuilding the codebase into a more organised structure. |
| [Realtime Colors](https://www.realtimecolors.com/?colors=dcd4ee-161519-9924dd-63519f-c4cd26&fonts=DM%20Sans-DM%20Sans) | Visualises colour palettes and fonts on a website, to check how colour choices look in realtime on different devices. |
| [WebLLM Documentation - streaming chat completion](https://webllm.mlc.ai/docs/user/basic_usage.html#streaming-chat-completion) | Documentation for creating the typing effect when a response is displayed from the engine. Amended with the help of ChatGPT to create a effective solution for this specific website. |



- ### Media:
- ### Acknowledgements: