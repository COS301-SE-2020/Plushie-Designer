class RArmModel < ApplicationRecord
    validates :r_arm_file, presence: true
    mount_uploader :r_arm_file, FileUploader
end
