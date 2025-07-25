
// ESP32 Communication Utilities
// These functions will be used to communicate with the ESP32 device

export interface ESP32WaterData {
  mainTankLevel: number;
  reservoirTankLevel: number;
  flowRate: number;
  pressure: number;
  timestamp: number;
}

export interface ESP32Config {
  ipAddress: string;
  port: number;
  apiKey?: string;
}

// Default configuration - update these values for your ESP32
const DEFAULT_CONFIG: ESP32Config = {
  ipAddress: '192.168.1.100', // Update with your ESP32 IP
  port: 80,
  apiKey: 'your-api-key' // Optional security key
};

/**
 * Fetch current water data from ESP32
 * Replace this with actual HTTP request to your ESP32 endpoint
 */
export async function fetchWaterData(config: ESP32Config = DEFAULT_CONFIG): Promise<ESP32WaterData | null> {
  try {
    // Example ESP32 endpoint: http://192.168.1.100/api/water-data
    const response = await fetch(`http://${config.ipAddress}:${config.port}/api/water-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      }
    });

    if (!response.ok) {
      throw new Error(`ESP32 responded with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      mainTankLevel: data.main_tank_level || 0,
      reservoirTankLevel: data.reservoir_tank_level || 0,
      flowRate: data.flow_rate || 0,
      pressure: data.pressure || 0,
      timestamp: data.timestamp || Date.now()
    };
  } catch (error) {
    console.error('Failed to fetch data from ESP32:', error);
    return null;
  }
}

/**
 * Send control command to ESP32
 * Use this for manual override, pump control, etc.
 */
export async function sendControlCommand(
  command: string, 
  value?: any, 
  config: ESP32Config = DEFAULT_CONFIG
): Promise<boolean> {
  try {
    const response = await fetch(`http://${config.ipAddress}:${config.port}/api/control`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      },
      body: JSON.stringify({
        command,
        value,
        timestamp: Date.now()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send command to ESP32:', error);
    return false;
  }
}

/**
 * Test ESP32 connectivity
 */
export async function testESP32Connection(config: ESP32Config = DEFAULT_CONFIG): Promise<boolean> {
  try {
    const response = await fetch(`http://${config.ipAddress}:${config.port}/ping`, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.error('ESP32 connection test failed:', error);
    return false;
  }
}

/**
 * Configure ESP32 settings
 * Use this to update thresholds, pump schedules, etc.
 */
export async function configureESP32(
  settings: Record<string, any>, 
  config: ESP32Config = DEFAULT_CONFIG
): Promise<boolean> {
  try {
    const response = await fetch(`http://${config.ipAddress}:${config.port}/api/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      },
      body: JSON.stringify(settings)
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to configure ESP32:', error);
    return false;
  }
}

// Usage Examples:

// To get current water levels:
// const waterData = await fetchWaterData();
// if (waterData) {
//   console.log('Main tank:', waterData.mainTankLevel + '%');
//   console.log('Reservoir:', waterData.reservoirTankLevel + '%');
// }

// To trigger manual override:
// const success = await sendControlCommand('override', true);
// if (success) console.log('Override activated');

// To test connection:
// const isConnected = await testESP32Connection();
// console.log('ESP32 connected:', isConnected);
