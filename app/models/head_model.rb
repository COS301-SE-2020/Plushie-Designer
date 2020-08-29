class HeadModel < ApplicationRecord
    validates :head_file, presence: true
    mount_uploader :head_file, FileUploader
end
