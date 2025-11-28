// Astronomy API from IPGeolocation
// MOON API helpers
// load API data from local storage and check freshness, or get new fresh data
async function getMoonData(config) {
    const savedData = localStorage.getItem("astronomyData");

    if (!savedData) {
        return await saveAstronomyData(config);
    }

    const payload = JSON.parse(savedData);
    return isDataFresh(payload, config)
        ? payload
        : await saveAstronomyData(config);
}

// get astronomy data from API and save to local storage
async function saveAstronomyData(config) {
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
        return payload;
    } else {
        const errorMessage = data.message || data.error || "Unknown API error";
        throw new Error(errorMessage);
    }
}

// check if data is from same date, and less than 12 hours old
function isDataFresh(payload, config) {
    const age = Date.now() - payload.timestamp;
    const expiryTime = config.DATA_EXPIRY_HOURS * 60 * 60 * 1000;
    const dataDate = new Date(payload.timestamp).toDateString();
    const currentDate = new Date().toDateString();

    return age <= expiryTime && dataDate === currentDate;
}

// convert API data into a readable format
function formatMoonData(currentPhase) {
    return currentPhase
        .toLowerCase()
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

// check moon visibility based on moonrise and moonset data (HHMM format)
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

// MOON API features
async function displayMoonData(config, elements) {
    let payload = await getMoonData(config);

    // moon info variables
    const today = new Date(payload.timestamp);
    const moonData = payload.moonData;
    const moonPhase = formatMoonData(moonData.astronomy.moon_phase);
    const moonrise = moonData.astronomy.moonrise;
    const moonset = moonData.astronomy.moonset;

    // display current moon phase
    elements.moonPhase.innerText = moonPhase;
    elements.noteMoon.innerText= `Moon: ${moonPhase.toUpperCase()}`;

    // display current date
    elements.date.innerText = today.toDateString();
    elements.noteDate.innerText = today.toDateString();

    // display moon visibility
    const isVisible = checkMoonVisibility(today, moonrise, moonset);

    elements.moonVisibility.innerHTML = isVisible
        ? `<p id="moon-visibility">VISIBLE<br>${moonrise} - ${moonset}</p>`
        : `<p id="moon-visibility">Moonrise:<br>${moonrise}</p>`;
    

    // DEBUGGING:
    console.log(payload);
}

// export functions
export { displayMoonData };