class DrumkitsController < ApplicationController
  def new
  end

  def create
    @drumkit = current_user.drumkits.new
  end

  def upload_modal
    render turbo_stream: turbo_stream.update("modal", partial: "upload_modal")
  end

  def upload_file
    full_path = params["fullPath"].split("/")
    @drumkit = current_user.drumkits.find_or_create_by(name: full_path[0])
    FolderOrganizer.new(@drumkit, params["fullPath"], params[:blob_signed_id]).call
  end
end