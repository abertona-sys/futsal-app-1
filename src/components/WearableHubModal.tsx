import React, { useState, useEffect } from 'react';
import { wearableService } from '../services/wearableService';
import { WearableTelemetry } from '../types/futsal';
import {
  X,
  Heart,
  Bluetooth,
  Smartphone,
  Activity,
  CheckCircle2,
  AlertCircle,
  Flame,
  Info
} from 'lucide-react';

interface WearableHubModalProps {
  onClose: () => void;
}

export const WearableHubModal: React.FC<WearableHubModalProps> = ({ onClose }) => {
  const [telemetry, setTelemetry] = useState<WearableTelemetry>(wearableService.getTelemetry());
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const unsub = wearableService.subscribe((data) => {
      setTelemetry(data);
    });
    return () => unsub();
  }, []);

  const handleConnectBluetooth = async () => {
    setIsConnecting(true);
    setStatusMessage({ text: 'Abrindo seletor Bluetooth do navegador...', type: 'info' });
    const res = await wearableService.connectBluetoothHeartRate();
    setIsConnecting(false);
    setStatusMessage({
      text: res.message,
      type: res.success ? 'success' : 'error'
    });
  };

  const handleConnectMotion = async () => {
    setIsConnecting(true);
    const res = await wearableService.enableDeviceMotionSensor();
    setIsConnecting(false);
    setStatusMessage({
      text: res.message,
      type: res.success ? 'success' : 'error'
    });
  };

  const handleConnectSimulated = () => {
    wearableService.enableSimulatedDevice('Sensor Garmin Futsal Pro (Simulado)');
    setStatusMessage({
      text: 'Sensor de alta precisão simulado conectado para teste em tempo real!',
      type: 'success'
    });
  };

  const handleDisconnect = () => {
    wearableService.disconnect();
    setStatusMessage({ text: 'Dispositivo desconectado.', type: 'info' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Central de Dispositivos Vestíveis
              </h3>
              <p className="text-xs text-slate-400">
                Rastreamento cardíaco e atividade física em tempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                  : statusMessage.type === 'error'
                  ? 'bg-red-950/40 text-red-300 border-red-500/30'
                  : 'bg-sky-950/40 text-sky-300 border-sky-500/30'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              ) : statusMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              ) : (
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
              )}
              <span className="leading-relaxed">{statusMessage.text}</span>
            </div>
          )}

          {/* Active Sensor Live Monitor */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Status da Conexão</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  telemetry.isConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {telemetry.isConnected ? '● Ativo e Transmitindo' : '○ Desconectado'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Frequência</div>
                <div className="text-2xl font-black font-mono text-white mt-0.5 tabular-nums">
                  {telemetry.heartRate}{' '}
                  <span className="text-[10px] text-slate-400 font-normal">BPM</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Zona Cardio</div>
                <div
                  className="text-xs font-bold mt-2"
                  style={{ color: telemetry.zoneColor }}
                >
                  {telemetry.currentZone}
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Calorias</div>
                <div className="text-2xl font-black font-mono text-amber-400 mt-0.5 tabular-nums">
                  {Math.round(telemetry.activeCalories)}
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Passos / Salto</div>
                <div className="text-2xl font-black font-mono text-sky-400 mt-0.5 tabular-nums">
                  {telemetry.steps}
                </div>
              </div>
            </div>

            {telemetry.isConnected && (
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                <span className="text-slate-400 truncate">
                  Dispositivo: <span className="text-white font-medium">{telemetry.deviceName}</span>
                </span>
                <button
                  onClick={handleDisconnect}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  Desconectar
                </button>
              </div>
            )}
          </div>

          {/* Connection Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Opções de Conexão em Tempo Real
            </h4>

            <div className="space-y-2.5">
              {/* Option 1: Web Bluetooth */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Bluetooth className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Fita Cardíaca ou Relógio Bluetooth</div>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Polar, Garmin HRM, Wahoo, Apple Watch (via app transmissor HR padrão BLE 0x180D).
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleConnectBluetooth}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow shrink-0 active:scale-95"
                >
                  Emparelhar BLE
                </button>
              </div>

              {/* Option 2: Mobile Motion Accelerometer */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Sensor de Movimento do Telemóvel</div>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Usa o acelerômetro interno do telemóvel no bolso ou braçadeira para medir corrida, passos e intensidade.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleConnectMotion}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow shrink-0 active:scale-95"
                >
                  Ativar Sensor
                </button>
              </div>

              {/* Option 3: Smart Simulation */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Simulador Dinâmico Inteligente</div>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      Simula variações reais de frequência cardíaca durante os treinos (ideal para testes no computador).
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleConnectSimulated}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow shrink-0 active:scale-95"
                >
                  Modo Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
