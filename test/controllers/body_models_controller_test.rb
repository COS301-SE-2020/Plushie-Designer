require 'test_helper'

class BodyModelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @body_model = body_models(:one)
  end

  test "should get index" do
    get body_models_url
    assert_response :success
  end

  test "should get new" do
    get new_body_model_url
    assert_response :success
  end

  test "should create body_model" do
    assert_difference('BodyModel.count') do
      post body_models_url, params: { body_model: { body_file: @body_model.body_file, tp: @body_model.tp } }
    end

    assert_redirected_to body_model_url(BodyModel.last)
  end

  test "should show body_model" do
    get body_model_url(@body_model)
    assert_response :success
  end

  test "should get edit" do
    get edit_body_model_url(@body_model)
    assert_response :success
  end

  test "should update body_model" do
    patch body_model_url(@body_model), params: { body_model: { body_file: @body_model.body_file, tp: @body_model.tp } }
    assert_redirected_to body_model_url(@body_model)
  end

  test "should destroy body_model" do
    assert_difference('BodyModel.count', -1) do
      delete body_model_url(@body_model)
    end

    assert_redirected_to body_models_url
  end
end
