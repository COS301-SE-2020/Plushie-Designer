class BodyModel < ApplicationRecord
    validates :body_file, presence: true
    mount_uploader :body_file, FileUploader
end
