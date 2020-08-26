require 'test_helper'

class RLegModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @r_leg_model = r_leg_models(:one)
  end

  test "should get index" do
    get r_leg_models_url
    assert_response :success
  end

  test "should get new" do
    get new_r_leg_model_url
    assert_response :success
  end

  test "should create r_leg_model" do
    assert_difference('RLegModel.count') do
      post r_leg_models_url, params: { r_leg_model: { r_leg_file: @r_leg_model.r_leg_file, tp: @r_leg_model.tp } }
    end

    assert_redirected_to r_leg_model_url(RLegModel.last)
  end

  test "should show r_leg_model" do
    get r_leg_model_url(@r_leg_model)
    assert_response :success
  end

  test "should get edit" do
    get edit_r_leg_model_url(@r_leg_model)
    assert_response :success
  end

  test "should update r_leg_model" do
    patch r_leg_model_url(@r_leg_model), params: { r_leg_model: { r_leg_file: @r_leg_model.r_leg_file, tp: @r_leg_model.tp } }
    assert_redirected_to r_leg_model_url(@r_leg_model)
  end

  test "should destroy r_leg_model" do
    assert_difference('RLegModel.count', -1) do
      delete r_leg_model_url(@r_leg_model)
    end

    assert_redirected_to r_leg_models_url
  end
end
