// Import AI language models and engine from WebLLM (MLC AI)
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// define initial language model persona
const messages = [
    { 
        role: "system", 
        content: 
        "You are Architect; the cryptic and mysterious advisor to the user that helps them with creative writing in their journal. You act as a member of their advisory council, similar to the councils of the medieval period. Your responses should answer the user's questions, but you can also be cryptic and poetic, and aimed at providing them with thought provoking responses to aid them in their daily reflection, and creativity." 
    },
    { 
        role: "user", 
        content: 
        "Hello, can you tell me what I could write about in my journal today? Just a short idea to help me get my brain working." 
    },
];

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
async function getReply (getEngine, config, userText) {
    const engine = await getEngine(config);
    
    const reply = await engine.chat.completions.create({
        messages: [
            ...messages,
            { role: "user", content: userText }
        ],
        temperature: 1.0,
    });
    return reply.choices[0].message.content;
}

// fill advisor chat window with appropriate messages
function createChatBubble(elements, classList, message) {
    const newMessage = document.createElement("div");

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

// WEBLLM features
async function sendMessage(getEngine, config, elements, state) {
    // return if user message is blank
    const message = elements.userMsgInput.value.trim();
    if (!message) return;

    // clear input box, and stop using sending new messages until reply is received
    elements.userMsgInput.value = "";
    state.isWaitingForReply = true;
    elements.sendMsgBtn.disabled = true;

    try {
        // display submitted user message inside chat window
        createChatBubble(elements, "user-msg", message);

        // display advisor message inside chat window
        const advisor = createChatBubble(elements, ["advisor-msg", "loading"], "Advisor is thinking...");
        const reply = await getReply(getEngine, config, message);
        advisor.textContent = reply;
        advisor.classList.remove("loading");

    } catch (error) {
        console.error("Failed to get a reply:", error);
        createChatBubble(elements, "advisor-msg", error.message);

    } finally {
        // enable user input again
        state.isWaitingForReply = false;
        elements.sendMsgBtn.disabled = false;
        elements.userMsgInput.focus();
        scrollSmooth(elements.chatWindow);
    }
}

// Advisor selector
function chooseAdvisorCard(card, elements, state) {
    // if de-selecting the current card, return the deck to idle
    if (state.currentCard === card) {
        elements.deck.classList.replace("deck--selected", "deck--idle");
        state.currentCard.classList.replace("card-selected", "card-in-deck");
        state.isDeckIdle = true;
        state.currentAdvisor = "";
        state.currentCard = null;
        return state;
    }

    // if user clicked a non-selected card, de-select the current card
    if (state.currentCard) {
        state.currentCard.classList.replace("card-selected", "card-in-deck");
    }
    
    // select the card the user clicked and update state: isDeckIdle, currentAdvisor, currentCard
    elements.deck.classList.replace("deck--idle", "deck--selected");
    card.classList.replace("card-in-deck", "card-selected");

    state.isDeckIdle = false;
    state.currentAdvisor = card.dataset.advisorName;
    state.currentCard = card;
    return state;
}
function updateDeckName(state, elements) {
    const advisorName = state.currentAdvisor || "Select an Advisor";
    elements.deckInstruction.innerText = advisorName;
}

// export functions
export { sendMessage, cacheEngine, chooseAdvisorCard, updateDeckName };