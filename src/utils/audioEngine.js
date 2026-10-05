// CHRONOVA - Swiss Mechanical Sound Engine (Web Audio API)
// Synthesizes authentic mechanical escapement ticking and Cathedral gong minute repeater chimes

let audioCtx = null;
let tickingInterval = null;
let isTickingActive = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a single mechanical escapement tick (high-beat 4Hz / 28,800 vph feel)
 */
export function playMechanicalTick(pitch = 1.0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // High pass filter to simulate the dry, precise click of ruby jewels against the steel escape wheel
    filter.type = 'highpass';
    filter.frequency.value = 2400 * pitch;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(3200 * pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800 * pitch, ctx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    console.debug("Audio tick preview error:", e);
  }
}

/**
 * Toggle continuous ambient mechanical ticking (4 ticks per second)
 */
export function toggleAmbientEscapement(callback) {
  if (isTickingActive) {
    if (tickingInterval) clearInterval(tickingInterval);
    isTickingActive = false;
    if (callback) callback(false);
    return false;
  } else {
    isTickingActive = true;
    let tickCount = 0;
    // 250ms = 4Hz (typical 28,800 vph escapement beat)
    tickingInterval = setInterval(() => {
      tickCount++;
      const pitch = tickCount % 2 === 0 ? 1.08 : 0.95;
      playMechanicalTick(pitch);
    }, 250);
    if (callback) callback(true);
    return true;
  }
}

export function isAmbientEscapementActive() {
  return isTickingActive;
}

/**
 * Play Cathedral Gong Minute Repeater Chime Sequence
 * @param {string} mode - 'hour' (Low gong), 'quarter' (High-Low chord), 'minute' (High gong), 'full' (Demo sequence)
 */
export function playMinuteRepeaterChime(mode = 'full') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playGong = (frequency, delayTime, duration = 1.6, volume = 0.22) => {
      setTimeout(() => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gain = ctx.createGain();

        // Deep rich Cathedral gong resonance
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        // Overtone harmonic
        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(frequency * 2.76, now);

        const harmGain = ctx.createGain();
        harmGain.gain.setValueAtTime(volume * 0.4, now);
        harmGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        oscHarmonic.connect(harmGain);
        harmGain.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + duration);
        oscHarmonic.stop(now + duration);
      }, delayTime);
    };

    const LOW_GONG = 415.30;  // G#4 (Hour Gong)
    const HIGH_GONG = 622.25; // D#5 (Minute Gong)

    if (mode === 'hour') {
      playGong(LOW_GONG, 0, 2.0);
    } else if (mode === 'quarter') {
      playGong(HIGH_GONG, 0, 1.4);
      playGong(LOW_GONG, 280, 1.8);
    } else if (mode === 'minute') {
      playGong(HIGH_GONG, 0, 1.4);
    } else {
      // Full Demo: 10 Hours (3 strikes for demo), 3 Quarters (Ding-Dong x2), 4 Minutes (Ding x3)
      // Sequence: Hours (Low) -> Quarters (High-Low) -> Minutes (High)
      let time = 0;
      // 3 Hour strikes
      for (let i = 0; i < 3; i++) {
        playGong(LOW_GONG, time, 1.6);
        time += 550;
      }
      time += 250;
      // 2 Quarter strikes (High-Low)
      for (let i = 0; i < 2; i++) {
        playGong(HIGH_GONG, time, 1.3);
        playGong(LOW_GONG, time + 220, 1.5);
        time += 600;
      }
      time += 250;
      // 3 Minute strikes (High)
      for (let i = 0; i < 3; i++) {
        playGong(HIGH_GONG, time, 1.2);
        time += 450;
      }
    }
  } catch (err) {
    console.debug("Chime playback error:", err);
  }
}
