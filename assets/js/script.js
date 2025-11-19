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
        return payload;
    } else {
        const errorMessage = data.message || data.error || "Unknown API error";
        throw new Error(errorMessage);
    }
}

// Load API data from local storage or fetch new data if none stored
async function getMoonData() {
    const savedData = localStorage.getItem("astronomyData");

    return savedData
    ? JSON.parse(savedData)
    : await saveAstronomyData();
}

getMoonData().then(savedData => {
    console.log(savedData.moonData);
    console.log(savedData.timestamp);
    console.log(savedData.moonData.astronomy);
});


// async function displayMoonData() {
//     getMoonData();
//     console.log(moonData.astronomy);
// }

// on refresh:
// Is data available?

// no > GET NEW DATA > data
//      run get function, return data

// yes > IS DATA FRESH? > no ^ > yes > data
//      data.time IF statement > data
//      GET NEW DATA > data

// FRESH DATA > use
