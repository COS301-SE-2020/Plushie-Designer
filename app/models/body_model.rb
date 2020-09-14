class BodyModel < ApplicationRecord
    validates :body_file, presence: true
    mount_uploader :body_file, FileUploader
    mount_uploader :body_image, ImagesUploader
end
