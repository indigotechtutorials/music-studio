import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="keyboard"
export default class extends Controller {
  static targets = ["volume", "waveform", "biquad", "biquadFreq", "biquadPeak"];

  playNote({ params: { note, octave } }) {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscList = [];
    let mainGainNode = audioContext.createGain();
    mainGainNode.gain.value = this.volumeTarget.value;
    let freq = this.noteFreq[note][octave];
    let osc = audioContext.createOscillator();
    this.osc = osc
    // connect gain to osc
    mainGainNode.connect(audioContext.destination);
    osc.connect(mainGainNode);

    const type = this.waveformTarget.value;

    if (type === "custom") {
      osc.setPeriodicWave(customWaveform);
    } else {
      osc.type = type;
    }

    osc.frequency.setValueAtTime(420, audioContext.currentTime);

    //let cutOff = parseFloat(this.convolverTarget.value) * 10000
    //console.log(cutOff)
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = this.biquadTarget.value;
    console.log(this.biquadFreqTarget.value)
    biquadFilter.frequency.setValueAtTime(this.biquadFreqTarget.value, audioContext.currentTime + 0.5);
    osc.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);

    osc.start();
    // const convolver = this.audioContext.createConvolver();
    // this.osc.connect(convolver)
  }

  releaseNote() {
    if (this.osc) {
      this.osc.stop();
    }
  }

  updateVolume() {
    if (!this.mainGainNode) {
      return
    }
    this.mainGainNode.gain.value = this.volumeTarget.value;
  }

  get customWaveform() {
    let sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    let cosineTerms = new Float32Array(sineTerms.length);
    return this.audioContext.createPeriodicWave(
      cosineTerms,
      sineTerms
    );
  }

  get noteFreq() {
    return {
      C: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
      Db: [
        17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92,
      ],
      D: [
        18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64,
      ],
      Eb: [
        19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03,
      ],
      E: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
      F: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
      Gb: [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
      G: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
      Ab: [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
      A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
      Bb: [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
      B: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07],
    };
  }
}
