require 'test_helper'

class ToyTest < ActiveSupport::TestCase
  test "should not save toy without name" do
    user = User.new
    toy = user.toys.build
    toy.name = "Test"
    assert toy.save
  end

  test "should not save toy without user id" do
    user = User.new
    toy = user.toys.build
    toy.name = "Test"
    assert toy.save
  end
end
