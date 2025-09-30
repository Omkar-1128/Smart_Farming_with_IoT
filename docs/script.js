// Sensor data storage
let sensorData = {
    temperature: 25,
    humidity: 60,
    soilMoisture: 45,
    lightIntensity: 5000
};

// Control states
let controls = {
    irrigation: false,
    fan: false,
    lights: false,
    alerts: true
};

// Activity log array
let activityLog = [];

// Initialize the dashboard
function init() {
    updateTime();
    setInterval(updateTime, 1000);
    
    // Simulate sensor updates every 3 seconds
    setInterval(updateSensors, 3000);
    
    // Initial sensor update
    updateSensors();
    
    // Setup control toggles
    setupControls();
    
    // Add initial log entry
    addLogEntry("System initialized and monitoring started");
}

// Update current time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
}

// Simulate sensor data updates
function updateSensors() {
    // Temperature: 20-35°C
    sensorData.temperature = Math.round((Math.random() * 15 + 20) * 10) / 10;
    
    // Humidity: 40-80%
    sensorData.humidity = Math.round(Math.random() * 40 + 40);
    
    // Soil Moisture: 20-70%
    sensorData.soilMoisture = Math.round(Math.random() * 50 + 20);
    
    // Light Intensity: 1000-10000 lux
    sensorData.lightIntensity = Math.round(Math.random() * 9000 + 1000);
    
    // Update display
    updateTemperature();
    updateHumidity();
    updateSoilMoisture();
    updateLightIntensity();
    
    // Auto-control based on sensor data
    autoControlSystems();
}

// Update temperature display
function updateTemperature() {
    const temp = sensorData.temperature;
    document.getElementById('temp-value').textContent = temp + '°C';
    
    let status, progressColor;
    if (temp < 22) {
        status = 'Too Cold';
    } else if (temp > 30) {
        status = 'Too Hot';
    } else {
        status = 'Optimal';
    }
    
    document.getElementById('temp-status').textContent = status;
    
    const progress = ((temp - 20) / 15) * 100;
    document.getElementById('temp-progress').style.width = Math.min(progress, 100) + '%';
}

// Update humidity display
function updateHumidity() {
    const humidity = sensorData.humidity;
    document.getElementById('humidity-value').textContent = humidity + '%';
    
    let status;
    if (humidity < 50) {
        status = 'Low';
    } else if (humidity > 70) {
        status = 'High';
    } else {
        status = 'Normal';
    }
    
    document.getElementById('humidity-status').textContent = status;
    
    const progress = ((humidity - 40) / 40) * 100;
    document.getElementById('humidity-progress').style.width = Math.min(progress, 100) + '%';
}

// Update soil moisture display
function updateSoilMoisture() {
    const soil = sensorData.soilMoisture;
    document.getElementById('soil-value').textContent = soil + '%';
    
    let status;
    if (soil < 30) {
        status = 'Dry - Needs Water';
    } else if (soil > 60) {
        status = 'Saturated';
    } else {
        status = 'Good';
    }
    
    document.getElementById('soil-status').textContent = status;
    
    const progress = ((soil - 20) / 50) * 100;
    document.getElementById('soil-progress').style.width = Math.min(progress, 100) + '%';
}

// Update light intensity display
function updateLightIntensity() {
    const light = sensorData.lightIntensity;
    document.getElementById('light-value').textContent = light + ' lux';
    
    let status;
    if (light < 3000) {
        status = 'Low Light';
    } else if (light > 8000) {
        status = 'Very Bright';
    } else {
        status = 'Sufficient';
    }
    
    document.getElementById('light-status').textContent = status;
    
    const progress = ((light - 1000) / 9000) * 100;
    document.getElementById('light-progress').style.width = Math.min(progress, 100) + '%';
}

// Auto-control systems based on sensor readings
function autoControlSystems() {
    // Auto irrigation if soil is too dry
    if (sensorData.soilMoisture < 30 && !controls.irrigation) {
        controls.irrigation = true;
        document.getElementById('irrigation-toggle').checked = true;
        addLogEntry('Irrigation system activated - Low soil moisture detected');
    } else if (sensorData.soilMoisture > 55 && controls.irrigation) {
        controls.irrigation = false;
        document.getElementById('irrigation-toggle').checked = false;
        addLogEntry('Irrigation system deactivated - Optimal soil moisture reached');
    }
    
    // Auto fan if temperature is high
    if (sensorData.temperature > 30 && !controls.fan) {
        controls.fan = true;
        document.getElementById('fan-toggle').checked = true;
        addLogEntry('Ventilation fan activated - High temperature detected');
    } else if (sensorData.temperature < 26 && controls.fan) {
        controls.fan = false;
        document.getElementById('fan-toggle').checked = false;
        addLogEntry('Ventilation fan deactivated - Temperature normalized');
    }
    
    // Auto lights if intensity is low
    if (sensorData.lightIntensity < 3000 && !controls.lights) {
        controls.lights = true;
        document.getElementById('light-toggle').checked = true;
        addLogEntry('Grow lights activated - Low light conditions');
    } else if (sensorData.lightIntensity > 6000 && controls.lights) {
        controls.lights = false;
        document.getElementById('light-toggle').checked = false;
        addLogEntry('Grow lights deactivated - Sufficient natural light');
    }
}

// Setup control toggle listeners
function setupControls() {
    document.getElementById('irrigation-toggle').addEventListener('change', function(e) {
        controls.irrigation = e.target.checked;
        const action = e.target.checked ? 'activated' : 'deactivated';
        addLogEntry(`Irrigation system manually ${action}`);
    });
    
    document.getElementById('fan-toggle').addEventListener('change', function(e) {
        controls.fan = e.target.checked;
        const action = e.target.checked ? 'activated' : 'deactivated';
        addLogEntry(`Ventilation fan manually ${action}`);
    });
    
    document.getElementById('light-toggle').addEventListener('change', function(e) {
        controls.lights = e.target.checked;
        const action = e.target.checked ? 'activated' : 'deactivated';
        addLogEntry(`Grow lights manually ${action}`);
    });
    
    document.getElementById('alert-toggle').addEventListener('change', function(e) {
        controls.alerts = e.target.checked;
        const action = e.target.checked ? 'enabled' : 'disabled';
        addLogEntry(`Alert notifications ${action}`);
    });
}

// Add entry to activity log
function addLogEntry(message) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
    
    const logEntry = {
        time: timeString,
        message: message
    };
    
    activityLog.unshift(logEntry);
    
    // Keep only last 10 entries
    if (activityLog.length > 10) {
        activityLog.pop();
    }
    
    // Update log display
    updateLogDisplay();
}

// Update activity log display
function updateLogDisplay() {
    const logContainer = document.getElementById('activity-log');
    
    logContainer.innerHTML = activityLog.map(entry => `
        <div class="log-item">
            <span class="log-time">${entry.time}</span>
            <span class="log-message">${entry.message}</span>
        </div>
    `).join('');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);