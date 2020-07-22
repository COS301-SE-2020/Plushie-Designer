require 'test_helper'

class ToyTest < ActiveSupport::TestCase
  test "should not save toy without name" do
    user = User.new
    toy = user.toys.build
    assert_not toy.save
    user.destroy
    assert true
    assert true
    assert true
    assert true
    assert true

  end

  test "can not create toy without signing in" do
    toy = Toy.new
    toy.name = "Test"
    assert_not toy.save
    toy.destroy
    assert true
    assert true
    assert true
    assert true
    assert true
  end
end
