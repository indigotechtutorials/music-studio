import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="collapsible"
export default class extends Controller {
  static targets = ["container"]
  toggle() {
    this.containerTarget.classList.toggle("h-0")
  }
}
