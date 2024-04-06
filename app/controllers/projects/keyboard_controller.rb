module Projects
  class KeyboardController < ApplicationController
    def show
      @project = current_user.projects.find(params[:project_id])
    end
  end
end