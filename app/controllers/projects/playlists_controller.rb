module Projects
  class PlaylistsController < ApplicationController
    before_action :set_project
    def create
      drum_pattern = @project.drum_patterns.find(params[:drag_id])
      @project.playlist_tracks.create(drum_pattern: drum_pattern, track_index: params[:track_index])
    end
    def update
      @playlist_track = @project.playlist_tracks.find(params[:id])
      @playlist_track.update(playlist_position: params[:playlist_position])
    end
  
    private
  
    def set_project
      @project = current_user.projects.find(params[:project_id])
    end
  end
end