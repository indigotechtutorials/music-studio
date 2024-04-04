module Projects
  class DrumPatternTracksController < ApplicationController
    def save
      @project = Project.find(params[:project_id])
      @drum_pattern = @project.drum_patterns.find(params[:drum_pattern_id])
      @track = @drum_pattern.drum_pattern_tracks.find(params[:drum_pattern_track_id])
      @track.update(note_data: params[:drum_pattern_track][:trackData])
    end
  end
end