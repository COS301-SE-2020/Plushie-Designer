class LArmModel < ApplicationRecord
    validates :l_arm_file, presence: true
    mount_uploader :l_arm_file, FileUploader
end
