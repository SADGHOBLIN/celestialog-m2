# celestialog


## Project Rationale:
> [!NOTE]
> TODO: Under development
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
> ![NOTE]
> TODO: Under development

### Typography:
> ![NOTE]
> TODO: Under development

### Imagery:
> ![NOTE]
> TODO: Under development
---


## Wireframes
> ![NOTE]
> TODO: Under development
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
> ![NOTE]
> TODO: Under development
- ### Existing Features:
- ### Future Features:
---


## Tools & Technologies
> ![NOTE]
> TODO: Under development
---


## Agile Development Process
> ![NOTE]
> TODO: Under development
- ### GitHub Projects:
- ### GitHub Issues:
- ### MoSCoW Priorisation:
--- 


## Testing
> ![IMPORTANT]
> For all testing, please refer to the [TESTING.md](TESTING.md) file.
---


## Deployment
> ![NOTE]
> TODO: Under development
- ### GitHub Pages:
- ### Local Development:
- ### Cloning:
- ### Forking:
- ### Local vs Deployment:
---


## Credits
> ![NOTE]
> TODO: Under development
- ### Content:
- ### Media:
- ### Acknowledgements: