module Projects
  class PlaylistsController < ApplicationController
    def create
      @project = Project.find(params[:project_id])
      drum_pattern = @project.drum_patterns.find(params[:drag_id])
      @project.playlist_tracks.create(drum_pattern: drum_pattern, track_index: params[:track_index])
    end
  end
end