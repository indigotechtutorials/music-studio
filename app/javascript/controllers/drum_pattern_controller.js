import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"
import debounce from "lodash.debounce";

// Connects to data-controller="drum-pattern"
export default class extends Controller {
  static targets = ["play", "pause", "cursor", "track", "bpm"]
  static values = { saveUrl: String }
  
  initialize() {
    this.save = debounce(this.save, 1000).bind(this)
  }
  
  connect() {
    this.isPlaying = false
    this.timeouts = []
  }

  play(e) {
    e.preventDefault()
    this.playTarget.classList.add("hidden")
    this.pauseTarget.classList.remove("hidden")
    this.cursorTarget.classList.remove("hidden")
    this.isPlaying = true
    this.startLoop()
  }

  pause(e) {
    e.preventDefault()
    this.pauseTarget.classList.add("hidden")
    this.playTarget.classList.remove("hidden")
    this.cursorTarget.classList.add("hidden")
    this.cursorTarget.style.left = '32px'
    this.timeouts.forEach(timeout => clearTimeout(timeout))
    this.isPlaying = false
    this.trackTargets.forEach(track => track.dispatchEvent(new CustomEvent("drum-pattern:pause")))
  }

  startLoop() {
    this.currentNote = 1
    Array(64).fill(0).forEach((_, i) => {
      let timeout = setTimeout(() => {
        if (!this.isPlaying) {
          return
        }
        this.cursorTarget.style.left = `${40 + i * 15}px`
        this.trackTargets.forEach(track => track.dispatchEvent(new CustomEvent("drum-pattern:note-played", { detail: { noteIndex: i + 1 }})))

        this.currentNote += 1
        if (this.currentNote > 64) {
          setTimeout(() => {          
            this.cursorTarget.style.left = '40px'
            this.startLoop()
          }, this.timeDelay)
        }
      }, this.timeDelay * i)
      this.timeouts.push(timeout)
    })
  }

  copySteps({ detail: { notes }}) {
    this.copiedSteps = notes
  }

  save() {
    console.log("Saving", this.saveUrlValue)
    post(this.saveUrlValue, {
      body: {
        bpm: this.bpm,
      }
    })
  }

  get bpm() {
    return this.bpmTarget.value
  }

  get timeDelay() {
    return 60_000 / this.bpm / 4 
  }
}
