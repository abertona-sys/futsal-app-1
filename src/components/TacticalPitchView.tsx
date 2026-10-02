import React from 'react';
import { DrillMarker } from '../types/futsal';

interface TacticalPitchViewProps {
  markers: DrillMarker[];
  interactive?: boolean;
  selectedMarker?: string | null;
  onSelectMarker?: (label: string) => void;
  className?: string;
}

export const TacticalPitchView: React.FC<TacticalPitchViewProps> = ({
  markers,
  interactive = false,
  selectedMarker,
  onSelectMarker,
  className = ''
}) => {
  return (
    <div
      className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-emerald-500/30 shadow-inner select-none ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, #0f3823 0%, #082115 100%)'
      }}
    >
      {/* Futsal Court lines (SVG vector) */}
      <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 400 250">
        {/* Outer perimeter */}
        <rect x="15" y="15" width="370" height="220" fill="none" stroke="#4ade80" strokeWidth="2.5" />
        
        {/* Half court line */}
        <line x1="200" y1="15" x2="200" y2="235" stroke="#4ade80" strokeWidth="2" strokeDasharray="6,4" />
        
        {/* Center circle */}
        <circle cx="200" cy="125" r="35" fill="none" stroke="#4ade80" strokeWidth="2" />
        <circle cx="200" cy="125" r="3" fill="#4ade80" />

        {/* Left Goal Area (6m D-arc) */}
        <path d="M 15 75 A 50 50 0 0 1 15 175" fill="none" stroke="#4ade80" strokeWidth="2" />
        <line x1="15" y1="90" x2="45" y2="90" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="15" y1="160" x2="45" y2="160" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="45" y1="90" x2="45" y2="160" stroke="#4ade80" strokeWidth="1.5" />
        {/* Left Goal Frame */}
        <rect x="5" y="100" width="10" height="50" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="2" />

        {/* Right Goal Area (6m D-arc) */}
        <path d="M 385 75 A 50 50 0 0 0 385 175" fill="none" stroke="#4ade80" strokeWidth="2" />
        <line x1="385" y1="90" x2="355" y2="90" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="385" y1="160" x2="355" y2="160" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="355" y1="90" x2="355" y2="160" stroke="#4ade80" strokeWidth="1.5" />
        {/* Right Goal Frame */}
        <rect x="385" y="100" width="10" height="50" fill="rgba(255,255,255,0.15)" stroke="#ffffff" strokeWidth="2" />

        {/* Penalty spots */}
        <circle cx="75" cy="125" r="2.5" fill="#4ade80" />
        <circle cx="325" cy="125" r="2.5" fill="#4ade80" />
      </svg>

      {/* Interactive / Positioned Markers */}
      {markers.map((marker, index) => {
        const isSelected = selectedMarker === marker.label;

        return (
          <div
            key={index}
            onClick={() => interactive && marker.label && onSelectMarker?.(marker.label)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform ${
              interactive ? 'cursor-pointer hover:scale-110 active:scale-95' : ''
            }`}
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            {marker.type === 'player' && (
              <div className="relative group">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/40'
                      : 'bg-blue-600 text-white border-blue-200'
                  }`}
                >
                  🏃
                </div>
                {marker.label && (
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-950/90 text-slate-100 text-[10px] font-medium rounded whitespace-nowrap border border-slate-700 pointer-events-none">
                    {marker.label}
                  </span>
                )}
              </div>
            )}

            {marker.type === 'cone' && (
              <div className="relative group">
                <div className="w-6 h-6 flex items-center justify-center text-lg filter drop-shadow">
                  🔺
                </div>
                {marker.label && (
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-amber-300 font-semibold whitespace-nowrap bg-black/60 px-1 rounded">
                    {marker.label}
                  </span>
                )}
              </div>
            )}

            {marker.type === 'ball' && (
              <div className="relative animate-bounce">
                <div className="w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center text-xs shadow-md border border-slate-300">
                  ⚽
                </div>
              </div>
            )}

            {marker.type === 'goal' && (
              <div className="px-2 py-0.5 bg-emerald-500/80 text-white font-bold text-[10px] rounded border border-white shadow">
                🥅 {marker.label || 'Golo'}
              </div>
            )}

            {marker.type === 'target' && (
              <div className="relative group">
                <div className="w-7 h-7 rounded-full bg-amber-500/30 border-2 border-dashed border-amber-400 flex items-center justify-center text-xs text-amber-300 animate-pulse font-bold">
                  🎯
                </div>
                {marker.label && (
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-amber-200 whitespace-nowrap bg-black/70 px-1 rounded">
                    {marker.label}
                  </span>
                )}
              </div>
            )}

            {marker.type === 'zone' && (
              <div className="px-3 py-1 bg-sky-500/20 border-2 border-sky-400/80 rounded-lg text-sky-200 text-xs font-semibold backdrop-blur-xs">
                📍 {marker.label || 'Zona'}
              </div>
            )}
          </div>
        );
      })}

      {/* Tactical Badge Overlay */}
      <div className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded border border-slate-700/60 text-[10px] font-semibold text-emerald-400 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Prancha Tática Oficial · Futsal Infantil</span>
      </div>
    </div>
  );
};
