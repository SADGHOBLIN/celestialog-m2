// Astronomy API from ipgeolocation
// GET astronomy data from API and save to local storage
async function getMoonData() {
    const API_KEY = "1cd00c803c544f90b75357b117b4c27a";
    const API_URL = "https://api.ipgeolocation.io/v2/astronomy";
    let city = "Leeds%2C%20UK";
    const queryString = `${API_URL}?apiKey=${API_KEY}&location=${city}`;

    const response = await fetch(queryString);
    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem("astronomyData", JSON.stringify(data));
        return data;
    } else {
        const errorMessage = data.message || data.error || "Unknown API error";
        throw new Error(errorMessage);
    }
}

getMoonData();