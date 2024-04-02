module Projects
  class DrumPatternsController < ApplicationController
    before_action :set_project
    def new
      @drum_pattern = @project.drum_patterns.last || @project.drum_patterns.create
    end

    def destroy
      @drum_pattern = @project.drum_patterns.find(params[:id])
      @blob = ActiveStorage::Blob.find_signed(params[:signed_id])
      @drum_pattern.files.find { |f| f.blob.signed_id == params[:signed_id] }.purge
      render turbo_stream: turbo_stream.remove("blob-#{params[:signed_id].parameterize}")
    end
    
    def drag
      @drum_pattern = @project.drum_patterns.find(params[:drum_pattern_id])
      attachment_file = AttachmentFile.find(params[:file_id])
      @drum_pattern.files.attach(attachment_file.file.blob)
      render turbo_stream: turbo_stream.append("tracks", partial: "projects/drum_patterns/track", locals: { sound: @drum_pattern.files.last, drum_pattern: @drum_pattern })
    end
    private

    def set_project
      @project = current_user.projects.find(params[:project_id])
    end
  end
end