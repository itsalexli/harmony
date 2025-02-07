class Note {
  constructor(step, octave, duration, type) {
    this.step = step;
    this.octave = octave;
    this.duration = duration;
    this.type = type;
  }

  toString() {
    return `Note: Step=${this.step}, Octave=${this.octave}, Duration=${this.duration}, Type=${this.type}`;
  }
}
