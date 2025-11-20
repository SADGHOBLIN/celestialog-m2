// AI language models and engine from WebLLM (MLC AI)
// Import engine from WebLLM
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";
// Load language models in the browser, dependent on device
async function createEngine() {
    const llmList = {
        defaultModel: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
        mobileModel: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
        experimentalModel: "NeuralHermes-2.5-Mistral-7B-q4f16_1-MLC"
    };

    const engine = await CreateMLCEngine(llmList.defaultModel, {
        initProgressCallback: (progress) => {
            console.log("loading:", progress.progress);
        }
    });
    console.log("model loading complete");
    return engine;
}

// Astronomy API from ipgeolocation
// GET astronomy data from API and save to local storage
async function saveAstronomyData() {
    const API_KEY = "1cd00c803c544f90b75357b117b4c27a";
    const API_URL = "https://api.ipgeolocation.io/v2/astronomy";
    let city = "Leeds%2C%20UK";
    const queryString = `${API_URL}?apiKey=${API_KEY}&location=${city}`;

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

// Load API data from local storage or fetch new data if none is stored
async function getMoonData() {
    const savedData = localStorage.getItem("astronomyData");
    return savedData
        ? JSON.parse(savedData)
        : await saveAstronomyData();
}

// Check if API data is fresh - less than 12 hours and the same current date
function isDataFresh(payload) {
    const age = Date.now() - payload.timestamp;
    const expiryTime = 12 * 60 * 60 * 1000;
    const dataDate = new Date(payload.timestamp).toDateString();
    const currentDate = new Date().toDateString();

    if (age <= expiryTime && dataDate === currentDate) {
        return true;
    } else {
        return false;
    }
}

// Convert moon phrase from API data to readable format
function formatMoonPhase(currentPhase) {
    return currentPhase
        .toLowerCase()
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

// Check moon visibility based on moonrise and moonset data
function checkMoonVisibility(today, moonrise, moonset) {
    const now = today.getHours() * 100 + today.getMinutes();
    const [riseHour, riseMin] = moonrise.split(":").map(Number);
    const moonriseNum = riseHour * 100 + riseMin;
    const [setHour, setMin] = moonset.split(":").map(Number);
    const moonsetNum = setHour * 100 + setMin;

    if (moonriseNum < moonsetNum) {
        return now >= moonriseNum && now <= moonsetNum;
    } else {
        return ((now >= moonriseNum && now <= 2359) || (now >= 0 && now <= moonsetNum ));
    }
}

// Main function to display moon data to user
async function displayMoonData() {
    let payload = await getMoonData();
    if (!isDataFresh(payload)) {
        payload = await saveAstronomyData();
    }

    // Moon info variables
    const today = new Date(payload.timestamp);
    const moonData = payload.moonData;
    const moonPhase = formatMoonPhase(moonData.astronomy.moon_phase);
    const moonrise = moonData.astronomy.moonrise;
    const moonset = moonData.astronomy.moonset;

    // Display current moon phase
    const currentMoonPhase = document.getElementById("moon-phase-data");
    currentMoonPhase.innerText = moonPhase;

    // Display current date
    const currentDate = document.getElementById("current-date-data");
    currentDate.innerText = today.toDateString();

    // Display moon visibility
    const moonVisibility = document.getElementById("moon-visibility-data");
    const isVisible = checkMoonVisibility(today, moonrise, moonset);
    if (isVisible) {
        moonVisibility.innerHTML = `<p id="moon-visibility">VISIBLE<br>${moonrise} - ${moonset}</p>`;
    } else {
        moonVisibility.innerHTML = `<p id="moon-visibility">Moonrise:<br>${moonrise}</p>`;
    }
    console.log(moonData);
}

displayMoonData();
createEngine();