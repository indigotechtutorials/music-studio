module Projects
  class FileUploadsController < ApplicationController
    def create
      # handle uploads
      project = Project.find(params[:project_id])
      drum_pattern = project.drum_patterns.find(params[:drum_pattern_id])
      thefile = ActiveStorage::Blob.find_signed(params[:blob_signed_id])
      drum_pattern.files.attach(thefile)
    end
  end
end