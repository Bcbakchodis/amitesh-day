// High-fidelity sound effects engine using Web Audio API + optional audio files
// Works completely offline & in any browser without needing external audio downloads,
// but seamlessly plays uploaded custom MP3s if placed in /public/audio/

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8;
  private onDuckMusic?: (duck: boolean) => void;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  public setDuckCallback(cb: (duck: boolean) => void) {
    this.onDuckMusic = cb;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private async tryPlayAudioFile(url: string): Promise<boolean> {
    try {
      const audio = new Audio(url);
      audio.volume = this.volume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        return true;
      }
    } catch {
      // Graceful fallback to Web Audio synthesis
    }
    return false;
  }

  // Duck background music during sound effects
  private triggerDuck(durationMs: number) {
    if (this.onDuckMusic) {
      this.onDuckMusic(true);
      setTimeout(() => {
        if (this.onDuckMusic) {
          this.onDuckMusic(false);
        }
      }, durationMs);
    }
  }

  // 1. Scratch Sound (realistic card scratch sound)
  public async playScratch() {
    if (this.isMuted) return;
    const playedFile = await this.tryPlayAudioFile("/audio/scratch.mp3");
    if (playedFile) return;

    this.initContext();
    if (!this.ctx) return;

    try {
      // Synthesize scratch noise
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800 + Math.random() * 800;
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // Ignore
    }
  }

  // 2. Birthday Cake Celebration Fanfare (chimes + celebratory brass arpeggios)
  public async playCelebration() {
    if (this.isMuted) return;
    this.triggerDuck(2800);

    const playedFile = await this.tryPlayAudioFile("/audio/celebration.mp3");
    if (playedFile) return;

    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Notes for celebratory fanfare: C5, E5, G5, C6, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
      const noteTimes = [0, 0.15, 0.3, 0.45, 0.75, 0.95];
      const durations = [0.2, 0.2, 0.2, 0.4, 0.2, 0.9];

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + noteTimes[idx]);

        // Sparkle overtone
        const sparkle = this.ctx.createOscillator();
        sparkle.type = "sine";
        sparkle.frequency.setValueAtTime(freq * 2, now + noteTimes[idx]);

        const sparkleGain = this.ctx.createGain();
        sparkleGain.gain.setValueAtTime(0.1 * this.volume, now + noteTimes[idx]);
        sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + noteTimes[idx] + durations[idx]);

        gain.gain.setValueAtTime(0.35 * this.volume, now + noteTimes[idx]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + noteTimes[idx] + durations[idx]);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        sparkle.connect(sparkleGain);
        sparkleGain.connect(this.ctx.destination);

        osc.start(now + noteTimes[idx]);
        osc.stop(now + noteTimes[idx] + durations[idx]);

        sparkle.start(now + noteTimes[idx]);
        sparkle.stop(now + noteTimes[idx] + durations[idx]);
      });
    } catch {
      // Ignore
    }
  }

  // 3. Gift Box Shake (wooden resonance + anticipation click)
  public async playGiftShake(step: number = 1) {
    if (this.isMuted) return;
    this.triggerDuck(400);

    const playedFile = await this.tryPlayAudioFile("/audio/shake.mp3");
    if (playedFile) return;

    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      const baseFreq = 120 + step * 25;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.15);

      gain.gain.setValueAtTime(0.4 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Ignore
    }
  }

  // 4. Hilarious Comedy Fail Punchline ("Wah-Wah-Wah-Waaaaah" trombone slide)
  public async playComedyFail() {
    if (this.isMuted) return;
    this.triggerDuck(3500);

    const playedFile = await this.tryPlayAudioFile("/audio/fail.mp3");
    if (playedFile) return;

    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Sad trombone pitches: D#3, D3, C#3, C3 (with slow downward bend)
      const freqs = [311.13, 293.66, 277.18, 261.63];
      const startTimes = [0, 0.45, 0.9, 1.35];
      const lengths = [0.35, 0.35, 0.35, 1.4];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Sawtooth for brassy comic tone
        osc.type = "sawtooth";
        const startTime = now + startTimes[idx];
        const dur = lengths[idx];

        osc.frequency.setValueAtTime(freq, startTime);
        if (idx === 3) {
          // Slide down on the final sad waaaah
          osc.frequency.linearRampToValueAtTime(freq * 0.75, startTime + dur);
        }

        // Lowpass filter for muffled trombone timbre
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, startTime);
        if (idx === 3) {
          filter.frequency.linearRampToValueAtTime(350, startTime + dur);
        }

        gain.gain.setValueAtTime(0.3 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();
