require 'test_helper'

class MyPlushiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get my_plushies_index_url
    assert_response :success
  end

end
