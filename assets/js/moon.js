/* jshint esversion: 11 */
//  reference: Astronomy API from IPGeolocation

//  MOON API helpers
//  load API data from local storage and check freshness, then get new fresh data if stale
async function getMoonData(config) {
    const savedData = localStorage.getItem("astronomyData");

    if (!savedData) {
        return await saveAstronomyData(config);
    }

    const payload = JSON.parse(savedData);
    return isDataFresh(payload, config) ? payload
                                        : await saveAstronomyData(config);
}

//  get astronomy data from API and save to local storage
async function saveAstronomyData(config) {
    const queryString = `${config.API_URL}?apiKey=${config.API_KEY}`;

    const response = await fetch(queryString);
    const data = await response.json();
    
    if (response.ok) {

        const apiDate = data.astronomy.date;
        const apiTime = data.astronomy.current_time;

        // (snippet from ChatGPT to help converting the API date and time data to milliseconds since unix epoch (UTC))
        const dateTime = `${apiDate}T${apiTime}`;
        const timestamp = new Date(dateTime).getTime();
        //  (end of referenced snippet)
        
        const payload = {
            moonData: data,
            timestamp: timestamp,
        };
        localStorage.setItem("astronomyData", JSON.stringify(payload));
        return payload;
    } else {
        const errorMessage = data.message || data.error || "Unknown API error";
        throw new Error(errorMessage);
    }
}

//  check if data is from same date, and less than 12 hours old
function isDataFresh(payload, config) {
    const age = Date.now() - payload.timestamp;
    const expiryTime = config.DATA_EXPIRY_HOURS * 60 * 60 * 1000;
    const dataDate = new Date(payload.timestamp).toDateString();
    const currentDate = new Date().toDateString();

    return age <= expiryTime && dataDate === currentDate;
}

//  convert API data into a readable format
function formatMoonData(currentPhase) {
    return currentPhase
        .toLowerCase()
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

//  check moon visibility based on moonrise and moonset data (HHMM format)
function checkMoonVisibility(moonrise, moonset) {
    const today = new Date();
    const now = today.getHours() * 100 + today.getMinutes();
    const [rh, rm] = moonrise.split(":").map(Number);
    const [sh, sm] = moonset.split(":").map(Number);

    const rise = rh * 100 + rm;
    const set = sh * 100 + sm;

    return rise > set ? now >= rise || now <= set
                      : now >= rise && now <= set;
}

// ------------------------------------------------------------------------------------------------------
//  MOON API features

async function displayMoonData(config, elements, moonImages) {
    let payload = await getMoonData(config);

    //  moon info variables
    const today = new Date(payload.timestamp);
    const moonData = payload.moonData;
    
    const moonPhase = formatMoonData(moonData.astronomy.moon_phase);
    const moonrise = moonData.astronomy.moonrise;
    const moonset = moonData.astronomy.moonset;

    //  display current moon phase with corresponding symbol and illustration in DOM
    elements.moonPhase.innerText = moonPhase;
    elements.noteMoon.innerText= `${moonPhase.toUpperCase()}`;
    const symbol = document.querySelector(".moon-symbol");
    symbol.src = moonImages[moonPhase.toUpperCase()].symbol;
    const illustration = document.querySelector(".moon-illustration");
    illustration.src = moonImages[moonPhase.toUpperCase()].illustration;

    //  display current date
    elements.date.innerText = today.toDateString();
    elements.noteDate.innerText = today.toDateString();

    //  display moon visibility
    const isVisible = checkMoonVisibility(moonrise, moonset);

    elements.moonVisibility.textContent = isVisible ? `${moonrise} - ${moonset}`
                                                    : `Moonrise at ${moonrise}`;
}
// ------------------------------------------------------------------------------------------------------
//  export functions
export { displayMoonData };