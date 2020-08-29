require 'test_helper'

class HeadModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @head_model = head_models(:one)
  end

  test "should get index" do
    get head_models_url
    assert_response :success
  end

  test "should get new" do
    get new_head_model_url
    assert_response :success
  end

  test "should create head_model" do
    assert_difference('HeadModel.count') do
      post head_models_url, params: { head_model: { head_file: @head_model.head_file } }
    end

    assert_redirected_to head_model_url(HeadModel.last)
  end

  test "should show head_model" do
    get head_model_url(@head_model)
    assert_response :success
  end

  test "should get edit" do
    get edit_head_model_url(@head_model)
    assert_response :success
  end

  test "should update head_model" do
    patch head_model_url(@head_model), params: { head_model: { head_file: @head_model.head_file } }
    assert_redirected_to head_model_url(@head_model)
  end

  test "should destroy head_model" do
    assert_difference('HeadModel.count', -1) do
      delete head_model_url(@head_model)
    end

    assert_redirected_to head_models_url
  end
end
