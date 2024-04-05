module Projects
  class DrumPatternsController < ApplicationController
    before_action :set_project
    def show
      @drum_pattern = @project.drum_patterns.find(params[:id])
    end

    def create
      @drum_pattern = @project.drum_patterns.create
      @drum_pattern_options = @project.drum_patterns.map.with_index { |dp, i| ["Pattern #{i + 1}", project_drum_pattern_path(@project, dp)]}.append(["Create New Pattern", "new_pattern"])
      @selected_url = project_drum_pattern_path(@project, @drum_pattern)
    end

    def destroy
      @drum_pattern = @project.drum_patterns.find(params[:id])
      @track = @drum_pattern.drum_pattern_tracks.find(params[:drum_pattern_track_id]) 
      dom_id = ActionView::RecordIdentifier.dom_id(@track)
      @track.destroy
      render turbo_stream: turbo_stream.remove(dom_id)
    end
    
    def drag
      @drum_pattern = @project.drum_patterns.find(params[:drum_pattern_id])
      attachment_file = AttachmentFile.find(params[:drag_id])
      @drum_pattern_track = @drum_pattern.drum_pattern_tracks.create 
      @drum_pattern_track.file.attach(attachment_file.file.blob)
      render turbo_stream: turbo_stream.append("tracks", partial: "projects/drum_patterns/track", locals: { track: @drum_pattern_track, drum_pattern: @drum_pattern })
    end

    def data
      @drum_pattern = @project.drum_patterns.find(params[:drum_pattern_id])
      json_data = []
      @drum_pattern.drum_pattern_tracks.each.with_index do |track, i|
        json_data << {
          fileUrl: url_for(track.file),
          filename: track.file.filename.base,
          noteData: track.note_data,
        }
      end
      render json: json_data 
    end
    private

    def set_project
      @project = current_user.projects.find(params[:project_id])
    end
  end
end