class ProjectsController < ApplicationController
  def new
    @project = current_user.projects.create
    redirect_to @project
  end

  def show
    @project = current_user.projects.find(params[:id])
    @project.drum_patterns.create if @project.drum_patterns.count.zero?
  end
end