class Toy < ApplicationRecord
    validates :name, presence: true
    belongs_to :user
    has_many :ratings, dependent: :delete_all

    def self.search(search)
        if search == ""
            Toy.all
        else
            if search   
                toy = Toy.find_by(name: search)
                if toy
                    self.where(id: toy)
                else
                    user = User.find_by(username: search)
                    if user 
                        self.where(user_id: user)
                    else
                        0
                    end
                end
            else
                Toy.all
            end
        end
    end
end
