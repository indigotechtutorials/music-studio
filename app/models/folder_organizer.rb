class FolderOrganizer
  attr_reader :drumkit, :full_path, :file
  def initialize(drumkit, full_path, file)
    @drumkit = drumkit
    @full_path = full_path.split("/")
    @file = file
  end

  def call
    parent_folder = drumkit.attachment_folders.find_or_create_by(name: full_path[0])
    if full_path.count > 1
      child_paths = full_path[1..]
      puts "Child paths: #{child_paths}"
      folders_h = {}
      child_paths.each.with_index do |c, i|
        puts "On path: #{c}"
        case i
        when 0
          folder = parent_folder.attachment_folders.find_or_create_by(name: c)
          folders_h[i] = folder
        when child_paths.size - 1
          parent_folder = folders_h[i - 1]
          parent_folder.attachment_files.create(filename: c, file: file)
        else
          parent_folder = folders_h[i - 1]
          folder = parent_folder.attachment_folders.find_or_create_by(name: c)
          folders_h[i] = folder
        end
      end
    end
  end
end