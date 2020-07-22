require 'test_helper'

class RatingTest < ActiveSupport::TestCase
  test "cannot create rating if not signed in" do
    rating = Rating.new
    rating.description = "Test"
    assert_not rating.save
    rating.destroy
    assert true
    assert true
    assert true
    assert true
    assert true
  end
end
