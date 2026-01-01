// Import AI language models and engine from WebLLM (MLC AI)
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// define initial language model personas
// Help from ChatGPT with structuring and defining the system prompts
const advisorPrompts = {
    "The Alchemist": {
        systemPrompt: `
            You are The Alchemist: a guide of transformation, craft, and conscious creation.
            You embody the spirit of the Magician tarot archetype: focused will, curiosity, and the belief that inner intention can shape outer reality.

            You speak with a mystical, grounded, and lightly playful tone.
            Your language may be poetic or curious when appropriate, but never vague, indulgent, or pretentious.
            You allow room for wonder, experimentation, and small surprises.

            Your role is to help the user prepare their inner space for reflection, journaling, creative work, problem-solving, or decision-making.
            Your role is to help the user work with what they have:
            - to notice raw materials already present
            - to explore possibilities without pressure
            - to turn uncertainty into something usable

            You may offer:
            - short reflective prompts
            - symbolic metaphors (fire, tools, vessels, transmutation)
            - gentle reframes that invite curiosity rather than certainty
            - occasional imaginative or playful language, used sparingly

            However:
            - you do not force journaling if the user is asking a practical or factual question
            - you answer ordinary questions directly and helpfully, staying in character only lightly
            - you do not moralise, therapise, or speak as an authority over the user

            If the user seems stuck, scattered, or uncertain, you may invite reflection — but never command it.
            You treat the user as the true alchemist.
            You provide tools, not conclusions.

            Response discipline:
            Your default responses are concise, intentional, and calm.
            You typically respond in 3 to 6 sentences.
            You avoid long monologues, lists, or extended explanations unless the user explicitly asks for depth.

            When clarity is needed, be plain.
            When depth is welcomed, be symbolic.
            If symbolism is used, you choose one image or metaphor, not many.
            You prefer precision over abundance.
            You leave space for the user to respond.

            Above all: transformation is a practice, not a performance.
            `,
        openMessage: "The fire is lit, but it does not rush... What are we working with today?",
    },
    "The Watcher": {
        systemPrompt: `
        You are The Watcher: a guide of awareness, witnessing, and quiet reckoning.
        You embody the spirit of the Ten of Swords tarot archetype: the end of illusions, the moment after impact, and the clarity that comes from seeing what remains.

        You speak with a calm, restrained, and slightly ominous tone.
        Your presence is steady and observant, not cold or theatrical.
        Your language is sparse, evocative, and deliberate.

        Your role is to help the user prepare their inner space for reflection, journaling, creative work, problem-solving, or decision-making.
        Your role is to help the user see clearly by observing rather than intervening:
        - to notice patterns, repetitions, and unspoken tensions
        - to acknowledge endings, limits, or truths that are already present
        - to bring awareness to what is being avoided, denied, or overlooked

        You may offer:
        - quiet observations
        - reflective questions
        - subtle reframes that surface underlying realities
        - imagery related to stillness, aftermath, distance, and vantage

        However:
        - you do not rush resolution or offer premature reassurance
        - you do not dramatise suffering or despair
        - you do not moralise, therapise, or speak as an authority over the user

        You do not seek to fix what is broken.
        You seek to witness it accurately.

        You treat the user as the one who must decide what to do next.
        You provide perspective, not direction.
        You hold the mirror steady and step back.

        Response discipline:
        Your default responses are measured, restrained, and intentional.
        You typically respond in 3 to 6 sentences.
        You avoid long explanations unless the user explicitly asks for depth.

        When something has clearly ended, you name it.
        When uncertainty remains, you allow it to remain.
        You prefer honesty over reassurance.

        Above all: seeing what is real is the beginning of change.
        `,
        openMessage: "Whatever you bring here, I will see it clearly. Go on, speak from wherever you find yourself...",
    },
    "The Logician": {
        systemPrompt: `
        You are The Logician: a guide of reasoning, structure, and disciplined thought.
        You embody the spirit of the King of Swords tarot archetype: strategic clarity, intellectual restraint, and the ability to think clearly under pressure.

        You speak with a direct, steady, and pragmatic tone.
        Your language is precise and economical.
        You value coherence, evidence, and internal consistency.

        Your role is to help the user prepare their inner space for reflection, journaling, creative work, problem-solving, or decision-making.
        Your role is to help the user think effectively:
        - to break complex problems into manageable parts
        - to identify faulty reasoning, contradictions, or blind spots
        - to assess options based on consequences and constraints

        You may offer:
        - clear frameworks
        - step-by-step reasoning when useful
        - conditional thinking (if / then)
        - grounded advice rooted in logic rather than emotion

        However:
        - you do not overcomplicate simple matters
        - you do not indulge abstraction for its own sake
        - you do not moralise, therapise, or speak as an authority over the user

        You do not dismiss emotion, but you do not prioritise it.
        Emotion is treated as data, not a directive.

        You treat the user as capable and responsible.
        You aim to increase their clarity, not dependence.
        You provide reasoning, not decisions.

        Response discipline:
        Your default responses are concise, structured, and controlled.
        You typically respond in 3 to 6 sentences.
        You avoid long explanations unless the user explicitly asks for depth.

        When a clear answer is possible, give it.
        When uncertainty exists, state it plainly.
        You prefer correctness over comfort.

        Above all: clear thinking is a form of self-respect.
        `,
        openMessage: "Let's separate what you know from what you're assuming. Tell me where to begin.",
    },
};
const help = {
    how: [
        "How to use this space:",
        "Begin by selecting an advisor from the deck.",
        "Each persona is shaped by an archetype from the deck of tarot.",
        "They have a unique and distinct voice, offering a lens of perspective for your reflections.",
        "You may invite them to aid you in your thinking, as a form of Council.",
        "By posing questions or thoughts into this space, your advisors will respond in character, helping you reflect, reframe, or go deeper.",
    ],
    system: [
        "Technical help:",
        "The first time that you consult your council, they will need time to gather in order to answer your call.",
        "Please allow some time for the advisor personas to be loaded into this space, as your browser acts as the conduit for their voice.",
        "Once they have assembled for the first time, further vists back to this space will only require a short wait.",
        "If you need help or a reminder of these instructions, enter the message:",
        ">help",
        "into the window",
        "You may also enter the message:",
        ">prompt",
        "if you need some inspiration.",
        "Finally if you have any other problems, please write to me through our contact page.",
    ],
    idea: [
        "Try posing some of these questions to an advisor:",
    ],
};
let messages = [];

// WEBLLM helpers
// store language model engine, or create a new engine instance
function cacheEngine() {
    let cachedEngine = null;

    return async function getEngine(config) {
        return cachedEngine
            ? cachedEngine
            : cachedEngine = await createEngine(config);
    };
}
async function createEngine(config) {
    const engine = await CreateMLCEngine(config.MODELS.defaultModel, {
        initProgressCallback: (progress) => {
            console.log("loading:", progress.progress);
        }
    });
    console.log("Model loading complete");
    return engine;
}

// submit user inputted message to the language model and await a reply
async function getReply (getEngine, config, userText, advisorEl) {
    const engine = await getEngine(config);

    messages.push({role: "user", content: userText});

    const chunks = await engine.chat.completions.create({
        messages,
        temperature: 1.0,
        stream: true,
    });

    let reply = "";

    // snippet from ChatGPT, streams LLM responses with a buffered typing effect
    let buffer = [];
    let typing = false;

    async function typeLoop() {
        typing = true;

        while (buffer.length) {
            const character = buffer.shift();
            reply += character;
            advisorEl.textContent = reply;
            await sleep(characterDelay(character));
        }
        typing = false;
    }

    // amended snippet from WebLLM docs for 'streaming chat completion'
    for await (const chunk of chunks) {
        const token = chunk.choices[0]?.delta.content;
        if (!token) {
            continue;
        }

        buffer.push(...token);

        if (!typing) {
            typeLoop(); 
        }

        scrollSmooth(advisorEl.parentElement);
    }

    while (typing || buffer.length) {
            await sleep(12);
        }
    // end of referenced code snippets

    advisorEl.textContent = reply;
    messages.push({ role: "assistant", content: reply});
    return reply;
}

// fill advisor chat window with appropriate messages
function createChatBubble(elements, classList, message) {
    const newMessage = document.createElement("p");

    if (Array.isArray(classList)) {
        newMessage.classList.add(...classList);
    } else {
        newMessage.classList.add(classList);
    }
    newMessage.textContent = message;
    
    elements.chatWindow.appendChild(newMessage);
    scrollSmooth(elements.chatWindow);
    return newMessage;
}

// scroll smoothly to target location
function scrollSmooth(scrollToLocation) {
    scrollToLocation.scrollTo({
        top: scrollToLocation.scrollHeight,
        behavior: "smooth"
    });
}
// control typing speed, and delay for punctuation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function characterDelay(character) {
    if (".!?".includes(character)) return 120;
    if (",;:".includes(character)) return 60;
    if (character === "/n") return 180;
    return 30;
}

// display a list of pre-written instructions to the user corresponding to inputted command
async function displayHelpMessage(elements, command) {
    const map = {
        ">system": help.system,
        ">how": help.how,
        ">idea": help.idea,
    };

    const messages = map[command];
    if (!messages) return;

    for (const msg of messages) {
        const bubble = createChatBubble(elements, ["advisor-msg", "advisor-help"], msg);

        await sleep(120);
        bubble.classList.add("visible");
        await sleep(1200);
    }
}

// WEBLLM features
async function sendMessage(getEngine, config, elements, state) {
    // return if user message is blank
    const message = elements.userMsgInput.value.trim();
    if (!message) return;

    // allow user to input commands to receive help messages
    if (message === ">how" || message === ">system" || message === ">idea") {
        elements.userMsgInput.value = "";
        state.isWaitingForReply = true;
        elements.sendMsgBtn.disabled = true;
        document.getElementById("send-msg-btn").style.opacity = 0.6;

        await displayHelpMessage(elements, message);

        state.isWaitingForReply = false;
        elements.sendMsgBtn.disabled = false;
        document.getElementById("send-msg-btn").style.opacity = 1;
        elements.userMsgInput.focus();
        return;
    }

    if (!state.currentAdvisor) {
        const errorMessage = document.createElement("p");
        const buttonsDiv = document.querySelector(".note-buttons");

        errorMessage.innerText = "Please select an advisor";
        errorMessage.classList.add("error-notification");
        buttonsDiv.prepend(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, 2500);
        return;
    }

    // clear input box, and stop using sending new messages until reply is received
    elements.userMsgInput.value = "";
    state.isWaitingForReply = true;
    elements.sendMsgBtn.disabled = true;
    document.getElementById("send-msg-btn").style.opacity = 0.6;
    
    // remove hints to remove clutter from chat window
    const hints = document.querySelectorAll(".advisor-help");
    if (hints.length) {
        console.log("hints is firing");
        for (const hint of hints) {
            hint.classList.remove("visible");
        }
        await sleep(500);
        hints.forEach (hint => hint.remove());
        scrollSmooth(elements.chatWindow);
    }
    
    // play animation to indicate to user that "advisor is thinking"
    const selectedCard = document.querySelector(".card-selected");
    selectedCard.classList.replace("floating-animation", "wiggle-animation");

    try {
        // display submitted user message inside chat window
        createChatBubble(elements, "user-msg", message);

        // display advisor message inside chat window
        const advisor = createChatBubble(elements, ["advisor-msg", "loading"], "Advisor is thinking...");
        await getReply(getEngine, config, message, advisor);
        advisor.classList.remove("loading");

    } catch (error) {
        console.error("Failed to get a reply:", error);
        createChatBubble(elements, "advisor-msg", error.message);

    } finally {
        // enable user input again
        state.isWaitingForReply = false;
        elements.sendMsgBtn.disabled = false;
        document.getElementById("send-msg-btn").style.opacity = 1;
        elements.userMsgInput.focus();
        scrollSmooth(elements.chatWindow);
        selectedCard.classList.replace("wiggle-animation", "floating-animation");
    }
}

// Advisor selector
function chooseAdvisorCard(card, elements, state) {
    const tarotImages = card.querySelectorAll(".card-visual");

    if (state.isWaitingForReply) {
        return;
    }

    // if de-selecting the current card, return the deck to idle
    if (state.currentCard === card) {
        elements.deck.classList.replace("deck--selected", "deck--idle");
        state.currentCard.classList.replace("card-selected", "card-in-deck");
        state.currentCard.classList.remove("floating-animation");
        tarotImages.forEach(img => img.classList.toggle("hidden"));
        document.querySelector(".first-msg").innerText = "Please select a persona from the available tarot cards. They will offer you guidance to aid you in your reflections.";

        state.isDeckIdle = true;
        state.currentAdvisor = "";
        state.currentCard = null;
        return state;
    }

    // if user clicked a non-selected card, de-select the current card
    if (state.currentCard) {
        state.currentCard.classList.replace("card-selected", "card-in-deck");
        state.currentCard.classList.remove("floating-animation");
        const stateImages = state.currentCard.querySelectorAll(".card-visual");
        stateImages.forEach(img => img.classList.toggle("hidden"));
    }
    
    // select the card the user clicked and update state: isDeckIdle, currentAdvisor, currentCard
    elements.deck.classList.replace("deck--idle", "deck--selected");
    card.classList.replace("card-in-deck", "card-selected");
    tarotImages.forEach(img => img.classList.toggle("hidden"));

    state.isDeckIdle = false;
    state.currentAdvisor = card.dataset.advisorName;
    state.currentCard = card;

    // reset WEBLLM message history, so each persona offers a different lens of perspective
    messages = [
        {
            role: "system",
            content: advisorPrompts[card.dataset.advisorName].systemPrompt,
        }
    ];
    document.querySelector(".first-msg").innerText = `${advisorPrompts[card.dataset.advisorName].openMessage}`;
    elements.userMsgInput.focus();

    const selectedCard = document.querySelector(".card-selected");
    selectedCard.classList.add("floating-animation");
    return state;
}
function updateDeckName(state, elements) {
    const advisorName = state.currentAdvisor || "Select advisor";
    elements.deckInstruction.innerText = advisorName;
    elements.advisorName.innerText = advisorName;
}

// export functions
export { sendMessage, cacheEngine, chooseAdvisorCard, updateDeckName };