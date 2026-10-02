import React, { useState, useRef } from 'react';
import { Player } from '../types/futsal';
import { processImageUpload } from '../utils/imageUpload';
import { X, Camera, Upload, Trash2, Check, RefreshCw } from 'lucide-react';

interface EditPlayerModalProps {
  player: Player;
  onSave: (updated: Player) => void;
  onDelete?: (playerId: string) => void;
  onClose: () => void;
}

export const EditPlayerModal: React.FC<EditPlayerModalProps> = ({
  player,
  onSave,
  onDelete,
  onClose
}) => {
  const [name, setName] = useState(player.name);
  const [age, setAge] = useState(player.age);
  const [avatar, setAvatar] = useState(player.avatar);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(player.photoUrl);
  const [jerseyNumber, setJerseyNumber] = useState(player.jerseyNumber);
  const [dominantFoot, setDominantFoot] = useState(player.dominantFoot);
  const [role, setRole] = useState(player.role);
  const [level, setLevel] = useState(player.level);

  // Stats
  const [control, setControl] = useState(player.stats.control);
  const [precision, setPrecision] = useState(player.stats.precision);
  const [velocity, setVelocity] = useState(player.stats.velocity);
  const [decision, setDecision] = useState(player.stats.decision);
  const [teamwork, setTeamwork] = useState(player.stats.teamwork);
  const [resilience, setResilience] = useState(player.stats.resilience);

  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingPhoto(true);
      const compressedDataUrl = await processImageUpload(file, 400);
      setPhotoUrl(compressedDataUrl);
    } catch (err) {
      console.error(err);
      alert('Não foi possível processar a imagem. Tente uma foto menor.');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: Player = {
      ...player,
      name: name.trim(),
      age: Number(age),
      avatar,
      photoUrl,
      jerseyNumber: Number(jerseyNumber),
      dominantFoot,
      role,
      level: level.trim() || player.level,
      stats: {
        control: Number(control),
        precision: Number(precision),
        velocity: Number(velocity),
        decision: Number(decision),
        teamwork: Number(teamwork),
        resilience: Number(resilience)
      }
    };

    onSave(updated);
    onClose();
  };

  const AVATAR_OPTIONS = ['👦', '👧', '🧑', '🧒', '🏃', '⚽', '🦁', '⭐', '🐯', '👨‍💼', '👩‍💼'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎴</span>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Editar Ficha do Atleta
              </h3>
              <p className="text-xs text-slate-400">
                Altere nome, foto real, posição e estatísticas de futsal
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Photo & Avatar Section */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 bg-slate-800 flex items-center justify-center shadow-lg">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">{avatar}</span>
                )}
              </div>

              {/* Upload trigger overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity rounded-2xl cursor-pointer"
                title="Trocar Foto"
              >
                <Camera className="w-6 h-6 text-amber-400" />
                <span className="text-[10px] font-bold mt-1">Trocar Foto</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2 flex-1 text-center sm:text-left">
              <div className="font-bold text-white text-sm">Foto Real do Jogador</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Tire uma foto com o celular ou escolha da galeria. A foto aparece na Ficha FUT, no pódio e nos certificados.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingPhoto}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 transition-all shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isProcessingPhoto ? 'Processando...' : 'Carregar Foto'}</span>
                </button>

                {photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold rounded-lg transition-colors"
                  >
                    Usar Emoji
                  </button>
                )}
              </div>

              {/* Avatar Emoji picker if no photo */}
              {!photoUrl && (
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 block mb-1">Ou escolha um avatar:</span>
                  <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                    {AVATAR_OPTIONS.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setAvatar(em)}
                        className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                          avatar === em
                            ? 'bg-amber-400/20 border-2 border-amber-400 scale-110'
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Player Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 block">
                Nome do Jogador
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 block">
                  Idade (Anos)
                </label>
                <input
                  type="number"
                  min={2}
                  max={65}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 block">
                  Nº da Camisa
                </label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={jerseyNumber}
                  onChange={(e) => setJerseyNumber(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 block">
                Posição / Função no Futsal
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Ala">Ala (Velocidade e Passe nos corredores)</option>
                <option value="Pivô">Pivô (Referência de ataque e finalização)</option>
                <option value="Fixador / Fecho">Fixador / Fecho (Organização e defesa)</option>
                <option value="Guarda-Redes">Guarda-Redes (Goleiro com os pés)</option>
                <option value="Explorador">Explorador (Iniciação lúdica 2 a 5 anos)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 block">
                Pé Dominante
              </label>
              <select
                value={dominantFoot}
                onChange={(e) => setDominantFoot(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Direito">Destro (Direito)</option>
                <option value="Esquerdo">Canhoto (Esquerdo)</option>
                <option value="Ambidestro">Ambidestro (Dois Pés)</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 block">
                Título de Nível / Apelido
              </label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Ex: Craque Familiar Lv. 4"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Stats Sliders (Radar Attributes) */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider">
                Estatísticas do Card (0 a 99)
              </span>
              <span className="text-[10px] text-slate-400">
                Média Geral:{' '}
                <strong className="text-amber-400 font-mono text-xs">
                  {Math.round((control + precision + velocity + decision + teamwork + resilience) / 6)}
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Controlo de Bola (CTR)</span>
                  <span className="font-mono font-bold text-white">{control}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={control}
                  onChange={(e) => setControl(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Precisão de Passe / Chute (PRC)</span>
                  <span className="font-mono font-bold text-white">{precision}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Velocidade & Arranque (VEL)</span>
                  <span className="font-mono font-bold text-white">{velocity}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Tomada de Decisão (DEC)</span>
                  <span className="font-mono font-bold text-white">{decision}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={decision}
                  onChange={(e) => setDecision(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Espírito de Equipa (EQU)</span>
                  <span className="font-mono font-bold text-white">{teamwork}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={teamwork}
                  onChange={(e) => setTeamwork(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Resiliência após Erro (RES)</span>
                  <span className="font-mono font-bold text-white">{resilience}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="99"
                  value={resilience}
                  onChange={(e) => setResilience(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Delete Option */}
          {onDelete && (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              {!confirmDelete ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remover Atleta</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-300">Confirmar exclusão?</span>
                  <button
                    type="button"
                    onClick={() => onDelete(player.id)}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold"
                  >
                    Sim, excluir
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="px-2 py-1 text-slate-400 hover:text-white text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
