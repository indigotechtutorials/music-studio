module Projects
  class SaveController < ApplicationController
    def create
      @project = Project.find(params[:project_id])
      @project.bpm = params[:bpm] if params[:bpm].present?
      @project.save
    end
  end
end