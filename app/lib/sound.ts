// Web Audio API Synthesizer for MATRIX experience
class AudioSystem {
  private ctx: AudioContext | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = true;

  private initCtx() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    this.initCtx();

    if (mute) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
  }

  getMuted() {
    return this.isMuted;
  }

  startDrone() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    if (this.droneOsc) return; // already running

    try {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = "sawtooth";
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A hum

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(100, this.ctx.currentTime);

      this.droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start();
    } catch (e) {
      console.error("Drone failed", e);
    }
  }

  stopDrone() {
    try {
      if (this.droneOsc) {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
        this.droneOsc = null;
      }
      if (this.droneGain) {
        this.droneGain.disconnect();
        this.droneGain = null;
      }
    } catch (e) {
      console.error(e);
    }
  }

  playClick(freq: number = 800) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  playHoverClick(freq: number = 800) {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    this.playClick(freq);
  }

  playBeep(freq: number = 600, duration: number = 0.1) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration + 0.02);
    } catch {}
  }

  playGlitch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      const now = this.ctx.currentTime;

      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(1200, now + 0.03);
      osc.frequency.setValueAtTime(800, now + 0.06);
      osc.frequency.setValueAtTime(2000, now + 0.09);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.13);
    } catch {}
  }

  playEmp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const now = this.ctx.currentTime;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 1.2);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(30, now + 1.2);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 1.3);
    } catch {}
  }

  playUplink() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(1500, now + 0.8);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.85);
    } catch {}
  }

  playCurtainReveal() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Warm chord notes (Cinematic velvet stage chord swell)
      const frequencies = [130.81, 196.00, 261.63, 392.00, 523.25];

      frequencies.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = i === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 2.2);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(2400, now + 1.0);
        filter.frequency.exponentialRampToValueAtTime(500, now + 2.5);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.035 / (i + 1), now + 0.5 + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + 2.8);
      });
    } catch {}
  }
}

export const soundManager = new AudioSystem();
