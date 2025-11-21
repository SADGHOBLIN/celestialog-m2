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
};

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

    // Display current date
    elements.date.innerText = today.toDateString();

    // Display moon visibility
    const isVisible = checkMoonVisibility(today, moonrise, moonset);

    elements.moonVisibility.innerHTML = isVisible
        ? `<p id="moon-visibility">VISIBLE<br>${moonrise} - ${moonset}</p>`
        : `<p id="moon-visibility">Moonrise:<br>${moonrise}</p>`;
    
    console.log(payload);
}

// INITIALISE ------------------------------
displayMoonData();

const getEngine = cacheEngine();
async function useEngine() {
    const engine = await getEngine();
    /// engine can now be used with engine.action, etc.
}