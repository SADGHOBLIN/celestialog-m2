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
        console.log("Data successfully saved to local stoage");
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
        console.log("data is fresh");
        return true;
    } else {
        console.log("data is stale");
        return false;
    }
}

// Main function to display moon data to user
// TODO: get element ID and display appropriate data
async function displayMoonData() {
    let payload = await getMoonData();

    if (!isDataFresh(payload)) {
        payload = await saveAstronomyData();
    }

    const moonData = payload.moonData;
    console.log("Data ready for use:", moonData);
}
