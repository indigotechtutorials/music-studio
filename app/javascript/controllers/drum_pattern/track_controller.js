import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="drum-pattern--track"
export default class extends Controller {
  static targets = ["filename", "note", "menu"]
  static values = { sound: String }

  connect() {
    this.audio = new Audio()
    if (this.soundValue.includes("/rails/active_storage/blobs")) {
      this.audio.src = this.soundValue
    } else {
      this.audio.src = `/audios/${this.soundValue}.wav`
    }
    document.body.addEventListener("contextmenu", this.stopContextMenu.bind(this))
  }

  pause() {
    this.audio.currentTime = 0
    this.audio.pause()
  }

  notePlayed({ detail: { noteIndex }}) {
    let note = this.noteTargets.find(n => n.dataset.index == noteIndex)
    if (note.checked) {
      this.audio.currentTime = 0
      this.audio.play()
    }
  }

  fileAdded({ detail: { file }}) {
    this.filenameTarget.innerHTML = file.name
  }

  handleClick(e) {
    if (e.button == 2) {
      e.preventDefault()
    }
    if (!this.element.contains(e.target)) {
      if (!this.menuTarget.classList.contains("hidden")) {
        this.menuTarget.classList.add("hidden")
      }
    }
  }

  stopContextMenu(e) {
    if (this.element.contains(e.target)) {
      e.preventDefault()
      this.menuTarget.classList.remove("hidden")
      let newX = event.clientX - (this.menuTarget.offsetWidth / 2) - 500;
      let newY = event.clientY - (this.menuTarget.offsetHeight / 2) + 50;

      this.menuTarget.style.top = `${newY}px`
      this.menuTarget.style.left = `${newX}px`
    }
  }

  fillTwoSteps(e) {
    e.preventDefault()
    this.menuTarget.classList.add("hidden")
    this.noteTargets.forEach((t, i) => {
      if (i % 2 == 0) {
        t.checked = true
      } else {
        t.checked = false
      }
    })
  }

  fillFourSteps(e) {
    e.preventDefault()
    this.menuTarget.classList.add("hidden")
    this.noteTargets.forEach((t, i) => {
      if (i % 4 == 0) {
        t.checked = true
      } else {
        t.checked = false
      }
    })
  }

  fillAllSteps(e) {
    e.preventDefault()
    this.menuTarget.classList.add("hidden")
    this.noteTargets.forEach(t => t.checked = true)
  }

  clearAllSteps(e) {
    e.preventDefault()
    this.menuTarget.classList.add("hidden")
    this.noteTargets.forEach(t => t.checked = false)
  }

  copySteps(e) {
    e.preventDefault()
    this.menuTarget.classList.add("hidden")
    this.element.dispatchEvent(new CustomEvent("drum-pattern--track:copy", { 
      detail: { notes: this.noteTargets.map(t => t.checked) }
    }))
  }

  pasteSteps(e) {
    e.preventDefault()
    this.menuTarget.classList.add("hidden")
    this.noteTargets.forEach((t, i) => t.checked = this.drumPattern.copiedSteps[i])
  }

  get drumPattern() {
    let el = this.element.closest("[data-controller='drum-pattern']")
    return this.application.getControllerForElementAndIdentifier(el, 'drum-pattern')
  }
}