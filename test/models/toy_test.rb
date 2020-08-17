require 'test_helper'

class ToyTest < ActiveSupport::TestCase
  test "Unit Tests" do
    user1 = User.new
    toy1 = user1.toys.build
    assert_not toy1.save

    toy2 = Toy.new
    toy2.name = "Test"
    assert_not toy2.save

    user3 = User.new
    toy3 = user3.toys.build
    toy3.name = "Test"
    toy3.head_pos = 2
    toy3.head_posx = 1
    toy3.head_posz = 1
    toy3.torso_posy = 1.5
    toy3.torso_posx = -2
    toy3.torso_posz = -2
    toy3.larm_posy = 3
    toy3.larm_posx = 0
    toy3.larm_posz = 0
    toy3.rarm_posy = -3
    toy3.rarm_posx = 0
    toy3.rarm_posz = 0
    toy3.lleg_posy = 3
    toy3.lleg_posx = 0
    toy3.lleg_posz = 0
    toy3.rleg_posy = -3
    toy3.rleg_posx = 0
    toy3.rleg_posz = 0
    assert toy3.save

    rating = Rating.new
    rating.description = "Test"
    rating.value = 2
    assert_not rating.save

    user = User.new
    toy = user.toys.build
    rating = toy.ratings.build
    rating.description = "Test"
    rating.value = 2
    assert_not rating.save

    rating.description = "Test2"
    rating.value = 3

    assert_not rating.save
  end
end
