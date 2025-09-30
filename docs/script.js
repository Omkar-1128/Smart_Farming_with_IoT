// --- Sensor Data Simulation Function ---
function fetchSensorData() {
    // In a real application, you would replace this with an API call
    // to your IoT platform (e.g., AWS IoT, Google Cloud IoT, ThingSpeak, your own server).

    // Example: fetch('https://your-iot-api.com/data').then(response => response.json()).then(data => { ... });

    const data = {
        temperature: (Math.random() * (35 - 20) + 20).toFixed(1), // Between 20.0 and 35.0
        humidity: Math.floor(Math.random() * (90 - 40) + 40),      // Between 40% and 90%
        soilMoisture: Math.floor(Math.random() * (75 - 25) + 25)   // Between 25% and 75%
    };

    return data;
}

// --- Dashboard Update Logic ---
function updateDashboard() {
    const sensorData = fetchSensorData();

    // Update Temperature
    document.getElementById('temp-value').textContent = sensorData.temperature;

    // Update Humidity
    document.getElementById('humid-value').textContent = sensorData.humidity;

    // Update Soil Moisture
    document.getElementById('moist-value').textContent = sensorData.soilMoisture;

    // Optional: Add logic for visual alerts based on data (e.g., if moisture is too low)
    const moistureCard = document.getElementById('moisture-card');
    if (sensorData.soilMoisture < 35) {
        moistureCard.style.borderLeftColor = '#ff9800'; // Orange for low
    } else {
        moistureCard.style.borderLeftColor = '#4CAF50'; // Green for normal
    }
}

// --- Irrigation Control Logic ---
const irrigationToggle = document.getElementById('irrigation-toggle');
const irrigationStatus = document.getElementById('irrigation-status');

let isIrrigationOn = false;

function toggleIrrigation() {
    isIrrigationOn = !isIrrigationOn;

    if (isIrrigationOn) {
        // In a real app, send a command to the IoT device/server
        // Example: fetch('https://your-iot-api.com/control/irrigation', { method: 'POST', body: JSON.stringify({ state: 'ON' }) });

        irrigationToggle.textContent = 'Turn OFF';
        irrigationToggle.classList.remove('off');
        irrigationToggle.classList.add('on');
        
        irrigationStatus.textContent = 'ON';
        irrigationStatus.classList.remove('off-status');
        irrigationStatus.classList.add('on-status');
        
        console.log('Irrigation system turned ON');

    } else {
        // In a real app, send a command to the IoT device/server
        // Example: fetch('https://your-iot-api.com/control/irrigation', { method: 'POST', body: JSON.stringify({ state: 'OFF' }) });
        
        irrigationToggle.textContent = 'Turn ON';
        irrigationToggle.classList.remove('on');
        irrigationToggle.classList.add('off');

        irrigationStatus.textContent = 'OFF';
        irrigationStatus.classList.remove('on-status');
        irrigationStatus.classList.add('off-status');
        
        console.log('Irrigation system turned OFF');
    }
}

// Attach the event listener to the button
irrigationToggle.addEventListener('click', toggleIrrigation);

// --- Initialization and Auto-Update ---
// Initial load of data
updateDashboard();

// Set up interval to refresh sensor data every 5 seconds (5000 milliseconds)
setInterval(updateDashboard, 5000);

// Set initial status color for the button on page load
// This ensures the status indicator has the correct color class when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    if (isIrrigationOn) {
        irrigationStatus.classList.add('on-status');
    } else {
        irrigationStatus.classList.add('off-status');
    }
});