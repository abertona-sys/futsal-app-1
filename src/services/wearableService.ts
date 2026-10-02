import { WearableTelemetry } from '../types/futsal';

type TelemetryListener = (data: WearableTelemetry) => void;

class WearableManager {
  private telemetry: WearableTelemetry = {
    isConnected: false,
    deviceName: 'Nenhum dispositivo',
    connectionType: 'simulated',
    heartRate: 72,
    restingHeartRate: 70,
    maxHeartRate: 195,
    activeCalories: 0,
    activeSeconds: 0,
    steps: 0,
    cadenceRpm: 0,
    currentZone: 'Reposo',
    zoneColor: '#38bdf8',
    batteryLevel: 85
  };

  private listeners: Set<TelemetryListener> = new Set();
  private timer: number | null = null;
  private isWorkoutActive = false;
  private workoutIntensity = 1; // 1 to 3
  private bluetoothDevice: any = null;
  private bluetoothServer: any = null;

  constructor() {
    this.startSimulationLoop();
  }

  public getTelemetry(): WearableTelemetry {
    return { ...this.telemetry };
  }

  public subscribe(listener: TelemetryListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.telemetry });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const copy = { ...this.telemetry };
    this.listeners.forEach(fn => fn(copy));
  }

  public startWorkout(intensityLevel: number = 1.5) {
    this.isWorkoutActive = true;
    this.workoutIntensity = intensityLevel;
  }

  public stopWorkout() {
    this.isWorkoutActive = false;
  }

  public resetWorkoutStats() {
    this.telemetry.activeCalories = 0;
    this.telemetry.activeSeconds = 0;
    this.telemetry.steps = 0;
    this.notify();
  }

  public setWorkoutIntensity(level: number) {
    this.workoutIntensity = Math.max(0.8, Math.min(3, level));
  }

  // Calculate cardio zone
  private updateZone() {
    const hr = this.telemetry.heartRate;
    if (hr < 100) {
      this.telemetry.currentZone = 'Reposo';
      this.telemetry.zoneColor = '#94a3b8'; // slate
    } else if (hr < 125) {
      this.telemetry.currentZone = 'Calentamiento';
      this.telemetry.zoneColor = '#38bdf8'; // sky
    } else if (hr < 155) {
      this.telemetry.currentZone = 'Aeróbico';
      this.telemetry.zoneColor = '#22c55e'; // emerald
    } else if (hr < 175) {
      this.telemetry.currentZone = 'Cardio Intenso';
      this.telemetry.zoneColor = '#f59e0b'; // amber
    } else {
      this.telemetry.currentZone = 'Pico';
      this.telemetry.zoneColor = '#ef4444'; // red
    }
  }

  // --- Web Bluetooth Heart Rate Integration ---
  public async connectBluetoothHeartRate(): Promise<{ success: boolean; message: string }> {
    if (typeof navigator === 'undefined' || !(navigator as any).bluetooth) {
      return {
        success: false,
        message: 'O teu navegador atual não suporta Web Bluetooth (compatível com Chrome e Edge em Android, Mac, Windows).'
      };
    }

    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service']
      });

      this.bluetoothDevice = device;
      const server = await device.gatt.connect();
      this.bluetoothServer = server;

      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
      await characteristic.startNotifications();

      characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = event.target.value;
        const flags = value.getUint8(0);
        const is16Bit = flags & 0x1;
        const hr = is16Bit ? value.getUint16(1, true) : value.getUint8(1);

        this.telemetry.heartRate = hr;
        this.updateZone();
        this.notify();
      });

      device.addEventListener('gattserverdisconnected', () => {
        this.telemetry.isConnected = false;
        this.telemetry.deviceName = 'Desconectado';
        this.notify();
      });

      this.telemetry.isConnected = true;
      this.telemetry.deviceName = device.name || 'Fita Cardíaca Bluetooth';
      this.telemetry.connectionType = 'bluetooth';
      this.notify();

      return {
        success: true,
        message: `Conectado com sucesso a ${this.telemetry.deviceName}`
      };
    } catch (err: any) {
      console.warn('Bluetooth connection error:', err);
      return {
        success: false,
        message: err.message || 'Falha ao emparelhar com o sensor Bluetooth.'
      };
    }
  }

  // --- Real Smartphone Motion Sensor Integration ---
  public async enableDeviceMotionSensor(): Promise<{ success: boolean; message: string }> {
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) {
      return {
        success: false,
        message: 'Sensor de movimento não suportado neste dispositivo.'
      };
    }

    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== 'granted') {
          return { success: false, message: 'Permissão para sensor de movimento negada.' };
        }
      }

      let lastMagnitude = 0;
      window.addEventListener('devicemotion', (event) => {
        const acc = event.accelerationIncludingGravity || event.acceleration;
        if (!acc || acc.x === null) return;
        const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
        
        // Detect step/impact spike
        if (Math.abs(mag - lastMagnitude) > 3.8) {
          this.telemetry.steps += 1;
          this.telemetry.cadenceRpm = Math.min(180, Math.floor(mag * 9));
        }
        lastMagnitude = mag;
      });

      this.telemetry.isConnected = true;
      this.telemetry.deviceName = 'Sensor de Movimento do Telemóvel';
      this.telemetry.connectionType = 'motion';
      this.notify();

      return {
        success: true,
        message: 'Sensor do telemóvel ativado! Coloque no bolso ou braçadeira para medir passos e cadência.'
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Erro ao inicializar sensor de movimento.'
      };
    }
  }

  // Enable smart simulated fitness device (e.g. for testing / demo)
  public enableSimulatedDevice(name: string = 'Garmin Forerunner Futsal') {
    this.telemetry.isConnected = true;
    this.telemetry.deviceName = name;
    this.telemetry.connectionType = 'simulated';
    this.notify();
  }

  public disconnect() {
    if (this.bluetoothServer && this.bluetoothServer.connected) {
      this.bluetoothServer.disconnect();
    }
    this.telemetry.isConnected = false;
    this.telemetry.deviceName = 'Nenhum dispositivo';
    this.telemetry.cadenceRpm = 0;
    this.notify();
  }

  private startSimulationLoop() {
    if (typeof window === 'undefined') return;

    this.timer = window.setInterval(() => {
      if (this.telemetry.connectionType === 'simulated' && this.telemetry.isConnected) {
        if (this.isWorkoutActive) {
          // Heart rate ramps up based on intensity
          const targetHr = 110 + this.workoutIntensity * 24 + (Math.sin(Date.now() / 4000) * 8);
          this.telemetry.heartRate = Math.round(
            this.telemetry.heartRate * 0.85 + targetHr * 0.15 + (Math.random() * 2 - 1)
          );
          this.telemetry.cadenceRpm = Math.round(110 + this.workoutIntensity * 20 + Math.random() * 6);
          this.telemetry.steps += Math.floor(1.8 * this.workoutIntensity);
          this.telemetry.activeCalories += +(0.14 * this.workoutIntensity).toFixed(2);
          this.telemetry.activeSeconds += 1;
        } else {
          // Cooldown to resting
          const targetHr = this.telemetry.restingHeartRate + Math.sin(Date.now() / 8000) * 4;
          this.telemetry.heartRate = Math.round(
            this.telemetry.heartRate * 0.92 + targetHr * 0.08
          );
          this.telemetry.cadenceRpm = 0;
        }
        this.updateZone();
        this.notify();
      } else if (this.isWorkoutActive) {
        this.telemetry.activeSeconds += 1;
        this.telemetry.activeCalories += 0.12;
        this.notify();
      }
    }, 1000);
  }
}

export const wearableService = new WearableManager();
