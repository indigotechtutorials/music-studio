class StudioController < ApplicationController
  def show
    if !current_user
      @user = User.last || User.create(email: "bruh@g.com", password: "555555")
      sign_in(@user)
    end
  end
end