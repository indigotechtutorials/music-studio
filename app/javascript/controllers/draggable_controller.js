import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"
// Connects to data-controller="draggable"
export default class extends Controller {
  static values = { url: String }
  
  dragStart(e) {
    e.dataTransfer.clearData();
    e.dataTransfer.setData('text/plain', e.target.dataset.id)
  }

  dragEnter(e) {
    if (!this.element.classList.contains("bg-indigo-500")) {
      this.element.classList.add("bg-indigo-500")
    }
  }

  dragOver(e) {
    console.log("Dragging over")
    e.preventDefault()
  }

  async dragEnd(e) {
    console.log("drag end")
    if (this.element.classList.contains("bg-indigo-500")) {
      this.element.classList.remove("bg-indigo-500")
    }
    await post(this.urlValue, { 
      body: {
        drag_id: e.target.dataset.id,
      }
    })
  }

  async drop(e) {
    let dataId = e.dataTransfer.getData('text/plain')
    await post(this.urlValue, { 
      body: {
        drag_id: dataId,
      }
    })
  }
}
