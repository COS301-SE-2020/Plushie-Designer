class RLegModel < ApplicationRecord
    validates :r_leg_file, presence: true
    mount_uploader :r_leg_file, FileUploader
    mount_uploader :r_leg_image, ImagesUploader
end
