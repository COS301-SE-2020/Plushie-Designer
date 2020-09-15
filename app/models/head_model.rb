class HeadModel < ApplicationRecord
    validates :head_file, presence: true
    mount_uploader :head_file, FileUploader
    mount_uploader :head_image, ImagesUploader
end
