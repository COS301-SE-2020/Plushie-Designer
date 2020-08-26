require 'test_helper'

class LLegModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @l_leg_model = l_leg_models(:one)
  end

  test "should get index" do
    get l_leg_models_url
    assert_response :success
  end

  test "should get new" do
    get new_l_leg_model_url
    assert_response :success
  end

  test "should create l_leg_model" do
    assert_difference('LLegModel.count') do
      post l_leg_models_url, params: { l_leg_model: { l_leg_file: @l_leg_model.l_leg_file, tp: @l_leg_model.tp } }
    end

    assert_redirected_to l_leg_model_url(LLegModel.last)
  end

  test "should show l_leg_model" do
    get l_leg_model_url(@l_leg_model)
    assert_response :success
  end

  test "should get edit" do
    get edit_l_leg_model_url(@l_leg_model)
    assert_response :success
  end

  test "should update l_leg_model" do
    patch l_leg_model_url(@l_leg_model), params: { l_leg_model: { l_leg_file: @l_leg_model.l_leg_file, tp: @l_leg_model.tp } }
    assert_redirected_to l_leg_model_url(@l_leg_model)
  end

  test "should destroy l_leg_model" do
    assert_difference('LLegModel.count', -1) do
      delete l_leg_model_url(@l_leg_model)
    end

    assert_redirected_to l_leg_models_url
  end
end
