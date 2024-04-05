class ProjectsController < ApplicationController
  def create
    @project = current_user.projects.create
    redirect_to @project
  end

  def show
    @project = current_user.projects.find(params[:id])
    @project.drum_patterns.create if @project.drum_patterns.count.zero?
    @drum_pattern_options = @project.drum_patterns.map.with_index { |dp, i| ["Pattern #{i + 1}", project_drum_pattern_path(@project, dp)]}.append(["Create New Pattern", "new_pattern"])
  end
end