import { Controller } from "@hotwired/stimulus"
import { post, put } from "@rails/request.js"
import debounce from "lodash.debounce";

// Connects to data-controller="playlist-track"
export default class extends Controller {
  static values = { url: String, saveUrl: String, playlistPosition: Number }
  connect() {
    this.loadData()
  }

  initialize() {
    this.save = debounce(this.save, 1000).bind(this)
  }

  async loadData() {
    if (this.urlValue == "") {
      return
    }
    const response = await post(this.urlValue)
    const json = await response.json
    this.tracks = json
  }

  play({ detail: { noteIndex }}) {
    if (!this.tracks) {
      console.log("No tracks")
    }
    let delay = this.playlistPositionValue * 4
    let max = delay + 64
    let note = noteIndex % 64
    if ((noteIndex > delay) && (noteIndex < max)) {
      this.tracks.forEach(track => {
        let noteData = track.noteData.find(n => n['noteIndex'] == note)
        if (!noteData) {
          return;
        }
        let audio = new Audio()
        audio.src = track['fileUrl']
        if (noteData['checked']) {
          audio.play()
        }
      })
    }
  }

  grab() {
    this.dragging = true
  }

  letgo() {
    this.dragging = false
  }

  move(e) {
    if (this.dragging) {
      let rect = this.element.getBoundingClientRect()
      let newX = e.clientX - rect.x
      let playlistTrack = this.element.querySelector('.playlist-track-container')
      if (!playlistTrack) {
        return
      }
      this.playlistPositionValue = Math.round(newX / 16);
      this.save()
      playlistTrack.style.left = `${this.playlistPositionValue * 16}px`
    }
  }

  async save() {
    await put(this.saveUrlValue, {
      body: {
        playlist_position: this.playlistPositionValue
      }
    })
  }
}
