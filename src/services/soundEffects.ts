// Sound synthesizer using Web Audio API and Speech Synthesis API

class AudioCoachManager {
  private audioCtx: AudioContext | null = null;

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Realistic referee / futsal whistle
  public playWhistle(short: boolean = false) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const duration = short ? 0.35 : 0.8;
      const now = this.audioCtx.currentTime;

      // Two slightly detuned oscillators to create characteristic whistle beats
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(2850, now);
      osc2.frequency.setValueAtTime(2910, now);

      // Add rapid trill modulation
      const modOsc = this.audioCtx.createOscillator();
      const modGain = this.audioCtx.createGain();
      modOsc.frequency.setValueAtTime(24, now); // 24 Hz trill
      modGain.gain.setValueAtTime(150, now);
      modOsc.connect(osc1.frequency);
      modOsc.connect(osc2.frequency);

      // Envelope
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.35, now + 0.05);
      gainNode.gain.setValueAtTime(0.35, now + duration - 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      modOsc.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      modOsc.stop(now + duration);
    } catch (e) {
      console.warn('Audio whistle not supported:', e);
    }
  }

  // Double whistle for drill round completion
  public playDoubleWhistle() {
    this.playWhistle(true);
    setTimeout(() => {
      this.playWhistle(false);
    }, 450);
  }

  // Countdown beep (high pitch short ping)
  public playCountdownBeep(isFinal: boolean = false) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFinal ? 1200 : 800, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (isFinal ? 0.35 : 0.15));

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + (isFinal ? 0.35 : 0.15));
    } catch (e) {
      // ignore
    }
  }

  // Positive chime for points / goals
  public playSuccessChime() {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const now = this.audioCtx!.currentTime + idx * 0.08;
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch (e) {
      // ignore
    }
  }

  // Web Speech API Voice Cue
  public speak(phrase: string, lang: string = 'pt-BR') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = lang;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
    }
  }
}

export const soundEffects = new AudioCoachManager();
