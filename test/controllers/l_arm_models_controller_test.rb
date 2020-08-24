require 'test_helper'

class LArmModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @l_arm_model = l_arm_models(:one)
  end

  test "should get index" do
    get l_arm_models_url
    assert_response :success
  end

  test "should get new" do
    get new_l_arm_model_url
    assert_response :success
  end

  test "should create l_arm_model" do
    assert_difference('LArmModel.count') do
      post l_arm_models_url, params: { l_arm_model: { l_arm_file: @l_arm_model.l_arm_file, tp: @l_arm_model.tp } }
    end

    assert_redirected_to l_arm_model_url(LArmModel.last)
  end

  test "should show l_arm_model" do
    get l_arm_model_url(@l_arm_model)
    assert_response :success
  end

  test "should get edit" do
    get edit_l_arm_model_url(@l_arm_model)
    assert_response :success
  end

  test "should update l_arm_model" do
    patch l_arm_model_url(@l_arm_model), params: { l_arm_model: { l_arm_file: @l_arm_model.l_arm_file, tp: @l_arm_model.tp } }
    assert_redirected_to l_arm_model_url(@l_arm_model)
  end

  test "should destroy l_arm_model" do
    assert_difference('LArmModel.count', -1) do
      delete l_arm_model_url(@l_arm_model)
    end

    assert_redirected_to l_arm_models_url
  end
end
