import { Controller } from "@hotwired/stimulus"
import Dropzone from "dropzone";
import { DirectUpload } from "@rails/activestorage"
import { post } from "@rails/request.js"
// Connects to data-controller="dropzone"
export default class extends Controller {
  static values = { callbackUrl: String, directUploadUrl: String }
  connect() {
    this.myDropzone = new Dropzone(this.element, {
      url: "/fuck-you-dropzone.hahahaha",
      autoProcessQueue: false,
      acceptedFiles: "audio/*",
    });
    this.myDropzone.on("addedfile", file => {
      console.log("Dispatching event")
      const upload = new DirectUpload(file, this.directUploadUrlValue)

      upload.create((error, blob) => {
        if (error) {
          // Handle the error
        } else {
          // Add an appropriately-named hidden input to the form with a
          //  value of blob.signed_id so that the blob ids will be
          //  transmitted in the normal upload flow
          post(this.callbackUrlValue, {
            body: {
              blob_signed_id: blob.signed_id
            }
          })
        }
      })

      this.element.dispatchEvent(new CustomEvent("dropzone:fileadded", {
        detail: {
          file: file
        }
      }))
    });
  }
}
