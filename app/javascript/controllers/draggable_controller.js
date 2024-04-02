import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"
// Connects to data-controller="draggable"
export default class extends Controller {
  static values = { url: String }
  connect() {
    console.log("Hola")
  }
  
  dragStart(ev) {
  }

  dragEnter(e) {
    if (!this.element.classList.contains("bg-indigo-500")) {
      this.element.classList.add("bg-indigo-500")
    }
  }

  async dragEnd(e) {
    if (this.element.classList.contains("bg-indigo-500")) {
      this.element.classList.remove("bg-indigo-500")
    }
    await post(this.urlValue, { 
      body: {
        file_id: e.target.dataset.id,
      }
    })
  }
}
