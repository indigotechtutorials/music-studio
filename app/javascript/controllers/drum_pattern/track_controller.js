import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";
import debounce from "lodash.debounce";

// Connects to data-controller="drum-pattern--track"
export default class extends Controller {
  static targets = ["filename", "note", "menu"];
  static values = { sound: String, saveUrl: String, index: Number };

  initialize() {
    this.save = debounce(this.save, 1000).bind(this);
  }

  connect() {
    this.audio = new Audio();
    if (this.soundValue.includes("/rails/active_storage/blobs")) {
      this.audio.src = this.soundValue;
    } else {
      this.audio.src = `/audios/${this.soundValue}.wav`;
    }
    document.body.addEventListener(
      "contextmenu",
      this.stopContextMenu.bind(this)
    );
  }

  pause() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  notePlayed({ detail: { noteIndex } }) {
    let note = this.noteTargets.find((n) => n.dataset.index == noteIndex);
    let nextNotes = this.noteTargets.filter((n) => n.dataset.index > noteIndex && n['checked'] == true)
    if (nextNotes.length == 0) {
      this.drumPattern.trackComplete(this.indexValue)
    }
    if (note.checked) {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }

  fileAdded({ detail: { file } }) {
    this.filenameTarget.innerHTML = file.name;
  }

  handleClick(e) {
    if (e.button == 2) {
      console.log("preventing default")
      e.preventDefault();
    }
    if (!this.element.contains(e.target)) {
      if (!this.menuTarget.classList.contains("hidden")) {
        this.menuTarget.classList.add("hidden");
      }
    }
  }

  stopContextMenu(e) {
    if (this.element.contains(e.target)) {
      this.menuTarget.classList.remove("hidden");
      console.log(this.menuTarget);
      let newX = event.clientX - this.element.offsetWidth / 2;
      let newY = event.clientY - this.element.offsetHeight / 2;
      console.log(newX, newY);
      this.menuTarget.style.top = `${newY}px`;
      this.menuTarget.style.left = `${newX}px`;
    }
  }

  fillTwoSteps(e) {
    e.preventDefault();
    this.menuTarget.classList.add("hidden");
    this.noteTargets.forEach((t, i) => {
      if (i % 2 == 0) {
        t.checked = true;
      } else {
        t.checked = false;
      }
      t.dispatchEvent(new CustomEvent("change"));
    });
  }

  fillFourSteps(e) {
    e.preventDefault();
    this.menuTarget.classList.add("hidden");
    this.noteTargets.forEach((t, i) => {
      if (i % 4 == 0) {
        t.checked = true;
      } else {
        t.checked = false;
      }
      t.dispatchEvent(new CustomEvent("change"));
    });
  }

  fillAllSteps(e) {
    e.preventDefault();
    this.menuTarget.classList.add("hidden");
    this.noteTargets.forEach((t) => {
      t.dispatchEvent(new CustomEvent("change"));
      t.checked = true;
    });
  }

  clearAllSteps(e) {
    e.preventDefault();
    this.menuTarget.classList.add("hidden");
    this.noteTargets.forEach((t) => {
      t.dispatchEvent(new CustomEvent("change"));
      t.checked = false;
    });
  }

  copySteps(e) {
    e.preventDefault();
    this.menuTarget.classList.add("hidden");
    this.element.dispatchEvent(
      new CustomEvent("drum-pattern--track:copy", {
        detail: { notes: this.noteTargets.map((t) => t.checked) },
      })
    );
  }

  pasteSteps(e) {
    e.preventDefault();
    this.menuTarget.classList.add("hidden");
    if (this.drumPattern.copiedSteps) {
      this.noteTargets.forEach((t, i) => {
        t.dispatchEvent(new CustomEvent("change"));
        t.checked = this.drumPattern.copiedSteps[i];
      });
    }
  }

  async save() {
    let trackData = this.noteTargets.map((note, i) => {
      return {
        noteIndex: i + 1,
        checked: note.checked,
      };
    });
    await post(this.saveUrlValue, {
      body: {
        trackData: trackData,
      },
    });
  }

  get drumPattern() {
    let el = this.element.closest("[data-drum-pattern='true']");
    let thecontroller = this.application.getControllerForElementAndIdentifier(
      el,
      "drum-pattern"
    );
    return thecontroller;
  }
}
