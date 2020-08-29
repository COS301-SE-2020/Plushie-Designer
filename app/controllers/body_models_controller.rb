class BodyModelsController < ApplicationController
  before_action :set_body_model, only: [:show, :edit, :update, :destroy]

  # GET /body_models
  # GET /body_models.json
  def index
    @body_models = BodyModel.all
    respond_to do |format|
      format.html { redirect_to new_body_model_path}
      format.json { render json: @body_models }
    end
  end

  # GET /body_models/1
  # GET /body_models/1.json
  def show
    @body_models = BodyModel.all
    respond_to do |format|
      format.html #defaults to rendering the /view/coordinates/show template
      format.json { render json: @body_models }
    end
    # redirect_to new_body_model_path
  end

  # GET /body_models/new
  def new
    @body_model = BodyModel.new
  end

  # GET /body_models/1/edit
  def edit
    redirect_to new_body_model_path
  end

  # POST /body_models
  # POST /body_models.json
  def create
    @body_model = BodyModel.new(body_model_params)

    respond_to do |format|
      if @body_model.save
        format.html { redirect_to pages_upload_model_path notice: 'Body model was successfully uploaded.' }
        format.json { render :show, status: :created, location: @body_model }
      else
        format.html { render :new }
        format.json { render json: @body_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /body_models/1
  # PATCH/PUT /body_models/1.json
  def update
    respond_to do |format|
      if @body_model.update(body_model_params)
        format.html { redirect_to @body_model, notice: 'Body model was successfully updated.' }
        format.json { render :show, status: :ok, location: @body_model }
      else
        format.html { render :edit }
        format.json { render json: @body_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /body_models/1
  # DELETE /body_models/1.json
  def destroy
    @body_model.destroy
    respond_to do |format|
      format.html { redirect_to body_models_url, notice: 'Body model was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_body_model
      @body_model = BodyModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def body_model_params
      params.require(:body_model).permit(:body_file, :tp)
    end
end
