class Toy < ApplicationRecord
    validates :name, presence: true
    belongs_to :user
    has_many :ratings
end
