require 'test_helper'

class RArmModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @r_arm_model = r_arm_models(:one)
  end

  test "should get index" do
    get r_arm_models_url
    assert_response :success
  end

  test "should get new" do
    get new_r_arm_model_url
    assert_response :success
  end

  test "should create r_arm_model" do
    assert_difference('RArmModel.count') do
      post r_arm_models_url, params: { r_arm_model: { r_arm_file: @r_arm_model.r_arm_file, tp: @r_arm_model.tp } }
    end

    assert_redirected_to r_arm_model_url(RArmModel.last)
  end

  test "should show r_arm_model" do
    get r_arm_model_url(@r_arm_model)
    assert_response :success
  end

  test "should get edit" do
    get edit_r_arm_model_url(@r_arm_model)
    assert_response :success
  end

  test "should update r_arm_model" do
    patch r_arm_model_url(@r_arm_model), params: { r_arm_model: { r_arm_file: @r_arm_model.r_arm_file, tp: @r_arm_model.tp } }
    assert_redirected_to r_arm_model_url(@r_arm_model)
  end

  test "should destroy r_arm_model" do
    assert_difference('RArmModel.count', -1) do
      delete r_arm_model_url(@r_arm_model)
    end

    assert_redirected_to r_arm_models_url
  end
end
