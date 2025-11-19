// MOON Info from ipgeolocation4
async function getMoonData() {
    const API_KEY = "1cd00c803c544f90b75357b117b4c27a";
    const API_URL = "https://api.ipgeolocation.io/v2/astronomy";
    let city = "Leeds%2C%20UK";
    const queryString = `${API_URL}?apiKey=${API_KEY}&location=${city}`;

    const response = await fetch(queryString);
    const data = await response.json();
    console.log(data.astronomy);
}

getMoonData();