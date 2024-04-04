import { Controller } from "@hotwired/stimulus"
import Dropzone from "dropzone";
import { DirectUpload } from "@rails/activestorage"
import { post } from "@rails/request.js"
// Connects to data-controller="dropzone"
export default class extends Controller {
  static values = { 
    callbackUrl: String, directUploadUrl: String, acceptedFiles: String, 
    directory: { type: Boolean, default: false } 
  }
  connect() {
    const controller = this
    this.myDropzone = new Dropzone(this.element, {
      url: "/fuck-you-dropzone.hahahaha",
      autoProcessQueue: false,
      acceptedFiles: this.acceptedFilesValue,
      previewsContainer: false,
      init: function() {
        if (controller.directoryValue) {
          this.hiddenFileInput.setAttribute("webkitdirectory", true);
          this.hiddenFileInput.setAttribute("directory", true);
        }
      }
    });
    this.myDropzone.on("addedfile", file => {
      if (!this.hasDirectUploadUrlValue) {
        return
      }
      
      setTimeout(() => {
        const upload = new DirectUpload(file, this.directUploadUrlValue)
  
        upload.create((error, blob) => {
          if (error) {
            // Handle the error
          } else {
            // Add an appropriately-named hidden input to the form with a
            //  value of blob.signed_id so that the blob ids will be
            //  transmitted in the normal upload flow
            if (this.hasCallbackUrlValue) {
              console.log("posting to callback")
              post(this.callbackUrlValue, {
                body: {
                  blob_signed_id: blob.signed_id,
                  fullPath: file.fullPath,
                }
              })
            }
          }
        })
        this.element.dispatchEvent(new CustomEvent("dropzone:fileadded", {
          detail: {
            file: file
          }
        }))
      }, 500)

    });
  }
}
