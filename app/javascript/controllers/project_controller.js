import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"
import debounce from "lodash.debounce";

// Connects to data-controller="project"
export default class extends Controller {
  static targets = ["bpm", "play", "pause", "cursor", "playlistTrack"]
  static values = { saveUrl: String, newDrumPatternUrl: String}
  initialize() {
    this.save = debounce(this.save, 1000).bind(this)
  }
  
  play(e) {
    e.preventDefault()
    this.playTarget.classList.add("hidden")
    this.pauseTarget.classList.remove("hidden")
    this.cursorTarget.classList.remove("hidden")
    this.startPlayingLoop()
  }

  pause(e) {
    e.preventDefault()
    this.playTarget.classList.remove("hidden")
    this.pauseTarget.classList.add("hidden")
    this.cursorTarget.classList.add("hidden")
    this.cursorTarget.style.left = '80px'
    this.timeouts.forEach(timeout => clearTimeout(timeout))
  }

  startPlayingLoop() {
    let playlistLength = Array.from(Array(64 * 4).keys())
    let timeDelay = 60_000 / this.bpm / 4
    this.timeouts = [] 
    playlistLength.forEach(i => {
      let timeout = setTimeout(() => {
        let px = 80 + (i * 4)
        // console.log(i, px)
        this.cursorTarget.style.left = `${px}px`
        this.playlistTrackTargets.forEach(target => target.dispatchEvent(new CustomEvent("note-playing", { detail: { noteIndex: i }})))
      }, timeDelay * i)
      this.timeouts.push(timeout)
    })
  }

  save() {
    post(this.saveUrlValue, {
      body: {
        bpm: this.bpm,
      }
    })
  }

  async setDrumPattern(e) {
    if (e.target.value == "") {
      const turboFrame = this.element.querySelector("turbo-frame[id='drum_pattern']")
      turboFrame.src = null
      turboFrame.innerHTML = ""
    }
    if (e.target.value == "new_pattern") {
      await post(this.newDrumPatternUrlValue, { 
        responseKind: 'turbo-stream',
      })
    } else {
      const turboFrame = this.element.querySelector("turbo-frame[id='drum_pattern']")
      turboFrame.src = e.target.value
    }
  }

  get bpm() {
    return this.bpmTarget.value
  }
}
