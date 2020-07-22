require 'test_helper'

class ToyTest < ActiveSupport::TestCase
  test "should not save toy without name" do
    user1 = User.new
    toy1 = user1.toys.build
    assert_not toy1.save
    # user1.destroy
  end

  test "can not create toy without signing in" do
    toy2 = Toy.new
    toy2.name = "Test"
    assert_not toy2.save
    # toy2.destroy
  end

  test "Can move pieces of model" do
    user3 = User.new
    toy3 = user3.toys.build
    toy3.name = "Test"
    toy3.head_pos = 2
    toy3.head_posx = 1
    toy3.torso_posy = 1.5
    toy3.torso_posx = -2
    toy3.larm_posy = 3
    toy3.larm_posx = 0
    toy3.rarm_posy = -3
    toy3.rarm_posx = 0
    toy3.lleg_posy = 3
    toy3.lleg_posx = 0
    toy3.rleg_posy = -3
    toy3.rleg_posx = 0
    assert toy3.save
  end
end
