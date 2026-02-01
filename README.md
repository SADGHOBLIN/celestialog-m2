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

![screenshot](documentation/site-responsive-mockups.png)

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

- `#161519` Onyx - background colour
- `#834feb` Majorelle Blue - primary theme colour, CTA buttons
- `#63519F` Dusty Grape - semi-transparent, muted surface colour, used to build UI
- `#dcd4ee` Lavender - primary text colour
- `#e8c643` Tuscan Sun - primary accent colour, used for key UI moments

![screenshot](documentation/colour-palette.png)

The rationale for this colour scheme was to enhance the narrative theme of the website: a *dark-mode feel* to mimic the ambience of journaling under the moon.
Purples are a popular choice for dark-mode themes, and align with the *mysticism* of the Tarot Card inspired aesthetic.

Both the purple UI and warm lavender text colour are easy on the eye and reduce eye strain, especially in low-light conditions - making the choices perfect for late-night journaling.

The vibrant *Tuscan Sun* yellow adds a touch of *brilliance* for key features and user moments. The Tarot persona cards light up when selected, enhancing the tactility of user interaction and complimenting the purples used in the main UI.

### Typography:
> [!NOTE]
> TODO: Under development

### Imagery:
> [!NOTE]
> TODO: Under development
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
> [!NOTE]
> TODO: Under development
- ### Existing Features:
- ### Future Features:
---


## Tools & Technologies
> [!NOTE]
> TODO: Under development
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