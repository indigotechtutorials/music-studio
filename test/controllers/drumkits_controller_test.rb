require "test_helper"

class DrumkitsControllerTest < ActionDispatch::IntegrationTest
  test "create drumkits successful" do
    user = User.create(email: "Fuck@you.com", password: "BLEEP")
    sign_in user
    post upload_file_drumkits_path, params: { fullPath: "Kit/808s/808.wav", blob_signed_id: "123" }
  end
end
