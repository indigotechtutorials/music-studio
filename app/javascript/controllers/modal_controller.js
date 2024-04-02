import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["modal"]
  closeIfBackground(e) {
    if (!this.modalTarget.contains(e.target)) {
      this.element.remove()
    }
  }
}
