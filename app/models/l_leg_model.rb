class LLegModel < ApplicationRecord
    validates :l_leg_file, presence: true
    mount_uploader :l_leg_file, FileUploader
    mount_uploader :l_leg_image, ImagesUploader
end
