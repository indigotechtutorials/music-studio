module Projects
  class DrumPatternsController < ApplicationController
    before_action :set_project
    def new
      @drum_pattern = @project.drum_patterns.last || @project.drum_patterns.create
    end

    private

    def set_project
      @project = current_user.projects.find(params[:project_id])
    end
  end
end