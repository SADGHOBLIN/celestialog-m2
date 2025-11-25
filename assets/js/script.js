// AI language models and engine from WebLLM (MLC AI) & Astronomy API from IPGeolocation
// IMPORT engine from WebLLM
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// CONFIG
const config = {
    API_KEY: "1cd00c803c544f90b75357b117b4c27a",
    API_URL: "https://api.ipgeolocation.io/v2/astronomy",
    DATA_EXPIRY_HOURS: 12,
    MODELS: {
        defaultModel: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
        mobileModel: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
        experimentalModel: "NeuralHermes-2.5-Mistral-7B-q4f16_1-MLC"
    }
};
const elements = {
    date: document.getElementById("current-date-data"),
    moonPhase: document.getElementById("moon-phase-data"),
    moonVisibility: document.getElementById("moon-visibility-data"),

    journal: document.getElementById("journal"),
    advisor: document.getElementById("advisor"),
    useJournal: document.getElementById("use-journal"),
    useAdvisor: document.getElementById("use-advisor"),

    noteMoon: document.getElementById("note-moon"),

    chatWindow: document.getElementById("chat-body"),
    userMsgInput: document.getElementById("user-msg-input"),
    sendMsgBtn: document.getElementById("send-msg-btn"),
};
// Define initial language model persona
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

// HELPERS ------------------------------
// CREATE language model engine, in cache storage
function cacheEngine() {
    let cachedEngine = null;

    return async function getEngine() {
        return cachedEngine
            ? cachedEngine
            : cachedEngine = await createEngine();
    };
}
async function createEngine() {
    const engine = await CreateMLCEngine(config.MODELS.defaultModel, {
        initProgressCallback: (progress) => {
            console.log("loading:", progress.progress);
        }
    });
    console.log("Model loading complete");
    return engine;
}

// Get a reply from the language model
async function getReply (userText) {
    const engine = await getEngine();
    
    const reply = await engine.chat.completions.create({
        messages: [
            ...messages,
            { role: "user", content: userText }
        ],
        temperature: 1.0,
    });
    return reply.choices[0].message.content;
}

// Create a new chat bubble in the chat window
function createChatBubble(userClass, message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add(userClass);
    newMessage.textContent = message;
    elements.chatWindow.appendChild(newMessage);
    scrollSmooth(elements.chatWindow);
}

// Create loading bubble whilst awaiting advisor response
function createLoadingBubble() {
    const thinking = document.createElement("div");
    thinking.classList.add("advisor-msg", "loading");
    thinking.textContent = "Advisor is thinking...";
    elements.chatWindow.appendChild(thinking);
    scrollSmooth(elements.chatWindow);
    return thinking;
}

// Scroll smoothly to location
function scrollSmooth(scrollToLocation) {
    scrollToLocation.scrollTo({
        top: scrollToLocation.scrollHeight,
        behavior: "smooth"
    });
}

// LOAD API data from local storage and check freshness, or GET new fresh data
async function getMoonData() {
    const savedData = localStorage.getItem("astronomyData");

    if (!savedData) {
        return await saveAstronomyData();
    }

    const payload = JSON.parse(savedData);
    return isDataFresh(payload)
        ? payload
        : await saveAstronomyData();
}

// GET astronomy data from API and save to local storage
async function saveAstronomyData() {
    let city = "Leeds%2C%20UK";
    const queryString = `${config.API_URL}?apiKey=${config.API_KEY}&location=${city}`;

    const response = await fetch(queryString);
    const data = await response.json();
    
    if (response.ok) {
        const payload = {
            moonData: data,
            timestamp: Date.now()
        };
        localStorage.setItem("astronomyData", JSON.stringify(payload));
        console.log("Data successfully saved to local storage");
        return payload;
    } else {
        const errorMessage = data.message || data.error || "Unknown API error";
        throw new Error(errorMessage);
    }
}

// Check if data is from same date, and less than 12 hours old
function isDataFresh(payload) {
    const age = Date.now() - payload.timestamp;
    const expiryTime = config.DATA_EXPIRY_HOURS * 60 * 60 * 1000;
    const dataDate = new Date(payload.timestamp).toDateString();
    const currentDate = new Date().toDateString();

    return age <= expiryTime && dataDate === currentDate;
}

// Convert API data into a readable format
function formatMoonData(currentPhase) {
    return currentPhase
        .toLowerCase()
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

// Check moon visibility based on moonrise and moonset data (HHMM format)
function checkMoonVisibility(today, moonrise, moonset) {
    const now = today.getHours() * 100 + today.getMinutes();
    const [rh, rm] = moonrise.split(":").map(Number);
    const [sh, sm] = moonset.split(":").map(Number);

    const rise = rh * 100 + rm;
    const set = sh * 100 + sm;

    return rise > set
        ? now >= rise || now <= set
        : now >= rise && now <= set;
}

// Toggle visibility
function toggleHidden(showID, hideID) {
    elements[showID].classList.remove("hidden");
    elements[hideID].classList.add("hidden");
}

// FEATURES ------------------------------
async function displayMoonData() {
    let payload = await getMoonData();

    // Moon info variables
    const today = new Date(payload.timestamp);
    const moonData = payload.moonData;
    const moonPhase = formatMoonData(moonData.astronomy.moon_phase);
    const moonrise = moonData.astronomy.moonrise;
    const moonset = moonData.astronomy.moonset;

    // Display current moon phase
    elements.moonPhase.innerText = moonPhase;
    elements.noteMoon.innerText= `Moon: ${moonPhase.toUpperCase()}`;

    // Display current date
    elements.date.innerText = today.toDateString();

    // Display moon visibility
    const isVisible = checkMoonVisibility(today, moonrise, moonset);

    elements.moonVisibility.innerHTML = isVisible
        ? `<p id="moon-visibility">VISIBLE<br>${moonrise} - ${moonset}</p>`
        : `<p id="moon-visibility">Moonrise:<br>${moonrise}</p>`;
    
    console.log(payload);
}

// User send message to advisor
async function sendMessage() {
    const message = elements.userMsgInput.value.trim();
    if (!message) {
        return;
    }
    elements.userMsgInput.value = "";
    isWaitingForReply = true;
    elements.sendMsgBtn.disabled = true;

    try {
        // display user input in chat window
        createChatBubble("user-msg", message);

        // send to model, await response
        const thinking = createLoadingBubble();
        const reply = await getReply(message);
        thinking.textContent = reply;
        thinking.classList.remove("loading");

    } catch (error) {
        console.error("Failed to get a reply:", error);
        createChatBubble("advisor-msg", error.message);

    } finally {
        // enable user input again
        isWaitingForReply = false;
        elements.sendMsgBtn.disabled = false;
        elements.userMsgInput.focus();
        scrollSmooth(elements.chatWindow);
    }
}

// JOURNAL FUNCTIONALITY - in development
// Toggle between journal entries and advisor chat
elements.useAdvisor.addEventListener("click", () => {
    toggleHidden("advisor", "journal");
    elements.userMsgInput.focus();
});
elements.useJournal.addEventListener("click", () => {
    toggleHidden("journal", "advisor");
});

// Advisor chatbox functionality
elements.sendMsgBtn.addEventListener("click", sendMessage);
elements.userMsgInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        if (isWaitingForReply) {
            event.preventDefault();
            return;
        }
        sendMessage();
    }
});

// INITIALISE ------------------------------
const getEngine = cacheEngine();
let isWaitingForReply = false;
displayMoonData();

// debugging - expose to console for now
window.getEngine = getEngine;