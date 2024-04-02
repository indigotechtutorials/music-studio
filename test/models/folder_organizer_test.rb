require "test_helper"

class FolderOrganizerTest < ActiveSupport::TestCase
  attr_reader :user, :drumkit

  setup do
    @user = User.create(email: "Fuck@you.cum", password: "555555")
    @drumkit = user.drumkits.create(name: "Kit")
  end

  test "test organizing folders and creating the create records with 1 subfolder" do
    FolderOrganizer.new(drumkit, "Kit/808/808.wav", "123").call
    assert_equal drumkit.attachment_folders.count, 1
    assert_equal drumkit.attachment_folders.first.name, "Kit"
    assert_equal drumkit.attachment_folders.first.attachment_folders.count, 1
  end

  test "test organizing folders and creating the create records with 2 subfolders" do
    FolderOrganizer.new(drumkit, "Kit/808/808.wav", "123").call
    FolderOrganizer.new(drumkit, "Kit/Hihats/hihat.wav", "321").call
    assert_equal drumkit.attachment_folders.first.name, "Kit"
    assert_equal drumkit.attachment_folders.first.attachment_folders.count, 2
  end
end
