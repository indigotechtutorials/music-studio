import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"
// Connects to data-controller="playlist-track"
export default class extends Controller {
  static values = { url: String }
  connect() {
    this.loadData()
  }

  async loadData() {
    const response = await post(this.urlValue)
    const json = await response.json
    this.tracks = json
  }

  play({ detail: { noteIndex }}) {
    if (!this.tracks) {
      console.log("No tracks")
    }
    this.tracks.forEach(track => {
      let audio = new Audio()
      audio.src = track['fileUrl']
      let noteData = track.noteData.find(n => n['noteIndex'] == noteIndex + 1)
      if (noteData['checked']) {
        audio.play()
      }
    })
  }
}
