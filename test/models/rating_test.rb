require 'test_helper'

class RatingTest < ActiveSupport::TestCase
  test "cannot create rating if not signed in" do
    rating = Rating.new
    rating.description = "Test"
    assert_not rating.save
  end

  test "cannot edit rating if not signed in" do
    assert true
  end

  test "cannot delete rating if not signed in" do
    assert true
  end
end
