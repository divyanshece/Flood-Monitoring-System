let map;
let userLocation;
let apiKey = "5b3ce3597851110001cf624805e52c6ece5d497e844c6e23ea76298c"; // Replace with your actual key

function initMap() {
    map = L.map('map', { zoomControl: true }).setView([28.6139, 77.2090], 12); // Default view (Delhi)

    let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    });

    tileLayer.on('tileerror', function() {
        console.warn("⚠️ OpenStreetMap tiles failed to load! Switching to alternative tile provider...");
        map.removeLayer(tileLayer);
        L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);
    });

    tileLayer.addTo(map);

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = [position.coords.latitude, position.coords.longitude];
                map.setView(userLocation, 14);
                map.invalidateSize();
                L.marker(userLocation).addTo(map).bindPopup("📍 Your Location").openPopup();
            },
            (error) => {
                console.error("❌ Geolocation Error:", error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("⚠️ Location access denied! Please enable location services in your browser.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("⚠️ Location unavailable! Try again in a few moments.");
                        break;
                    case error.TIMEOUT:
                        alert("⚠️ Location request timed out! Please reload the page.");
                        break;
                    default:
                        alert("⚠️ Unknown error occurred while fetching location.");
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        alert("⚠️ Geolocation is not supported by your browser!");
    }
}

// Run map initialization on page load
window.onload = initMap;
